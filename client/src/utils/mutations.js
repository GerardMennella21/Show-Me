import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_IMAGE = gql`
  mutation addImage($imageText: String!) {
    addImage(imageText: $imageText) {
      _id
      imageText
      createdAt
      username
      reactionCount
      reactions {
        _id
      }
    }
  }
`

export const ADD_FOLLOWER = gql`
  mutation addFollower($id: ID!) {
    addFollower(followerId: $id) {
      _id
      username
      followerCount
      followers {
        _id
        username
      }
    }
  }
`;