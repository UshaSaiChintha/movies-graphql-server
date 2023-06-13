let movies = require('./data/movies')
const genres = require('./data/genres')

const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`

    type Movie {
        id: ID!
        title: String!
        year: String!
        genre: String!
        poster: String!
    }

    type Query {
        movies: [Movie]
    }
`

const resolvers = {
    Query: {
        movies: () => movies
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({url}) => {
    console.log(`Server is running at ${url}`)
})

