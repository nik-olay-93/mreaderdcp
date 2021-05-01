import { useApolloClient } from "@apollo/client";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Divider, Heading, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { BiLogIn, BiLogOut, BiSearchAlt } from "react-icons/bi";
import { BsPerson, BsPersonPlus } from "react-icons/bs";
import { IoMdHome } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { MenuEntry } from "./menuEntry";

export const Menu: React.FC<{}> = ({}) => {
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });
  const isMobile = useMediaQuery({ maxWidth: 1000 });
  const [active, setActive] = useState(!isMobile);

  let mFooter = null;

  if (loading) {
  } else if (!data?.me) {
    mFooter = (
      <>
        <MenuEntry text="Login" href="/login" icon={BiLogIn} />
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
    <>
      {isMobile ? (
        <IconButton
          aria-label="Open Menu"
          m={4}
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
        mt={isMobile ? 0 : 4}
        p={6}
        mr={active ? 4 : -300}
        borderWidth="1px"
        transition="margin .5s"
        borderRadius="lg"
        bgColor="white"
        pos="fixed"
        right={0}
        borderColor="gray.300"
      >
        <Heading mb={4} size="lg">
          MgReaderDcp
        </Heading>
        <MenuEntry href="/" text="Home" icon={IoMdHome} />
        <Divider />
        <MenuEntry href="/search" text="Search" icon={BiSearchAlt} />
        <Divider />
        {mFooter}
      </Box>
    </>
  );
};
