import { Context } from '../../types/Context';
import { getTokenFromHeaders, tokenIsValid } from '../../utils/utils';

export default {
  Query: {
    getMyFriends: (_:void , args: any, context: Context) => {
      const { db, request } = context;
      // return db.Frind.find
    },

    getMyFriendRequest: () => { },
  },

  Mutation: {
    addToMyFriend: () => {},

    acceptFriendRequest: () => {},
  },

};

