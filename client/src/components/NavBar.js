import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar() {

  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  return (
    <nav >
      <div class="nav-wrapper #673ab7 deep-purple">
        <Link to="/" class="brand-logo left">post</Link>
        <ul id="nav-mobile" class="right">
          {
            token ?
              <>
                <li><Link to="/profile">UserProfile</Link></li>
                <li><Link to="/createquote">CreateQuote</Link></li>
                <li><button className='black btn' 
                onClick={()=>{
                  localStorage.removeItem("token")
                  navigate('/login')
                }}
                >Logout</button></li>
              </>:
              <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
              </>
          }


        </ul>
      </div>
    </nav>
  )
}
