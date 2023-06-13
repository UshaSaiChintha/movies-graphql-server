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

    type Genre {
        name: String!
    }

    input MovieInput {
        id: ID
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
        genres: [Genre]
    }

    type Mutation {
        addMovie(movie: MovieInput): Movie
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

const addMovie = (movie) => {
    movie.id = movies.length + 1
    movies.push(movie)
    return movie
}

const resolvers = {
    Query: {
        movies: (_, { filter }) => getAllMovies(filter),
        genres: () => genres
    },
    Mutation: {
        addMovie: (_, { movie }) => addMovie(movie)
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({url}) => {
    console.log(`Server is running at ${url}`)
})

