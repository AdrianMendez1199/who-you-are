import { ApolloServer } from 'apollo-server';
import { resolvers, typeDefs } from './src/graphql';
import db from '@who-are-you-db/db';
import dotenv from 'dotenv';

dotenv.config();

process.on('unhandledRejection', (reason, promise): void => {
  console.log(`reason: ${reason}, promise: ${promise}`);
});

const server: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: (request): object => ({ request, db }),
});


server.listen().then(({ url }): void => {
  console.log(`Server running ${url}`);
});

