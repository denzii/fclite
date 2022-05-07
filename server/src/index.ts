import { resolvers } from "./graphql/resolver";
import { typeDefs } from "./graphql/schema";
// import { client, pgClient } from "./persistence";
import * as dotenv from "dotenv";
import { exit } from "process";
import { ApolloServer, gql } from "apollo-server"

declare global {
	namespace NodeJS {
	  interface ProcessEnv {
		NODE_ENV: 'development' | 'production';
    	DB_USER: string;
    	DB_HOST: string;
    	DB_NAME: string;
	    DB_PASS: string;
    	DB_PORT: number;
	    DB_URL: string;
	  }
	}
}

dotenv.config();

const server = new ApolloServer({
	typeDefs,
	resolvers
});



server.listen().then(({ url }: {url:string}) =>	console.log(`🚀  Server ready at ${url}`));

