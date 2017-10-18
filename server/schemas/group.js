export default `

  type Group {
    owner: User!
    members: [User!]!
    channels: [Channel!]
  }

  type Mutation {
    createGroup(name: String!): Boolean!
  }
  
`;
