import React from 'react'
import dasherRecapLogo from '../../assets/images/dasher-recap-logo.png'
import './Nav.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Nav = () => {
  const location = useLocation()
  const currPath = location.pathname

  const navigate = useNavigate()

  const handleLogoClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation()
    navigate('/')
  }

  return (
    <nav>
      <button className='logo-btn' onClick={handleLogoClick}>
        <img src={dasherRecapLogo} alt='Dasher Recap Logo' />
        {currPath === '/' && <span className='title'>Dasher Recap</span>}
      </button>
    </nav>
  )
}

export default Nav
