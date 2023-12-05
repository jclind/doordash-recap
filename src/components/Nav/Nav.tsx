import React from 'react'
import dasherRecapLogo from '../../assets/images/dasher-recap-logo.png'
import './Nav.scss'
import { Link, useLocation } from 'react-router-dom'

const Nav = () => {
  const location = useLocation()
  const currPath = location.pathname

  return (
    <nav>
      <div className='logo-container'>
        <Link to='/'>
          <div className='logo'>
            <img src={dasherRecapLogo} alt='Dasher Recap Logo' />
          </div>
          {currPath === '/' && <div className='title'>Dasher Recap</div>}
        </Link>
      </div>
    </nav>
  )
}

export default Nav
