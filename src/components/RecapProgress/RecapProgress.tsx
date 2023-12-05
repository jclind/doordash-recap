import React from 'react'
import './RecapProgress.scss'
import { AiOutlineClose } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import dasherRecapLogo from '../../assets/images/dasher-recap-logo.png'

type RecapProgressProps = {
  numPages: number
  currPage: number
  setCurrPage: (val: number) => void
}

const RecapProgress = ({
  numPages,
  currPage,
  setCurrPage,
}: RecapProgressProps) => {
  const handleLineClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    i: number
  ) => {
    e.stopPropagation()
    setCurrPage(i)
  }

  const displayLines = () => {
    const lines: JSX.Element[] = []

    for (let i = 0; i <= numPages - 1; i++) {
      lines.push(
        <button className='line-btn' onClick={e => handleLineClick(e, i)}>
          <div
            className={`line ${currPage >= i ? 'highlighted' : 'dimmed'}`}
          ></div>
        </button>
      )
    }

    return lines.map(val => val)
  }

  const navigate = useNavigate()
  const handleClosePage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation()
    navigate('/')
  }

  return (
    <>
      <button className='home-logo-btn' onClick={handleClosePage}>
        <div className='logo'>
          <img src={dasherRecapLogo} alt='Dasher Recap Logo' />
        </div>
      </button>
      <div className='recap-progress'>
        <div className='line-container'>{displayLines()}</div>
      </div>
    </>
  )
}

export default RecapProgress
