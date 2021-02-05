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
    body: 'Why r v not talking on farmers laws',
    author: '1'
},
{
    id: '25',
    title: 'Tweet supporting Rihanna',
    published : 'Shashi Tharoor',
    body: 'World has take keen interest on farmers that out PM',
    author: '1'
},
{
    id: '26',
    title: 'Biden',
    published : 'Reporter',
    body: '46th president of usa',
    author: '2'
}

]

const comments=[{
    id: '1235',
    text: "Better not indulge in our farmers activities",
    author:'1'
},
{
    id: '2666',
    text:"People understand the perpose of farmers",
    author:'2'
},
{
    id: '3991',
    text: "This is a socialistic democratic country",
    author:'2'
},
{
    id: '4500',
    text: "Woohan is the hub for viruses",
    author:'3'
}
]

const typeDefs = `
type Query{
    users (query:String): [User!]!
    posts (query: String): [Post!]!
    me: User!
    post : Post!
    comments: [Comment!]!
}
type User{
    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    gender: String
    posts: [Post!]!
    comments: [Comment!]!
}
type Post{
    id: ID!
    title: String!
    body:String!
    published : String!
    author: User!
}
type Comment{
    id: ID!
    text: String!
    author: User!
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
               const bodyMatch =  post.body.toLowerCase().includes(args.query.toLowerCase())
               const titleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
               return bodyMatch || titleMatch;
           })
        },
        comments (parent,args,ctx,info){
           
                return comments
         
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
                id: "postnumber1234567",
                title: "Farmers Protest",
                body: "Why are we not talking about the farmers protest in New Delhi",
                published: "By Rihanna"
            }
        }
        
    },
    Post: {
        author(parent,args,ctx,info){
            return users.find((user) => {
                return user.id === parent.author
          
            })
        }
        },
        Comment: {
            author(parent, args, ctx, info) {
                return users.find((user) => {
                    return user.id === parent.author
                })
            }
        },
        User: {
            posts(parent, args, ctx, info) {
                return posts.filter((post) => {
                    return post.author === parent.id
                })
            },
            comments(parent,args,ctx,info){
                return comments.filter((comment) => {
                    return comment.author === parent.id
                })
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