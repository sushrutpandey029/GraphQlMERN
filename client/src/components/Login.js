import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../gqloprations/mutations';
import {useNavigate } from 'react-router-dom';


export default function Login() {
  
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    const [signinUser,{data,loading,error}] = useMutation(LOGIN_USER,{
        onCompleted(data){
            localStorage.setItem("token",data.user.token)
            navigate('/')
        }
    })


    if (loading) return <h1>Loading</h1>

    // if (data) {
    //     localStorage.setItem("token",data.user.token)
    //     navigate('/')
    // }
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault() //page not refresh
        signinUser({
            variables: {
                UserSignin:formData
            }
        })

    }


    return (
        <div className='container my-container'>

            {
                error &&
                <div className='red card-panel'>{error.message}</div>
            }

            <h5>Login!</h5>
            <form onSubmit={(e) => handleSubmit(e)}>
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

                <button className='btn #673ab7 deep-purple' type='Submit'>Login</button>
            </form>

        </div>
    )
}
