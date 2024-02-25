import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { loadFilesSync } from '@graphql-tools/load-files';
import { makeExecutableSchema } from '@graphql-tools/schema';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const typeDefsArray = loadFilesSync(path.join(__dirname, '../schemas'));
const resolversArray = loadFilesSync(path.join(__dirname, '../resolvers'));

const schema = makeExecutableSchema({
  typeDefs: typeDefsArray,
  resolvers: resolversArray
});

async function startApolloServer() {
  const server = new ApolloServer({ schema });

  const PORT = 4000;

  try {
    const { url } = await startStandaloneServer(server, { listen: { port: PORT} });
    console.log(`Servidor GraphQL en funcionamiento en ${url}`);
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
}

export { startApolloServer };
