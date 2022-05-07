export type AddShareHolderFormState = { shareholderId: number| string, shareholderName: string, shareholderAddress: string, shareholderIban: string, shareholderMovieId: number|string }
export type AddMovieFormState = {movieId: number | string, movieName: string};
export type AddTransactionFormState = {
    transactionId: string | number,
    movieId: string,
    amount: number | string,
    transactionDescription: string
};

