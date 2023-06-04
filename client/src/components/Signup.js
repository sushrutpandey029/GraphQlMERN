import React, { useState } from 'react';
import { SIGNUP_USER } from '../gqloprations/mutations';
import {useMutation} from '@apollo/client';



export default function Signup() {

    const [formData, setFormData] = useState({})
    const [signupUser,{data,loading,Error}] = useMutation(SIGNUP_USER)
    if (loading) return <h1>Loading</h1>
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    } 
    const handleSubmit = (e) => {
        e.preventDefault() //page not refresh
        signupUser({
            variables:{
                UserNew:formData
            }
        })
    }

    return (
        <div className='container my-container'>

            {
                Error &&
                <div className='red card-panel'>{Error.message}</div>
            }

            {
                data && data.user && 
                <div className='green card-panel'>{data.user.firstname} is Signup. you can login now</div>
            }

            <h5>Signup!</h5>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type='text'
                    placeholder='Enter firstname'
                    // value={email}
                    name='firstname'
                    // onChange={(e) => setEmail(e.target.value)}
                    onChange={(e) => handleChange(e)}
                    required />

                <input
                    type='text'
                    placeholder='Enter lastname'
                    // value={email}
                    name='lastname'
                    // onChange={(e) => setEmail(e.target.value)}
                    onChange={(e) => handleChange(e)}
                    required />


                <input
                    type='email'
                    placeholder='Enter Email'
                    // value={email}
                    name='email'
                    // onChange={(e) => setEmail(e.target.value)}
                    onChange={(e) => handleChange(e)}
                    required />

                <input
                    type='password'
                    placeholder='Enter Password Here'
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    name='password'
                    onChange={(e) => handleChange(e)}
                    required />

                <button className='btn #673ab7 deep-purple' type='Submit'>Signup</button>
            </form>

        </div>
    )
}
