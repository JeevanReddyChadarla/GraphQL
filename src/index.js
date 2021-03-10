import {GraphQLServer} from 'graphql-yoga';
import uuidv4 from 'uuid/v4';
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
    },
    {
        name: 'Delhi crimes',
        likes: 0,
        banner: 'https://i1.wp.com/feminisminindia.com/wp-content/uploads/2019/04/DC.jpg?fit=875%2C583&ssl=1'
    }
]

    const posts =[
        {
            id: '12333456',
            title: 'Elections',
            body: 'There are new political parties in India',
            published: true,
            author: '1'
        },
        {
            id: '8999',
            title: 'Farm laws',
            body: 'Farm laws are against the farmers in India',
            published: true,
            author: '2'
        },{
            id: '77756',
            title: 'ReactJs',
            body: 'Facebook created by reactjs',
            published: true,
            author: '2'
        }
    ]
const comments=[
    {
        id: '456',
        author: '1',
        post:'8999',
        text: 'These are internal issues'
    },
    {
        id: '789',
        author: '1',
        post:'77756',
        text: 'Elections in WestBengal'
    },
    {
        id: '741',
        author: '2',
        post:'8999',
        text: 'Angular is created by Google'
    },
    {
        id: '963',
        author: '3',
        post:'77756',
        text: 'This is graphql'
    }
]

const typeDefs = 
    `
    type Query {
        user(query: String): [User!]!
        movies(sortby: String): [Moviedetails!]!
        me: User!
        post: Post!
        posts(query: String):[Post!]!
        comments: [Comment!]!
    }

    type Mutation{
        createUser(name: String!, email: String, age: Int) : User!
    }

    type User{
        id: ID!
        name: String!
        age: Int
        email: String!
        employed: Boolean!
        gpa: Float
        posts: [Post!]!
        comments: [Comment!]!

    }
    type Post{
        id: ID!
        title: String!
        body: String!
        published : Boolean!
        author: User!
        comments: [Comment!]!
    }
    type Moviedetails{
        name: String!
        banner: String!
        likes: Int!
    }
    type Comment{
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
    `

// resolvers

const resolvers = {
    Query: {
        user(parent,args,ctx,info){
            if(!args.query){
                return users 
            }
            return users.filter((p) => {
                return p.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },

        comments(parent,args,ctx,info){
            return comments
        },

        movies(parent,args,ctx,info){
            if(!args.sortby){
                return movies 
            }
            return movies.filter((k) => {
                return k.name.toLowerCase().includes(args.sortby.toLowerCase())
            })
        },

        posts(parent,args,ctx,info){
            if(!args.query){
                return posts
            }
            return posts.filter((x) => {
                return x.body.toLocaleLowerCase().includes(args.query.toLowerCase())
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
        }
    },
    Mutation: {
        createUser(parent,args,ctx,info){
            const emailTaken = users.some((k)=> {
            return k.email === args.email
            })
            if(emailTaken){
                throw new Error ('Email exist')
            }
            const x={
                id: uuidv4(),
                name: args.name,
                email: args.email,
                age: args.age
            }
            users.push(x)
            
            return x
        }
    },
    Post: {
        author(parent,args,ctx,info){
            return users.find((k) => {
                return k.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id
            })
        }
    },
    User:{
        posts(parent,args,ctx,info){
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments(parent,args,ctx,info){
            return comments.filter((c) => {
               return c.author === parent.id
            })
        }
    },
    Comment: {
        author(parent,args,ctx,info){
            return users.find((c) => {
                return c.id === parent.author 
            })
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id === parent.post
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

