export default `

  type User {
    id: Int!
    username: String!
    email: String!
    groups: [Group!]!
  }

  type Query {
    getUser(id: Int!): User!
    allUsers: [User!]!
  }

  type registerResponse {
    ok: Boolean!
    user: User
    errors: [Error!]
  }
  
  type Mutation {
    register(username: String!, email: String!, password: String!): registerResponse!
  }
`;
