import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      snaps {
        _id
        snapTitle
        createdAt
      }
    }
  }
`;

export const QUERY_SNAPS = gql`
  query getSnaps {
    snaps {
      _id
      snapTitle
      snapDepartment
      createdAt
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleSnap($snapId: ID!) {
    snap(snapId: $snapId) {
      _id
      snapTitle
      snapDepartment
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      snaps {
        _id
        snapTitle
        snapDepartment
        createdAt
      }
    }
  }
`;
