import { User, Auth } from '../../types/User';
import { Context } from '../../types/Context';
import {
  generatePassword,
  comparePassword,
  generateToken,
} from '../../utils/utils';


export default {
  Query: {
    getUserByUsername: async (_: void, args: { username: string }, context: Context): Promise<User> => {
      const { UserService } = context;
      const { username } = args;

      try {
        const response = await UserService.getUserByUsername({ username });
        return response.user;
      }catch (e) {
        throw e;
      }
    },
  },

  Mutation: {
    createAccount: async (_: void, args: any, context: Context): Promise<User> => {
      const { data } = args;
      const { UserService } = context;

      try {
        data.password = await generatePassword(data.password);
        const response =  await UserService.createUser({
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

      try {

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
      } catch (e) {
        throw e;
      }

    },
  },

  User: {
    posts: async (parent: { id: number }, _: void, context: Context) => {
      const { db } = context;
      return await db.Post.find({ author: parent.id });
    },
  },
};
