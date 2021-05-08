import { Image, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { OvBookFragment } from "../generated/graphql";
import NextLink from "next/link";
import { ArrowRightIcon } from "@chakra-ui/icons";

interface BookEntryProps {
  book: OvBookFragment;
}

export const BookEntry: React.FC<BookEntryProps> = ({ book }) => {
  return (
    <Grid
      templateRows="1fr 1fr 10%"
      templateColumns="40% 1fr 10%"
      templateAreas='"Cover Text1 ReadButton" "Cover Text2 ReadButton"'
      p={5}
      shadow="md"
      borderWidth="1px"
      borderColor="gray.300"
      borderRadius="md"
      transition="transform .05s"
      _hover={{ transform: "translate(-2px, -2px)", shadow: "lg" }}
      gap="0px 5px"
    >
      <Image
        display="grid"
        src={`http://localhost:4000/api/book/page/${book.name}/0`}
        gridTemplateColumns="1fr"
        gridTemplateRows="1fr"
        gridTemplateAreas="."
        gridArea="Cover"
      />
      <Flex gridArea="Text1">
        <Heading m={2} fontSize="xx-large">
          {book.name}
        </Heading>
      </Flex>
      <Flex gridArea="Text2">
        <Text m={2}>{book.genres.join(", ")}</Text>
      </Flex>
      <Flex justifyContent="center" alignItems="center" gridArea="ReadButton">
        <NextLink href={`/about/${book.name}`}>
          <ArrowRightIcon _hover={{ cursor: "pointer" }} boxSize="2em" />
        </NextLink>
      </Flex>
    </Grid>
  );
};
