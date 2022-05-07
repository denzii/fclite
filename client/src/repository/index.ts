import { gql } from "@apollo/client";

export default class Repository {
    static GetWallet = () => gql`
        query Query($Id: Int!) {
            getWallet(id: $Id) {
                id
                shareholder {
                    name
                    address
                    iban
                    movieId
                    balance
                }
                movie {
                    title
                    id
                    transactions {
                        id
                        movieId
                        description
                        amount
                    }
                }
            }
        }
    `
    static GetShareholders = () => gql`
        query GetShareholders {
            getShareholders {
                id
                name
            }
        }
    `
    static CreateMovie = () => gql`
        mutation CreateMovie($input: MovieInput!) {
            createMovie(input: $input) {
                id
                title
            }
        }
    `

    static CreateShareholder = () => gql`
        mutation CreateShareholder($input: ShareholderInput!) {
            createShareholder(input: $input) {
                name
                movieId
                id
                iban
                balance
                address
            }
        }
    `

    static CreateTransaction = () => gql`
        mutation CreateTransaction($input: TransactionInput!) {
            createTransaction(input: $input) {
                movieId
                id
                description
                amount
            }
        }
    `
}
