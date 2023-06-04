import {gql} from "apollo-server-express"

const typeDefs = gql`
type Query{
    users:[User]
    user(_id:ID!):User
    quotes:[QuoteWithName]
    userquotes(by:ID!):[Quote]
    myprofile:User
}

type QuoteWithName{
    name:String
    by:IDName
}

type IDName{
    _id:String
    firstname:String
}

type User{
    _id:ID!
    firstname:String
    lastname:String
    email:String
    password:String
    quotes:[Quote]
}

type Quote{
    by:ID!
    name:String
}

type Token{
    token:String
}

type Mutation{
    signupUser(UserNew:UserInput!):User
    signinUser(UserSignin:UserSigninInput!):Token
    createQuote(name:String!):String
}

input UserInput{
    firstname:String! 
    lastname:String!  
    email:String! 
    password:String!
}

input UserSigninInput{ 
    email:String! 
    password:String!
}
`


export default typeDefs