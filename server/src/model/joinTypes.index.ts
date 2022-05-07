import { movies, shareholders, transactions } from "@prisma/client";

export type MovieWithShareholders = (movies & {shareholders: shareholders[];})
export type MovieWithTransactions = (movies & {transactions: transactions[];})

export type Wallet = {
    id: number;
    shareholder: shareholders;
    movie: MovieWithTransactions;
}