const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID 
        username: String
        email: String
        friendCount: Int
        images: [Image]
        friends: [User]
    }

    type Image {
        _id: ID
        imageText: String
        createdAt: String
        username: String
        reactionCount: Int
        reactions: [Reaction]
        photo: String
      }

    type Auth {
        token: ID!
        user: User
    }

    type Reaction {
        _id: ID
        reactionBody: String
        createdAt: String
        username: String
      }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        images(username: String): [Image]
        image(_id: ID!): Image
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addReaction(imageId: ID!, reactionBody: String!): Image
        addFriend(friendId: ID!): User
        uploadImage(filename: String!): String!
    }
`

module.exports = typeDefs;