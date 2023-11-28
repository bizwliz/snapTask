import { gql } from '@apollo/client';

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

export const ADD_SNAP = gql`
  mutation addSnap($snapTitle: String!) {
    addSnap(snapTitle: $snapTitle) {
      _id
      snapTitle
      snapDepartment
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($snapId: ID!, $commentText: String!) {
    addComment(snapId: $snapId, commentText: $commentText) {
      _id
      snapTitle
      snapDepartment
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
