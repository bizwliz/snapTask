const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    snaps: [Thought]!
  }

  type Thought {
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
    snaps(username: String): [Thought]
    snap(snapId: ID!): Thought
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addSnap(snapTitle: String!): Thought
    addComment(snapId: ID!, commentText: String!): Thought
    removeThought(snapId: ID!): Thought
    removeComment(snapId: ID!, commentId: ID!): Thought
  }
`;

module.exports = typeDefs;
