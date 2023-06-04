import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { Get_All_QUOTES } from '../gqloprations/queries'
import { Link } from 'react-router-dom'
export default function Home() {

  const { loading, error, data } = useQuery(Get_All_QUOTES)

  if (loading) return <h1>Loading</h1>
  if (error) {
    console.log(error.message)
  }
  if(data.quotes.length == 0){
    return <h1>No data found</h1>
  }
  // not good method traditnal method
  // useEffect(()=>{
  //   fetch('http://localhost:4000',{
  //     method:"post",
  //     headers:{
  //       'Content-Type':"application/json"
  //     },
  //     body:JSON.stringify({
  //       query:`
  //       query getAllQuotes{
  //         quotes{
  //           name
  //           by{
  //             _id
  //             firstname
  //           }
  //         }
  //       }
  //       `

  //     })
  //   }).then(res=>res.json())
  //   .then(data=>console.log(data))

  // },[])


  return (
    <div className='container'>
      {
        data.quotes.map(quote => {
          return (

            <blockquote>
              <h6>{quote.name}</h6>
             <Link to={`/profile/${quote.by._id}`}><p className='right-align'>~{quote.by.firstname}</p></Link> 
            </blockquote>

          )
        })
      }

    </div>
  )
}
