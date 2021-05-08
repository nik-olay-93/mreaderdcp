import { useApolloClient } from "@apollo/client";
import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Menu } from "../components/Menu";
import { Wrapper } from "../components/Wrapper";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";

interface loginProps {}

export const login: React.FC<loginProps> = ({}) => {
  const apolloClient = useApolloClient();
  const router = useRouter();
  const [login] = useLoginMutation();
  return (
    <>
      <Menu />
      <Wrapper variant="small">
        <Formik
          initialValues={{ usernameOrEmail: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({
              variables: {
                username: values.usernameOrEmail.includes("@")
                  ? undefined
                  : values.usernameOrEmail,
                email: !values.usernameOrEmail.includes("@")
                  ? undefined
                  : values.usernameOrEmail,
                password: values.password,
              },
            });
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
              await apolloClient.resetStore();
              if (typeof router.query.next === "string") {
                router.push(router.query.next);
              } else {
                router.push("/");
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="usernameOrEmail" label="Username or email" />
              <Box mt={4}>
                <InputField name="password" type="password" />
              </Box>
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                login
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

export default withApollo({ ssr: false })(login);
