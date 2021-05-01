import { Image } from "@chakra-ui/image";
import { Box, Flex } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useBookQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

const ReadPage: React.FC<{}> = ({}) => {
  const [page, changePage] = useState(0);
  const router = useRouter();
  const { data, error, loading } = useBookQuery({
    variables: {
      name: router.query.name as string,
    },
  });
  const pages = data?.book?.pages;
  const url = `http://localhost:4000/api/book/page/${
    router.query.name
  }/${page.toString()}`;
  return error ? (
    <div>{error}</div>
  ) : loading ? (
    <div>loading</div>
  ) : (
    <Flex justifyContent="center">
      <Image position="absolute" maxHeight="100vh" src={url} />
      <Flex zIndex={2} justifyContent="center" position="absolute" width="100%">
        <Box
          height="100vh"
          width="50%"
          mx="3%"
          onClick={() => {
            if (page > 0) changePage(page - 1);
          }}
        ></Box>
        <Box
          height="100vh"
          width="50%"
          mx="3%"
          onClick={() => {
            if (page < pages! - 1) changePage(page + 1);
          }}
        ></Box>
      </Flex>
    </Flex>
  );
};

export default withApollo({ ssr: false })(ReadPage);
