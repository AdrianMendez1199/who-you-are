export default {
  Query: {

  },

  Mutation: {
    sendMessage: async (_: void, args: any, context: any) => {
      const { db, pubsub } = context;
      const { to, message } = args;

      const sendMessage = db.Message({
        message,
        to,
      });

      const messageToUser = await sendMessage.save();
      pubsub.publish(`message-user-${sendMessage.to}`,  {
        newMessage: { data: sendMessage },
      });
      return messageToUser;
    },
  },

  Subscription: {

    newMessage: {
      subscribe: (_: void, args: any, context: any) => {
        const { pubsub }  = context;
        return pubsub.asyncIterator(`message-user-${args.id}`);
      },
    },
  },

};
