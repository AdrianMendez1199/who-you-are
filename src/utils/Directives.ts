import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server';
import { defaultFieldResolver, GraphQLField } from 'graphql';
import { tokenIsValid } from '../utils/utils';

export class IsAuthenticated extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: GraphQLField<CallableFunction, CallableFunction>):
    GraphQLField<CallableFunction, CallableFunction> | void {

    const originalResolve = field.resolve || defaultFieldResolver;

    field.resolve = async function (...args: any): Promise<CallableFunction> {
      const context = args[2];

      if (!context.request.req.headers.authorization) {
        throw new AuthenticationError('Not authenticate');
      }

      tokenIsValid(context.request.req.headers.authorization);
      return await originalResolve.apply(this, args);
    };
  }
}
