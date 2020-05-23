import { ApolloServer } from 'apollo-server';
import { resolvers, typeDefs } from './src/graphql';
import db from '@who-are-you-db/db';
import { Context } from './src/types/Context';
import dotenv from 'dotenv';

dotenv.config();

process.on('unhandledRejection', (reason, promise): void => {
  console.log(`reason: ${reason}, promise: ${promise}`);
});

const server: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: (request): Context => ({ request, db }),
});


server.listen().then(({ url }): void => {
  console.log(`Server running ${url}`);
});

