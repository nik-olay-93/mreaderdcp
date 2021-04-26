import { Box } from "@chakra-ui/react";
import React from "react";

export type WrapperVariant = "small" | "regular" | "large";

interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  let maxW;
  switch (variant) {
    case "small":
      maxW = "400px";
      break;

    case "regular":
      maxW = "800px";
      break;

    case "large":
      maxW = "1200px";
      break;

    default:
      break;
  }
  return (
    <Box mt={8} maxW={maxW} w="100$" mx="auto">
      {children}
    </Box>
  );
};
