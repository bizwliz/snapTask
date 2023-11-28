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

  type Department {
    _id: ID!
    snapDepartment: String!
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
    departments: [Department]  
    department(departmentId: ID!): Department
    me: User
  }


  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addSnap(snapTitle: String!, snapDepartment: String): Snap  # Modify to accept snapDepartment
    addComment(snapId: ID!, commentText: String!): Snap
    addDepartment(name: String!): Department  # Add a mutation for adding a department
    removeSnap(snapId: ID!): Snap
    removeComment(snapId: ID!, commentId: ID!): Snap
  }
`;

module.exports = typeDefs;
