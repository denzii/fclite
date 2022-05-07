/***@TODO investigate how this can be automated if any time left */

import { ApolloCache, DefaultContext, MutationTuple } from "@apollo/client";
export type CreateMovieResult = MutationTuple<Movie, { input: MovieInput; }, DefaultContext, ApolloCache<any>>
export type CreateShareholderResult = MutationTuple<Shareholder, { input: ShareholderInput; }, DefaultContext, ApolloCache<any>>
export type CreateTransactionResult = MutationTuple<Transaction, { input: TransactionInput; }, DefaultContext, ApolloCache<any>>

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Movie = {
  __typename?: 'Movie';
  title: Scalars['String'];
  id: Scalars['Int'];
  shareholders?: Maybe<Array<Maybe<Shareholder>>>;
  transactions?: Maybe<Array<Maybe<Transaction>>>;
};

export type Shareholder = {
  __typename?: 'Shareholder';
  id: Scalars['Int'];
  name: Scalars['String'];
  address: Scalars['String'];
  iban: Scalars['String'];
  movieId: Scalars['Int'];
  balance?: Maybe<Scalars['Float']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  id: Scalars['Int'];
  movieId: Scalars['Int'];
  amount: Scalars['Float'];
  description: Scalars['String'];
};

export type Wallet = {
  __typename?: 'Wallet';
  id: Scalars['Int'];
  shareholder: Shareholder;
  movie: Movie;
};

export type Query = {
  __typename?: 'Query';
  getWallet?: Maybe<Wallet>;
};


export type QueryGetWalletArgs = {
  id: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMovie?: Maybe<Movie>;
  createShareholder?: Maybe<Shareholder>;
  createTransaction?: Maybe<Transaction>;
};


export type MutationCreateMovieArgs = {
  input: MovieInput;
};


export type MutationCreateShareholderArgs = {
  input: ShareholderInput;
};


export type MutationCreateTransactionArgs = {
  input: TransactionInput;
};

export type MovieInput = {
  title: Scalars['String'];
  id: Scalars['Int'];
};


export type TransactionInput = {
  id: Scalars["Int"]
  movieId: Scalars["Int"]
  amount: Scalars["Float"]
  description: Scalars["String"]
};

export type ShareholderInput = {
  id: Scalars['Int'];
  movieId: Scalars['Int'];
  name: Scalars['String'];
  address: Scalars['String'];
  iban: Scalars['String'];
  balance?: InputMaybe<Scalars['Float']>;
};
