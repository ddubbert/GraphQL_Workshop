require('dotenv').config()

const { GraphQLServer } = require('graphql-yoga')
const { express: middleware } = require('graphql-voyager/middleware')
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas')
const path = require('path')
const config = require('../config')

const schemaList = fileLoader(path.join(__dirname, './schemas'))
const resolverList = fileLoader(path.join(__dirname, './resolvers'))

const server = new GraphQLServer({
  typeDefs: mergeTypes(schemaList, { all: true }),
  resolvers: mergeResolvers(resolverList, { all: true }),
})

server.express.use(config.app.voyager, middleware({ endpointUrl: config.app.endpoint }))

const options = {
  port: config.app.port,
  playground: config.app.playground,
  endpoint: config.app.endpoint,
  debug: false
}

server.start(options, () => console.log(`Server is running on ${config.app.root}:${config.app.port}`))