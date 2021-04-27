import { Button } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useApolloClient } from "@apollo/client";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });

  let body = null;

  if (loading) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Button>Login</Button>
        </NextLink>
        <NextLink href="/register">
          <Button ml={2}>Register</Button>
        </NextLink>
      </>
    );
  } else {
    body = (
      <>
        <Button>{data.me.username}</Button>
        <Button
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
          }}
          ml={2}
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </>
    );
  }

  return (
    <Flex position="sticky" top={0} zIndex={10} bg="tomato" p={3}>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};
