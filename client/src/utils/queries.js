import { gql } from '@apollo/client';

export const QUERY_SNAPS = gql`
  query getSnaps($department: ID) {
    snaps(department: $department) {
      _id
      name
      description
      price
      quantity
      image
      department {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($snaps: [SnapInput]) {
    checkout(snaps: $snaps) {
      session
    }
  }
`;

export const QUERY_ALL_SNAPS = gql`
  {
    snaps {
      _id
      name
      description
      price
      quantity
      department {
        name
      }
    }
  }
`;

export const QUERY_DEPARTMENTS = gql`
  {
    departments {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        snaps {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;
