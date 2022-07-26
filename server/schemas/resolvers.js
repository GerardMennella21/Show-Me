const { AuthenticationError } = require('apollo-server-express');
const { User, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // me: async (parent, args, context) => {
        //     if (context.use) {
        //         const userData = await User.findOne({ _id: context.User._id })
        //         .select('-__v - password')
        //         .populate('comments')
        //         .populate('friends')

        //         return userData;
        //     }

        //     throw new AuthenticationError('Not logged in');
        // },
        comments: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Comment.find(params).sort({ createdAt: -1 })
        }
    }
}

module.exports = resolvers;