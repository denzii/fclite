import { movies, PrismaClient, shareholders, transactions } from '@prisma/client'
import { MovieWithShareholders, MovieWithTransactions, Wallet } from '../model/joinTypes.index';

const prisma = new PrismaClient()

/**@TODO Catch the errors and send back user friendly error messages if any time left in the end */
export const resolvers = {
	Query: {
		getWallet: async(parent: any, args: any, context: any, info: any) => {
			// a wallet isnt a thing, have to project it from shareholders and movies on the go
			const shareholder:  (shareholders & {movies: movies;}) | null = await prisma.shareholders.findUnique({
				where: {
					id: args.id
				},
				include: {
					movies: true,
				}
			})
			if (!shareholder)
				throw new Error(`Shareholder with id ${args.input.id} not found, wallet cannot be fetched.`)

			const movies: MovieWithTransactions | null = await prisma.movies.findUnique({
				where: {
					id: shareholder.movieId
				},
				include: {
					transactions: true
				}
			})
			if (!movies)
				throw new Error(`movie with id ${shareholder.movieId} not found, wallet cannot be fetched.`)
			
			return <Wallet>{
				id: shareholder.id,
				movie: movies,
				shareholder
			};
		},
		getShareholders: async(parent: any, args: any, context: any, info: any) => {
			return await prisma.shareholders.findMany({
				orderBy: {
					  id: 'asc',
				  },
			});
		}
	},
	Mutation: {
		createMovie: async(parent: any, args: any, context: any, info: any) => {
			return await prisma.movies.create({
				data: {
				  id: args.input.id,
				  title: args.input.title,
				},
			  })
		},
		createShareholder: async(parent: any, args: any, context: any, info: any) => {
			return await prisma.shareholders.create({
				data: {
					id: args.input.id,
					movieId: args.input.movieId,
					name: args.input.name,
					address: args.input.address,
					iban: args.input.iban,
					balance: args.input.balance ?? 0
				}
			})
		},
		createTransaction: async(parent: any, args: any, context: any, info: any) => {
			// need interactivity as there are validation & custom logic to follow in between the queries
			return await prisma.$transaction(async (prisma) => {
				// 1. fetch the movie and its shareholders for that transaction
				const movie: MovieWithShareholders | null = await prisma.movies.findUnique({
					where: {
						id: args.input.movieId
					},
					include: {
						shareholders: true,
					},
				  })
				
				// 2. validate if transaction is legit 
				if (!movie) 
					throw new Error("Movie not found, rolling back the db transaction");  
				if (movie.shareholders.length === 0) 
					throw new Error("Movie does not have any shareholders to receive the funds, rolling back the db transaction");
				

				// 3. add the transaction to the db
				const transaction: transactions | null = await prisma.transactions.create({
					data: {
					  id: args.input.id,
					  movieId: args.input.movieId,
					  amount: args.input.amount,
					  description: args.input.description,
					},
				  })

				// 4. find which amount is needed to be deposited into each shareholder account
				const amountToDeposit: number = transaction.amount / movie.shareholders.length;

				// 5. deposit the amount into each shareholder account
				await Promise.all(movie.shareholders.map(async (shareholder) => {
					const updatedShareholder = await prisma.shareholders.update({
						data: {
							balance: {
								increment: amountToDeposit,
							},
						},
						where: {
							id: shareholder.id,
						},
					})
					return updatedShareholder
				}))

				return transaction;
			  })
		}
	}
};
