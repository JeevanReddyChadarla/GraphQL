import {GraphQLServer} from 'graphql-yoga';

//schema
//resolvers

const typeDefs = `
type Query{
    me: User!
    post : Post!
}
type User{
    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    gender: String
}
type Post{
    id: ID!
    title: String!
    body:String!
    published : String!
}
`
const resolvers={
    Query: {
        
        me(){
            return{
                id: "jee112",
                name: "jeevan",
                age: 23,
                employed: true,
                gender: null
            }
        },
        post(){
            return{
                id: "postnumber123445667",
                title: "Farmers Protest",
                body: "Why are we not talking about the farmers protest in New Delhi",
                published: "By Rihanna"
            }
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