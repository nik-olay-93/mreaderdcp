import { Grid, Heading, Link } from "@chakra-ui/layout";
import { Flex, Image, Progress, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Menu } from "../../components/Menu";
import { RateButton } from "../../components/RateButton";
import { Wrapper } from "../../components/Wrapper";
import { useBookQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

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
                "Cover Genres"
                "Rating ."
            '
            templateRows="1fr 1fr 1fr"
            templateColumns="40% 1fr"
            height="96vh"
          >
            <Flex gridArea="Cover">
              <Image
                mb="auto"
                mt="20%"
                src={`http://localhost:4000/api/book/page/${data?.book?.name}/0`}
              />
            </Flex>
            <Flex gridArea="Header" justifyContent="center" alignItems="center">
              <Heading fontSize="7xl">{data.book?.name}</Heading>
            </Flex>
            <Flex
              alignItems="flex-start"
              justifyContent="center"
              gridArea="Genres"
            >
              {data.book?.genres.map((val, key) => (
                <Link key={key}>
                  <Text mx={2}>{val}</Text>
                </Link>
              ))}
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
              {data.book.myRating ? (
                <Text>You rated: {data.book.myRating}</Text>
              ) : (
                <Text>You havent rated yet, rate now:</Text>
              )}
              <RateButton book={data.book} />
            </Flex>
          </Grid>
        )}
      </Wrapper>
    </>
  );
};

export default withApollo({ ssr: true })(AboutPage);
