import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Menu } from "./Menu";

export type WrapperVariant = "small" | "regular" | "large";

export enum WrapperSize {
  small = "400px",
  regular = "800px",
  large = "1200px",
}

interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  let maxW;
  maxW = WrapperSize[variant];

  return (
    <Flex w="100%">
      <Box zIndex={20} position="fixed" right={0}>
        <Menu />
      </Box>
      <Box maxW={maxW} w="80%" mx="auto" mt={8}>
        {children}
      </Box>
    </Flex>
  );
};
