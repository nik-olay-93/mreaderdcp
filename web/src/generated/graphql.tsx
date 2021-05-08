import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Account = {
  __typename?: 'Account';
  id: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  books: Array<Book>;
  createdAt: Scalars['String'];
  udpatedAt: Scalars['String'];
};

export type Book = {
  __typename?: 'Book';
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  genres: Array<Scalars['String']>;
  artist: Scalars['String'];
  creator: Account;
  views: Scalars['Int'];
  ratingsCount: Scalars['Int'];
  ratingsSum: Scalars['Int'];
  myRating?: Maybe<Scalars['Float']>;
  pages: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type BookInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  genres: Array<Scalars['String']>;
  artist: Scalars['String'];
};

export type BookResponse = {
  __typename?: 'BookResponse';
  errors?: Maybe<Array<InputError>>;
  book?: Maybe<Book>;
};

export type InputError = {
  __typename?: 'InputError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  createBook: BookResponse;
  rateBook: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationCreateBookArgs = {
  files: Array<Scalars['Upload']>;
  options: BookInput;
};


export type MutationRateBookArgs = {
  bookId: Scalars['Int'];
  score: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<Account>;
  books: Array<Book>;
  book?: Maybe<Book>;
};


export type QueryBooksArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QueryBookArgs = {
  name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
};

export type RegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};


export type UserResponse = {
  __typename?: 'UserResponse';
  user?: Maybe<Account>;
  errors?: Maybe<Array<InputError>>;
};

export type DefBookFragment = (
  { __typename?: 'Book' }
  & Pick<Book, 'id' | 'name' | 'description' | 'pages' | 'artist' | 'genres' | 'views' | 'ratingsSum' | 'ratingsCount' | 'myRating' | 'createdAt'>
  & { creator: (
    { __typename?: 'Account' }
    & Pick<Account, 'id' | 'username'>
  ) }
);

export type DefUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'InputError' }
    & InputErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'Account' }
    & RegularUserFragment
  )> }
);

export type InputErrorFragment = (
  { __typename?: 'InputError' }
  & Pick<InputError, 'field' | 'message'>
);

export type OvBookFragment = (
  { __typename?: 'Book' }
  & Pick<Book, 'id' | 'name' | 'genres' | 'pages' | 'views' | 'artist'>
);

export type RegularUserFragment = (
  { __typename?: 'Account' }
  & Pick<Account, 'id' | 'username' | 'email'>
);

export type LoginMutationVariables = Exact<{
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & DefUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RateBookMutationVariables = Exact<{
  bookId: Scalars['Int'];
  score: Scalars['Float'];
}>;


export type RateBookMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'rateBook'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & DefUserResponseFragment
  ) }
);

export type BookQueryVariables = Exact<{
  name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
}>;


export type BookQuery = (
  { __typename?: 'Query' }
  & { book?: Maybe<(
    { __typename?: 'Book' }
    & DefBookFragment
  )> }
);

export type BooksQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
}>;


export type BooksQuery = (
  { __typename?: 'Query' }
  & { books: Array<(
    { __typename?: 'Book' }
    & OvBookFragment
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'Account' }
    & RegularUserFragment
  )> }
);

export const DefBookFragmentDoc = gql`
    fragment DefBook on Book {
  id
  name
  description
  pages
  artist
  genres
  views
  creator {
    id
    username
  }
  ratingsSum
  ratingsCount
  myRating
  createdAt
}
    `;
export const InputErrorFragmentDoc = gql`
    fragment InputError on InputError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on Account {
  id
  username
  email
}
    `;
export const DefUserResponseFragmentDoc = gql`
    fragment DefUserResponse on UserResponse {
  errors {
    ...InputError
  }
  user {
    ...RegularUser
  }
}
    ${InputErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const OvBookFragmentDoc = gql`
    fragment OvBook on Book {
  id
  name
  genres
  pages
  views
  artist
}
    `;
export const LoginDocument = gql`
    mutation Login($username: String, $email: String, $password: String!) {
  login(options: {username: $username, email: $email, password: $password}) {
    ...DefUserResponse
  }
}
    ${DefUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RateBookDocument = gql`
    mutation RateBook($bookId: Int!, $score: Float!) {
  rateBook(score: $score, bookId: $bookId)
}
    `;
export type RateBookMutationFn = Apollo.MutationFunction<RateBookMutation, RateBookMutationVariables>;

/**
 * __useRateBookMutation__
 *
 * To run a mutation, you first call `useRateBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRateBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rateBookMutation, { data, loading, error }] = useRateBookMutation({
 *   variables: {
 *      bookId: // value for 'bookId'
 *      score: // value for 'score'
 *   },
 * });
 */
export function useRateBookMutation(baseOptions?: Apollo.MutationHookOptions<RateBookMutation, RateBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RateBookMutation, RateBookMutationVariables>(RateBookDocument, options);
      }
export type RateBookMutationHookResult = ReturnType<typeof useRateBookMutation>;
export type RateBookMutationResult = Apollo.MutationResult<RateBookMutation>;
export type RateBookMutationOptions = Apollo.BaseMutationOptions<RateBookMutation, RateBookMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
  register(options: {username: $username, email: $email, password: $password}) {
    ...DefUserResponse
  }
}
    ${DefUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const BookDocument = gql`
    query Book($name: String, $id: Int) {
  book(name: $name, id: $id) {
    ...DefBook
  }
}
    ${DefBookFragmentDoc}`;

/**
 * __useBookQuery__
 *
 * To run a query within a React component, call `useBookQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookQuery({
 *   variables: {
 *      name: // value for 'name'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBookQuery(baseOptions?: Apollo.QueryHookOptions<BookQuery, BookQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BookQuery, BookQueryVariables>(BookDocument, options);
      }
export function useBookLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookQuery, BookQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BookQuery, BookQueryVariables>(BookDocument, options);
        }
export type BookQueryHookResult = ReturnType<typeof useBookQuery>;
export type BookLazyQueryHookResult = ReturnType<typeof useBookLazyQuery>;
export type BookQueryResult = Apollo.QueryResult<BookQuery, BookQueryVariables>;
export const BooksDocument = gql`
    query Books($limit: Int!, $offset: Int) {
  books(limit: $limit, offset: $offset) {
    ...OvBook
  }
}
    ${OvBookFragmentDoc}`;

/**
 * __useBooksQuery__
 *
 * To run a query within a React component, call `useBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBooksQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useBooksQuery(baseOptions: Apollo.QueryHookOptions<BooksQuery, BooksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BooksQuery, BooksQueryVariables>(BooksDocument, options);
      }
export function useBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BooksQuery, BooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BooksQuery, BooksQueryVariables>(BooksDocument, options);
        }
export type BooksQueryHookResult = ReturnType<typeof useBooksQuery>;
export type BooksLazyQueryHookResult = ReturnType<typeof useBooksLazyQuery>;
export type BooksQueryResult = Apollo.QueryResult<BooksQuery, BooksQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;