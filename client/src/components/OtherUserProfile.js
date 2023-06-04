import React from 'react'
// import { userQuery } from './CreateQuote';
import { useQuery } from '@apollo/client';
import { GET_MY_PROFILE, GET_USER_BY_ID } from '../gqloprations/queries';
import { useParams } from 'react-router-dom';



export default function OtherUserProfile() {
    const {userid} = useParams()
    console.log(userid)

    const { loading, error, data } = useQuery(GET_USER_BY_ID,{
        variables:{
            userid
        }
    })

    if (loading) return <h2>Profile is Loding</h2>



    if (error) {
        console.log(error)
    }

    if (data) {
        console.log(data)
    }
    return (
        <>
            <div><h1>Profile</h1>

                <h4>{data.user.firstname}  {data.user.lastname} </h4>
                <h4>{data.user.email}</h4>
            </div>




            <div><h1>quotes</h1>

                {
                    data.user.quotes.map(quo => {
                        return (

                            <h5>{quo.name}</h5>
                        )
                    })
                }

            </div>

        </>


    )

}

