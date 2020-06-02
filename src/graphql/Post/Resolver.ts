export default {
  Mutation: {
    createPost: async(_: void, args: any, context: any) => {
      const { db } = context;
      const { data } = args;
      return new db.Post({
        ...data,
      }).save();
    },
  },
};
