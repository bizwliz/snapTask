import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query getProducts($department: ID) {
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
  query getCheckout($snaps: [ProductInput]) {
    checkout(snaps: $snaps) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
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

export const QUERY_CATEGORIES = gql`
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
      tasks {
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
