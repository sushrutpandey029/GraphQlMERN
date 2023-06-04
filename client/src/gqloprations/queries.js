import { gql } from "@apollo/client"

export const Get_All_QUOTES = gql`
query getAllQuotes{
    quotes{
      name
      by{
        _id
        firstname
      }
    }
  }
`

export const GET_MY_PROFILE = gql`
query getMyProfile{
  user:myprofile{
    firstname
    lastname
    email
    quotes{
      name
    }
  }
}
`

export const GET_USER_BY_ID = gql`
query getUserById($userid: ID!){
  user(_id:$userid){
    _id
    firstname
    lastname
    email
    quotes{
      name
    }
  }
}
`
