import { Context } from '../../types/Context';

export default {
  Query: {
    getMessages: async (_: void, args: any, context: Context): Promise<[]> => {
      const { userId } = args;

      const messages = await context.db.Message.find({
        to: userId,
      }).populate('to')
        .populate('sentBy')
        .sort({ sendAt: 'desc' })
        .exec();

      return messages;
    },
  },

  Mutation: {
    sendMessage: async (_: void, args: any, context: Context): Promise<{}> => {
      const { db, pubsub } = context;
      const { to, message, sentBy } = args.data;

      const sendMessage = new db.Message({
        message,
        to,
        sentBy,
      });

      const messageToUser = await sendMessage.save();
      pubsub.publish(`message-user-${sendMessage.to}`, {
        newMessage: { data: sendMessage },
      });

      return messageToUser;
    },
  },

  Subscription: {

    newMessage: {
      subscribe: (_: void, args: any, context: Context) => {
        const { pubsub } = context;
        return pubsub.asyncIterator(`message-user-${args.id}`);
      },
    },
  },

};
