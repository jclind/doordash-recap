import React from 'react'
import dasherRecapLogo from '../../assets/images/dasher-recap-logo.png'
import './Nav.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MdLeaderboard } from 'react-icons/md'

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
      {currPath === '/' && (
        <Link to='/leaderboard' className='leaderboard-btn'>
          <MdLeaderboard className='icon' />
        </Link>
      )}
    </nav>
  )
}

export default Nav
