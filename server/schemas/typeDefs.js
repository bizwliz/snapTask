const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    snaps: [Snap]!
  }

  type Snap {
    _id: ID
    snapTitle: String
    snapDepartment: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    snaps(username: String): [Snap]
    snap(snapId: ID!): Snap
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addSnap(snapTitle: String!): Snap
    addComment(snapId: ID!, commentText: String!): Snap
    removeSnap(snapId: ID!): Snap
    removeComment(snapId: ID!, commentId: ID!): Snap
  }
`;

module.exports = typeDefs;
