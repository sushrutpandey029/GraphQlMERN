import { gql } from "@apollo/client"

export const SIGNUP_USER = gql`
    mutation createUser($UserNew:UserInput!){
        user:signupUser(UserNew:$UserNew){
            firstname
        }
    }
`

export const LOGIN_USER = gql`
    mutation signinUser($UserSignin:UserSigninInput!){
        user:signinUser(UserSignin:$UserSignin){
            token
        }
    }
  
`


export const CREATE_QUOTE = gql`
    mutation createQuote($name:String!){
        quote:createQuote(name:$name)
    }
  
`
