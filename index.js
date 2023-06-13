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

    input MovieFilter {
        genre: String
    }

    type Query {
        movies(filter: MovieFilter): [Movie]
    }
`
const getAllMovies = (filter) => {

    let filteredMovies = movies

    if(filter) {
        if(filter.genre) {
            filteredMovies = movies.filter(movie => movie.genre == filter.genre)
        }
    }

    console.log(filteredMovies)
    return filteredMovies

}

const resolvers = {
    Query: {
        movies: (_, { filter }) => getAllMovies(filter)
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({url}) => {
    console.log(`Server is running at ${url}`)
})

