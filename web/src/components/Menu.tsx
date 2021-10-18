import { useApolloClient } from "@apollo/client";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Divider, Heading, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiLogIn, BiLogOut, BiSearchAlt } from "react-icons/bi";
import { BsPerson, BsPersonPlus } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { IoMdHome } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { MenuEntry } from "./menuEntry";

interface MenuProps {
  dontHideOnDesktop?: boolean;
}

export const Menu: React.FC<MenuProps> = ({
  children,
  dontHideOnDesktop = false,
}) => {
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 1300 });
  const isButtonActive = isMobile || dontHideOnDesktop;
  const [active, setActive] = useState(!isMobile);

  let mFooter = null;

  if (loading) {
  } else if (!data?.me) {
    mFooter = (
      <>
        <MenuEntry
          text="Login"
          href={`/login?next=${router.asPath}`}
          icon={BiLogIn}
        />
        <MenuEntry text="Register" href="/register" icon={BsPersonPlus} />
      </>
    );
  } else {
    mFooter = (
      <>
        <MenuEntry text={data.me.username} icon={BsPerson} href="/me" />
        <MenuEntry
          text="Logout"
          icon={BiLogOut}
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
          }}
        />
      </>
    );
  }

  return (
    <Box position="fixed" right={0} zIndex="20">
      {isButtonActive ? (
        <IconButton
          aria-label="Open Menu"
          mx={4}
          mt={4}
          variant="outline"
          _focus={{ outline: "none" }}
          _hover={{ bgColor: active ? "#F7FAFC" : "white" }}
          icon={<HamburgerIcon />}
          onClick={() => {
            setActive(!active);
          }}
        />
      ) : null}
      <Box
        mt={4}
        p={6}
        mr={active || !isButtonActive ? 4 : -300}
        borderWidth="1px"
        transition="margin .5s"
        borderRadius="lg"
        bgColor="white"
        pos="fixed"
        right={0}
        borderColor="gray.300"
      >
        <Heading mb={4} size="lg">
          MgReader
        </Heading>
        <MenuEntry href="/" text="Home" icon={IoMdHome} />
        <Divider />
        <MenuEntry href="/search" text="Search" icon={BiSearchAlt} />
        <MenuEntry text="Create" icon={GoPlus} href="/create" />
        <Divider />
        {children}
        {children ? <Divider /> : null}
        {mFooter}
      </Box>
    </Box>
  );
};
