const { AuthenticationError } = require('apollo-server-express');
const { User, Image } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate('images')
            .populate('friends');
  
          return userData;
        }
  
        throw new AuthenticationError('Not logged in');
      },
      users: async () => {
        return User.find()
          .select('-__v -password')
          .populate('images')
          .populate('friends');
      },
      user: async (parent, { username }) => {
        return User.findOne({ username })
          .select('-__v -password')
          .populate('friends')
          .populate('images');
      },
      images: async (parent, { username }) => {
        const params = username ? { username } : {};
        return Image.find(params).sort({ createdAt: -1 });
      },
      image: async (parent, { _id }) => {
        return Image.findOne({ _id });
      }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addReaction: async (parent, { imageId, reactionBody }, context) => {
      if (context.user) {
        const updatedImage = await Image.findOneAndUpdate(
          { _id: imageId },
          { $push: { reactions: { reactionBody, username: context.user.username } } },
          { new: true, runValidators: true }
        );

        return updatedImage;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addImage: async (parent, args, context) => {
      if (context.user) {
        const image = await Image.create({ ...args, username: context.user.username });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { images: image._id } },
          { new: true }
        );

        return image;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate('friends');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    }
  }
}

module.exports = resolvers