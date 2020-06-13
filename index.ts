import { ApolloServer, PubSub } from 'apollo-server';
import { resolvers, typeDefs } from './src/graphql';
import db from '@who-are-you-db/db';
import UserService from '@who-are-you-db/db/src/services/user/user-client';
import { Context } from './src/types/Context';
import dotenv from 'dotenv';
import { IsAuthenticated } from './src/utils/Directives';

dotenv.config();

const pubsub = new PubSub();
process.on('unhandledRejection', (reason, promise): void => {
  console.log(`reason: ${reason}, promise: ${promise}`);
});

const userservice = UserService.UserService;

const server: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: (request): Context => ({ request, db, pubsub, userservice }),
  schemaDirectives: { isAuthenticated: IsAuthenticated },
});


server.listen().then(({ url }): void => {
  console.log(`Server running ${url}`);
});

