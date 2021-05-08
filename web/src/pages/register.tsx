import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Menu } from "../components/Menu";
import { Wrapper } from "../components/Wrapper";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = ({}) => {
  const [register] = useRegisterMutation();
  const router = useRouter();

  return (
    <>
      <Menu />
      <Wrapper variant="small">
        <Formik
          initialValues={{ password: "", email: "", username: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({
              variables: values,
              update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: "Query",
                    me: data?.register.user,
                  },
                });
              },
            });
            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.user) {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="username" />
              <Box mt={4}>
                <InputField name="email" />
              </Box>
              <Box mt={4}>
                <InputField name="password" type="password" />
              </Box>
              <Button
                isLoading={isSubmitting}
                mt={4}
                type="submit"
                colorScheme="teal"
              >
                register
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

export default withApollo({ ssr: false })(Register);
