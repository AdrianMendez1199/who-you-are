import { ApolloServer } from 'apollo-server';
import { resolvers, typeDefs } from './src/graphql';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }): void => {
  console.log(`Server running ${url}`);
});

