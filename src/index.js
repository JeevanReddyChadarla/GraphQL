// import {GraphQLServer} from 'graphql-yoga';

// //schema
// //resolvers

// const users = [{
//     id: '1',
//     name: 'Jeevan',
//     age: 23,
//     employed: true,
//     gender: 'Male'
// },
// {
//     id: '2',
//     name: 'Chadarla',
//     age: 39,
//     employed: true,
//     gender: 'Male'   
// },
// {
// id: '3',
// name: 'Sanjay',
// age: 66,
// employed: true,
// gender: 'Male'
// },
// ]

// const posts = [{
//     id: '24',
//     title: 'Farmers law',
//     published : 'Rihanna',
//     body: 'Why r v not talking on farmers laws',
//     author: '1'
// },
// {
//     id: '25',
//     title: 'Tweet supporting Rihanna',
//     published : 'Shashi Tharoor',
//     body: 'World has take keen interest on farmers that out PM',
//     author: '1'
// },
// {
//     id: '26',
//     title: 'Biden',
//     published : 'Reporter',
//     body: '46th president of usa',
//     author: '2'
// }

// ]

// const comments=[{
//     id: '1235',
//     text: "Better not indulge in our farmers activities",
//     author:'1'
// },
// {
//     id: '2666',
//     text:"People understand the perpose of farmers",
//     author:'2'
// },
// {
//     id: '3991',
//     text: "This is a socialistic democratic country",
//     author:'2'
// },
// {
//     id: '4500',
//     text: "Woohan is the hub for viruses",
//     author:'3'
// }
// ]

// const typeDefs = `
// type Query{
//     users (query:String): [User!]!
//     posts (query: String): [Post!]!
//     me: User!
//     post : Post!
//     comments: [Comment!]!
// }
// type User{
//     id: ID!
//     name: String!
//     age: Int!
//     employed: Boolean!
//     gender: String
//     posts: [Post!]!
//     comments: [Comment!]!
// }
// type Post{
//     id: ID!
//     title: String!
//     body:String!
//     published : String!
//     author: User!
// }
// type Comment{
//     id: ID!
//     text: String!
//     author: User!
// }
// `
// const resolvers={
//     Query: {

//         users(parent,args,ctx,info){
//            if(!args.query){
//                return users
//            }
//            return users.filter((user) => {
//             return user.name.toLowerCase().includes(args.query.toLowerCase())
//            })
//         },

//         posts(parent, args,ctx,info){
//            if(!args.query){
//                return posts
//            }
//            return posts.filter((post) => {
//                const bodyMatch =  post.body.toLowerCase().includes(args.query.toLowerCase())
//                const titleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
//                return bodyMatch || titleMatch;
//            })
//         },
//         comments (parent,args,ctx,info){
           
//                 return comments
         
//         },

//         me(){
//             return{
//                 id: "jee112",
//                 name: "jeevan",
//                 age: 23,
//                 employed: true,
//                 gender: null
//             }
//         },
//         post(){
//             return{
//                 id: "postnumber1234567",
//                 title: "Farmers Protest",
//                 body: "Why are we not talking about the farmers protest in New Delhi",
//                 published: "By Rihanna"
//             }
//         }
        
//     },
//     Post: {
//         author(parent,args,ctx,info){
//             return users.find((user) => {
//                 return user.id === parent.author
          
//             })
//         }
//         },
//         Comment: {
//             author(parent, args, ctx, info) {
//                 return users.find((user) => {
//                     return user.id === parent.author
//                 })
//             }
//         },
//         User: {
//             posts(parent, args, ctx, info) {
//                 return posts.filter((post) => {
//                     return post.author === parent.id
//                 })
//             },
//             comments(parent,args,ctx,info){
//                 return comments.filter((comment) => {
//                     return comment.author === parent.id
//                 })
//             }
//         }

//     }


// const server = new GraphQLServer({
//     typeDefs,
//     resolvers
// })

// server.start(()=>{
//     console.log('running in port 4000');
// })

import {GraphQLServer} from 'graphql-yoga';

// type def (schema)

const users=[
    {
    id: '1',
    name: 'Jeevan',
    email: 'jeevan@sastra.ac.in',
    age: 23

},
{
    id: '2',
    name: 'cognizant',
    email: 'cognizant@sastra.ac.in',
    age: 50

},  {
    id: '3',
    name: 'Rakesh',
    email: 'rakesh@sastra.ac.in',
    age: 25

},  {
    id: '4',
    name: 'chadarla',
    email: 'chadarla@sastra.ac.in',
    age: 30

}
]

const movies = [
    {
        name: 'Avengers',
        likes: 0,
        banner: 'https://images-na.ssl-images-amazon.com/images/I/81ExhpBEbHL._SY445_.jpg'
    },
    {
        name: 'Money Heist',
        likes: 0,
        banner: 'https://media1.popsugar-assets.com/files/thumbor/nenOyZ9yShhaU723TiDgOhRAUfQ/560x0:2000x1440/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/07/31/789/n/44498184/f1e7dd4c5f245b63376cd6.99549863_/i/money-heist-season-5-cast.jpg'
    },
    {
        name: 'Delhi crimes',
        likes: 0,
        banner: 'https://i1.wp.com/feminisminindia.com/wp-content/uploads/2019/04/DC.jpg?fit=875%2C583&ssl=1'
    }
]

const typeDefs = 
    `
    type Query {
        user(query: String): [User!]!
        movies(sortby: String): [Moviedetails!]!
        me: User!
        post: Post!
    }
    type User{
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float

    }
    type Post{
        id: ID!
        title: String!
        body: String!
        published : Boolean!
    }
    type Moviedetails{
        name: String!
        banner: String!
        likes: Int!
    }
    `

// resolvers

const resolvers = {
    Query: {
        user(parent,args,ctx,info){
            if(!args.query){
                return user 
            }
            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },

        movies(parent,args,ctx,info){
            if(!args.sortby){
                return movies 
            }
            return movies.filter((k) => {
                return k.name.toLowerCase().includes(args.sortby.toLowerCase())
            })
        },
      
        me(){
            return{
                id : 'abc123',
                name: 'Jeevan Chadarla',
                age: 32,
                employed: true,  
                gpa: null
            }
        },

        post(){
            return{
                id: 123336,
                title: 'FaceBook',
                body: 'WhatsApp is taking off the privacy rules',
                published : true
            }
        },
       
       
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(()=>{
    console.log('running in port 4000');
})

