import { User } from '../../../types/User';

export default {
  Query: {
    /**
     * @param _ @void
     * args @object
     * context @unknown
     */
    user: (_:void, args: {id: number}, context: unknown): User => {
      return {
        name: 'Adrian',
        lastname: 'Mendez',
        bio: 'Desarrollador',
        username: 'Amendez',
      };
    },
  },

};
