import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { NextPageContext } from "next";
import { createWithApollo } from "./createWithApollo";

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    //@ts-ignore
    link: createUploadLink({
      uri: "http://localhost:4000/graphql",
      credentials: "include",
    }),
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
    cache: new InMemoryCache(),
  });

export const withApollo = createWithApollo(createClient);
