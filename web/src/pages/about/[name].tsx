import { Grid, Heading, Link } from "@chakra-ui/layout";
import {
  Button,
  Flex,
  IconButton,
  Image,
  Progress,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Menu } from "../../components/Menu";
import { MenuEntry } from "../../components/menuEntry";
import { RateButton } from "../../components/RateButton";
import { Wrapper } from "../../components/Wrapper";
import { useBookQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import { GrClose } from "react-icons/gr";
import NextLink from "next/link";

export const AboutPage: React.FC<{}> = ({}) => {
  const router = useRouter();
  if (!router.query.name) {
    router.push("/");
  }
  const name = router.query.name;
  const { data } = useBookQuery({
    variables: { name: name as string },
  });

  return (
    <>
      <Menu />
      <Wrapper variant="regular">
        {!data?.book ? (
          <div>loading</div>
        ) : (
          <Grid
            templateAreas='
                "Cover Header"
                "Cover Desc"
                "Rating Desc"
            '
            templateRows="1fr 1fr 1fr"
            templateColumns="40% 1fr"
            height="96vh"
          >
            <Flex gridArea="Cover">
              <NextLink href={`/read/${name}`}>
                <Image
                  my="auto"
                  src={`http://localhost:4000/api/book/page/${data?.book?.name}/0`}
                />
              </NextLink>
            </Flex>
            <Flex gridArea="Header" justifyContent="center" alignItems="center">
              <Heading fontSize="7xl">{data.book?.name}</Heading>
              <IconButton ml={10} aria-label="delete" as={GrClose} />
            </Flex>
            <Flex flexDirection="column" gridArea="Rating">
              <Progress
                width="100%"
                mt={4}
                colorScheme="yellow"
                min={0}
                max={5}
                value={data.book.ratingsSum / data.book.ratingsCount}
              />
              <Flex justifyContent="center">
                {data.book.myRating ? (
                  <Text>You rated: {data.book.myRating}</Text>
                ) : (
                  <Text>You havent rated yet, rate now:</Text>
                )}
              </Flex>
              <RateButton book={data.book} />
            </Flex>
            <Flex flexDirection="column" gridArea="Desc">
              <Flex my={2} alignItems="flex-start" justifyContent="center">
                {data.book?.genres.map((val, key) => (
                  <Link key={key}>
                    <Text mx={2}>{val}</Text>
                  </Link>
                ))}
              </Flex>
              <Flex alignItems="center" my={2} justifyContent="center">
                {data.book.description}
              </Flex>
            </Flex>
          </Grid>
        )}
      </Wrapper>
    </>
  );
};

export default withApollo({ ssr: true })(AboutPage);
