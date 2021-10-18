import { Input } from "@chakra-ui/input";
import { Box, Button, Flex, FormControl, Image } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Menu } from "../components/Menu";
import { Wrapper } from "../components/Wrapper";
import { useCreateBookMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";

const Create: React.FC<{}> = ({}) => {
  const [createBook] = useCreateBookMutation();
  const [files, setFiles] = useState([] as File[]);
  const [fileThumbs, setFileThumbs] = useState([] as string[]);
  const router = useRouter();

  var reader: FileReader;

  if (typeof FileReader !== "undefined") {
    reader = new FileReader();

    reader.onloadend = () => {
      setFileThumbs([...fileThumbs, reader.result as string]);
    };
  }
  return (
    <>
      <Menu />
      <Wrapper variant="regular">
        <Formik
          initialValues={{
            name: "",
            description: "",
            artist: "",
            genres: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await createBook({
              variables: { ...values, files },
            });
            if (response.data?.createBook.errors) {
              setErrors(toErrorMap(response.data.createBook.errors));
            } else {
              router.push(`/about/${values.name}`);
            }
          }}
        >
          <Form>
            <InputField name="name" />
            <Box mt={4}>
              <InputField textarea name="description" />
            </Box>
            <Box mt={4}>
              <InputField name="artist" />
            </Box>
            <Box mt={4}>
              <InputField name="genres" />
            </Box>
            <Button mt={4} type="submit">
              Create
            </Button>
          </Form>
        </Formik>
        <Formik
          initialValues={{ file: null as unknown as File }}
          onSubmit={(values) => {
            setFiles([...files, values.file]);
            reader?.readAsDataURL(values.file);
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <Box mt={4}>
                <FormControl>
                  <Input
                    name="file"
                    type="file"
                    onChange={(event) => {
                      setFieldValue("file", event.currentTarget.files![0]);
                    }}
                  ></Input>
                  <Button type="submit">Add</Button>
                </FormControl>
              </Box>
            </Form>
          )}
        </Formik>
        <Flex alignItems="center" flexDir="column" maxH={800} overflow="auto">
          {fileThumbs.map((val, ind) => (
            <Image maxW={300} maxH={300} src={val} key={ind} />
          ))}
        </Flex>
      </Wrapper>
    </>
  );
};

export default withApollo({ ssr: false })(Create);
