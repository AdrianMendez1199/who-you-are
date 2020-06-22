import { User, Auth } from '../../types/User';
import { Context } from '../../types/Context';
import {
  generatePassword,
  comparePassword,
  generateToken,
} from '../../utils/utils';


export default {
  Query: {
    user: async (_: void, args: { username: string }, context: Context): Promise<User> => {
      const { db } = context;
      return await db.User.find();
    },
  },

  Mutation: {
    createAccount: async (_: void, args: any, context: Context): Promise<any> => {
      const { data } = args;
      const { userservice } = context;

      try {
        data.password = await generatePassword(data.password);
        const response =  await userservice.createUser({
          ...data,
        });
        return response.user;
      } catch (e) {
        throw e;
      }
    },

    login: async (_: void, args: any, context: Context): Promise<Auth> => {
      const { db } = context;
      const { data } = args;

      const user = await db.User
        .findOne({ username: data.username })
        .select('+password');

      if (!user) {
        throw new Error('Invalid Credentials');
      }

      const isCorrectPassword = await comparePassword(data.password, user.password);

      if (!isCorrectPassword) {
        throw new Error('Invalid Credentials');
      }


      return {
        user: user.toJSON(),
        token: generateToken(user.toJSON()),
      };

    },
  },

  User: {
    posts: async (parent: any, args: any, context: Context) => {
      const { db } = context;
      return await db.Post.find({ author: parent.id });
    },
  },
};
