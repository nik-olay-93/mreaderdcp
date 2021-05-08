import { Stack } from "@chakra-ui/layout";
import React from "react";
import { BookEntry } from "../components/BookEntry";
import { Menu } from "../components/Menu";
import { Wrapper } from "../components/Wrapper";
import { useBooksQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const Index: React.FC<{}> = ({}) => {
  const { data, loading: booksLoading } = useBooksQuery({
    variables: {
      limit: 10,
    },
  });

  if (!booksLoading && !data) {
    return <div>no data</div>;
  }

  return (
    <>
      <Menu />
      <Wrapper>
        {booksLoading && !data ? (
          <div>loading</div>
        ) : (
          <Stack my={4} gridGap={1}>
            {data!.books.map((b) => (
              <BookEntry key={b.id} book={b} />
            ))}
          </Stack>
        )}
      </Wrapper>
    </>
  );
};

export default withApollo({ ssr: true })(Index);
