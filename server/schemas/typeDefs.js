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

  type Order {
    _id: ID
    purchaseDate: String
    snaps: [Snap]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
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

  type Task {
    purchaseDate: String
    snaps: [Snap]
  }

  type Query {
    departments: [Department]
    snaps: [Snap]
    snap(_id: ID!): Snap
    user: User
    order(_id: ID!): Order
    checkout(snaps: [SnapInput]): Checkout
    task(_id: ID!): Task
  }


  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addTask(snaps: [ID]!): [Task]
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateSnap(_id: ID!, quantity: Int!): Snap
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
