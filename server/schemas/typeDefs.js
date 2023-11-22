const typeDefs = `
  type Department {
    _id: ID
    name: String
  }

  type Snap {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    department: Department
  }

  type Task {
    _id: ID
    purchaseDate: String
    snaps: [Snap]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    tasks: [Task]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  input SnapInput {
    _id: ID
    purchaseQuantity: Int
    name: String
    image: String
    price: Float
    quantity: Int
  }

  type Query {
    departments: [Department]
    snaps(department: ID, name: String): [Snap]
    snap(_id: ID!): Snap
    user: User
    task(_id: ID!): Task
    checkout(snaps: [SnapInput]): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addTask(snaps: [ID]!): Task
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateSnap(_id: ID!, quantity: Int!): Snap
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
