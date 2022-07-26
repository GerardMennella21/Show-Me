const { AuthenticationError } = require('apollo-server-express');
const { User, Image } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
              .select('-__v -password')
              .populate('thoughts')
              .populate('friends');
          },
          user: async (parent, { username }) => {
            return User.findOne({ username })
              .select('-__v -password')
              .populate('friends')
              .populate('thoughts');
          },
    }
}

module.exports = resolvers
