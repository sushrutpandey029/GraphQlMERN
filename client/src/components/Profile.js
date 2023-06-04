import React from 'react'
// import { userQuery } from './CreateQuote';
import { useQuery } from '@apollo/client';
import { GET_MY_PROFILE } from '../gqloprations/queries';
import { useNavigate } from 'react-router-dom';



export default function Profile() {

    const { loading, error, data } = useQuery(GET_MY_PROFILE)
    const navigate = useNavigate()

    if (!localStorage.getItem("token")) {

        navigate('/login')
        return <h1>Unauthrized User</h1>

    }

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

