import { gql } from "apollo-server";

export const typeDefs = gql`
	type Movie {
		title: String!
		id: Int!
		shareholders: [Shareholder]
		transactions: [Transaction]
	}

	type Shareholder{
		id: Int!
		name: String!
		address: String!
		iban: String!
		movieId: Int!
		balance: Float
	}

	type Transaction{
		id: Int!
		movieId: Int!
		amount: Float!
		description: String!
	}

	type Wallet{
		id: Int!
		shareholder: Shareholder!
		movie: Movie!
	}

	type Query {
		getWallet(id: Int!): Wallet
		getShareholders: [Shareholder]
	}

	type Mutation{
		createMovie(input: MovieInput!): Movie
		createShareholder(input: ShareholderInput!): Shareholder
		createTransaction(input: TransactionInput!): Transaction
	}

	input MovieInput{
		title: String!
		id: Int!
	}

	input TransactionInput{
		id: Int!
		movieId: Int!
		amount: Float!
		description: String!
	}

	input ShareholderInput{
		id: Int!
		movieId: Int!
		name: String!
		address: String!
		iban: String!
		balance: Float
	}

`;