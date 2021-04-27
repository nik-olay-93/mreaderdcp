import { Button } from "@chakra-ui/button";
import { Heading, Flex } from "@chakra-ui/layout";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useApolloClient } from "@apollo/client";
import { WrapperSize, WrapperVariant } from "./Wrapper";
import { Box } from "@chakra-ui/react";

interface NavBarProps {
  variant?: WrapperVariant;
}

export const NavBar: React.FC<NavBarProps> = ({ variant = "regular" }) => {
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
    <Flex
      justifyContent="center"
      position="sticky"
      top={0}
      zIndex={10}
      bg="tomato"
      p={3}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        w={WrapperSize[variant]}
      >
        <Heading color="dimgrey" size="lg">
          MgReaderDcp
        </Heading>
        <Box>{body}</Box>
      </Flex>
    </Flex>
  );
};
