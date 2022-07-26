const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Comment {
   _id: ID 
   commentText: String
   createdAt: String
   username: String
   reactionCount: Int
   reactions: [Reaction]
}
type Query {
   me: User
   users: [User]
   user(username: String!): User
   comments(username:String): [Comment]
   comment(_id: ID!): Comment
}
`

module.exports = typeDefs;