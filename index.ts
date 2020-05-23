import { ApolloServer } from 'apollo-server';
import { resolvers, typeDefs } from './src/graphql';

process.on('unhandledRejection', (reason, promise): void => {
  console.log(`reason: ${reason}, promise: ${promise}`);
});

const server: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: (request): object => ({ request }),
});


server.listen().then(({ url }): void => {
  console.log(`Server running ${url}`);
});

