import React, { useState } from 'react';
// import { SIGNUP_USER } from '../gqloprations/mutations';
import { useMutation } from '@apollo/client';
import { CREATE_QUOTE } from '../gqloprations/mutations';
import { Get_All_QUOTES } from '../gqloprations/queries';


export default function CreateQuote() {

    const [quote, setQuote] = useState({})
    const [createQuote, { data, loading, error }] = useMutation(CREATE_QUOTE,{
        refetchQueries:[
            'getAllQuotes',
            'getMyProfile'
        ]
    })


    const handleSubmit = (e) => {
        e.preventDefault() //page not refresh
        createQuote({
            variables: {
                name: quote
            }
        })
    }


    if (loading) return <h1>Loading</h1>

    if (error) {
        console.log(error.message)
    }

    if (data) {
        console.log(data)
    }
    return (
        <div className='container my-container'>
            {
                error &&
                <div className='red card-panel'>{error.message}</div>
            }

{
                data &&
                <div className='green card-panel'>{data.quote}</div>
            }

            <h5>CreateQuote!</h5>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type='text'
                    placeholder='pls Write your Quotes here'
                    value={quote}
                    // name='firstname'
                    onChange={(e) => setQuote(e.target.value)}
                    // onChange={(e) => handleChange(e)}
                    required />

                <button className='btn #673ab7 deep-purple' type='Submit'>Create</button>
            </form>

        </div>
    )
}
