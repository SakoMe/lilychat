import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';

import models from './models';

const SECRET = 'qlkjdhlksdjhflkahdflakjfdhal';
const SECRET2 = 'lakjsdfqiuwyerlakjsdflajdfgasdf';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

app.use(cors('*'));

const graphqlEndPoint = '/graphql';

app.use(
  graphqlEndPoint,
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      models,
      user: {
        id: 1,
      },
      SECRET,
      SECRET2,
    },
  }),
);

app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndPoint }));

models.sequelize.sync({}).then(() => {
  app.listen(8080);
});
