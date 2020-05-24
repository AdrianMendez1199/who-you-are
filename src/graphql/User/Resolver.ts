import { User } from '../../types/User';
import { Context } from '../../types/Context';
import {
  generatePassword,
  comparePassword,
  generateToken } from '../../utils/utils';


export default {
  Query: {
    user: async (_: void, args: { id: number }, context: Context): Promise<User> => {
      const { db } = context;
      return await db.User.find();
    },
  },

  Mutation: {
    createAccount: async(_: void, args: any, context: Context): Promise<User> => {
      const { data } = args;
      const { db } = context;

      data.password = await generatePassword(data.password);

      try {

        const user: User = new db.User({
          ...data,
        }).save();

        return user;
      } catch (e) {

        throw e;

      }
    },

    login: async (_:void, args: any, context: Context) => {
      const { db } = context;
      const { data } = args;

      const user = await db.User
        .findOne({ username:  data.username });

      if (!user) {
        throw new Error('Invalid Credentials');
      }

      const isCorrectPassword = await comparePassword(data.password, user.password);

      if (!isCorrectPassword) {
        throw new Error('Invalid Credentials');
      }

      return {
        user, token: generateToken(user),
      };

    },
  },
};
