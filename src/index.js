import {GraphQLServer} from 'graphql-yoga';

//schema
//resolvers

const typeDefs = `
type Query{
    greeting(name: String): String!
    add(numbers: [Int!]!): Int!
    grades : [Int!]!
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

        greeting(parent,args,ctx,info)
        {
            if(args.name){
                return `Hello ${args.name}`
            }
            else{
                return `hello`
            }
        },
        add(parent, args, ctx, info)
        {  
                if(args.numbers.length === 0){
                    return 0
                }
                return args.numbers.reduce((accumulator, currentValue) => {
                    return accumulator+currentValue
                })
        },
        grades(parent,args,ctx,info){
            return [98,35,63]
        },
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