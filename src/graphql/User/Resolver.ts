import { User } from '../../types/User';
import { Context } from '../../types/Context';

export default {
  Query: {
    user: async (_: void, args: { id: number }, context: Context): Promise<User> => {
      const { db } = context;
      return await db.User.find();
    },
  },

  Mutation: {
    createAccount: (_: void, args: any, context: Context): User => {
      const { data } = args;
      const { db } = context;

      try {
        const user: User = new db.User({
          ...data,
        }).save();

        return user;
      } catch (e) {
        throw e;
      }

    },
  },
};

