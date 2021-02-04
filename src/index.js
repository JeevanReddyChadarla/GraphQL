import {GraphQLServer} from 'graphql-yoga';

//schema
//resolvers

const typeDefs = `
type Query{
    title: String!
    price: Int!
    releaseYear : Int!
    rating: Float
    inStock: Boolean!

}
`
const resolvers={
    Query: {
        title(){
            return 'Harrypotter'
        },
        price(){
            return 326
        },
        releaseYear(){
            return 2013
        },
        rating(){
            return null
        },
        inStock(){
            return true
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(()=>{
    console.log('running in port 4000');
})