import { Context } from '../../types/Context';

export default {
  Query: {
    getMyFriends: (_: void, args: any, context: Context) => {
      const { db, request } = context;
      // return db.Frind.find
    },

    getMyFriendRequest: () => { },

  },

  Mutation: {
    sendFriendRequest: (_: void, args: any, context: Context) => {
      const { requester, recipient } = args;
      const { db } = context;

      return new db.Friends({
        requester,
        recipient,
        status: 1,
      }).save();

    },

    acceptFriendRequest: () => { },
  },

};

