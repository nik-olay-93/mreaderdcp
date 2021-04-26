import { Button } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import React from "react";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <Flex position="sticky" top={0} zIndex={10} bg="tomato" p={3}>
      <Box ml="auto">
        <Button>Login</Button>
        <Button ml={2}>Register</Button>
      </Box>
    </Flex>
  );
};
