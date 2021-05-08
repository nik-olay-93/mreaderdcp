import { Flex, Icon, Link } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import NextLink from "next/link";
import { GoPrimitiveDot } from "react-icons/go";

interface MenuEntryProps {
  href?: string;
  icon?: IconType;
  text: string;
  onClick?: () => Promise<void>;
}

export const MenuEntry: React.FC<MenuEntryProps> = ({
  href,
  icon = GoPrimitiveDot,
  text,
  onClick,
}) => {
  return (
    <Flex my={2} alignItems="center">
      <Icon as={icon} />
      {href ? (
        <NextLink href={href}>
          <Link onClick={onClick} mx={1}>
            {text}
          </Link>
        </NextLink>
      ) : (
        <Link onClick={onClick} mx={1}>
          {text}
        </Link>
      )}
    </Flex>
  );
};
