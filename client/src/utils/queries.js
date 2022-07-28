import { gql } from '@apollo/client'

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_IMAGES = gql`
  query images($username: String) {
    images(username: $username) {
      _id
      imageText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_IMAGE = gql`
  query image($id: ID!) {
    image(_id: $id) {
      _id
      imageText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      images {
        _id
        imageText
        createdAt
        username
        reactionCount
        reactions {
          _id
          createdAt
          username
          reactionBody
        }
      }
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;