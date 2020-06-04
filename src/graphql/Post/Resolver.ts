import { Context } from '../../types/Context';

export default {
  Query: {
    getPost: async(_: void, args: any, context: Context) => {
      const { db } = context;
      const { id } = args;

      if (id) {
        return await db.Post.findOne(id);
      }

      return await db.Post.find();

    },
  },
  Mutation: {
    createPost: async (_: void, args: any, context: Context) => {
      const { db } = context;
      const { data } = args;
      return new db.Post({
        ...data,
      }).save();
    },

    createCommentary: async (_: void, args: any, context: Context) => {
      const { db } = context;
      const { data } = args;
      return new db.Commentary({
        ...data,
      }).save();
    },
  },

  Post: {
    commentaries: async (parent: {_id: number}, _: void, context: Context) => {
      const { db } = context;
      const { _id } = parent;
      return await db.Commentary.find({ post: _id });
    },

    author: async (parent: {author: number}, _: void, context: Context) => {
      const { db } = context;
      const { author } = parent;
      return await db.User.findOne({ _id: author });

    },
  },

  Commentary: {
    author: async (parent: {author: number}, _: void, context: Context) => {
      const { db } = context;
      const { author } = parent;
      return await db.User.find({ _id: author });
    },
  },
};
