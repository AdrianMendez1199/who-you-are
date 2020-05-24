import { ApolloServer, PubSub } from 'apollo-server';
import { resolvers, typeDefs } from './src/graphql';
import db from '@who-are-you-db/db';
import { Context } from './src/types/Context';
import dotenv from 'dotenv';

dotenv.config();

const pubsub = new PubSub();

process.on('unhandledRejection', (reason, promise): void => {
  console.log(`reason: ${reason}, promise: ${promise}`);
});

const server: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: (request): Context => ({ request, db, pubsub }),
});


server.listen().then(({ url }): void => {
  console.log(`Server running ${url}`);
});

