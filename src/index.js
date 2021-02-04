import {GraphQLServer} from 'graphql-yoga';

//schema
//resolvers

const users = [{
    id: '1',
    name: 'Jeevan',
    age: 23,
    employed: true,
    gender: 'Male'
},
{
    id: '2',
    name: 'Chadarla',
    age: 39,
    employed: true,
    gender: 'Male'   
},
{
id: '3',
name: 'Sanjay',
age: 66,
employed: true,
gender: 'Male'
},
]

const posts = [{
    id: '24',
    title: 'Farmers law',
    published : 'Rihanna',
    body: 'Why r v not talking on farmers laws'
},
{
    id: '25',
    title: 'Tweet supporting Rihanna',
    published : 'Shashi Tharoor',
    body: 'World has take keen interest on farmers that out PM'
},
{
    id: '26',
    title: 'Biden',
    published : 'Reporter',
    body: '46th president of usa'
}

]

const typeDefs = `
type Query{
    users (query:String): [User!]!
    posts (query: String): [Post!]!
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

        users(parent,args,ctx,info){
           if(!args.query){
               return users
           }
           return users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
           })
        },

        posts(parent, args,ctx,info){
           if(!args.query){
               return posts
           }
           return posts.filter((post) => {
               return post.body.toLowerCase().includes(args.query.toLowerCase())
           })
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