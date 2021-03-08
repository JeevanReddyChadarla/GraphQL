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
            published: true
        },
        {
            id: '8999',
            title: 'Farm laws',
            body: 'Farm laws are against the farmers in India',
            published: true
        },{
            id: '77756',
            title: 'ReactJs',
            body: 'Facebook created by reactjs',
            published: true
        }
    ]


const typeDefs = 
    `
    type Query {
        user(query: String): [User!]!
        movies(sortby: String): [Moviedetails!]!
        me: User!
        post: Post!
        posts(keyword: String):[Post!]!
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

        posts(parent,args,ctx,info){
            if(!args.keyword){
                return posts
            }
            return posts.filter((x) => {
                return x.body.toLocaleLowerCase().includes(args.keyword.toLowerCase())
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

