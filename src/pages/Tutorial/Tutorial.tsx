import React, { useState } from 'react'
import './Tutorial.scss'
import CollectCSV from '../../components/CollectCSV'
import { DoorDashOrderType } from '../../types'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { tutorialData } from '../../assets/data/tutorialData'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'

type TutorialProps = {
  setDataDD: (data: DoorDashOrderType[] | null) => void
}

const Tutorial = ({ setDataDD }: TutorialProps) => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const pageParam = queryParams.get('page')
  const page = pageParam ? parseInt(pageParam, 10) : 1

  const [step, setStep] = useState<number>(page - 1)
  const lastStepIndex = tutorialData.length - 1

  const incStep = () => {
    if (lastStepIndex === step) return
    setStep(prev => prev + 1)
  }
  const decStep = () => {
    if (step === 0) return
    setStep(prev => prev - 1)
  }

  return (
    <>
      <Helmet>
        <title>Upload Tutorial</title>
        <meta
          name='description'
          content='Instructions on how to retrieve and upload your doordash delivery data.'
        />
      </Helmet>
      <div className='tutorial-page'>
        <div className='steps-header'>
          {tutorialData.map((currStep, idx) => {
            const currStepNum = idx + 1
            return (
              <div
                className={`step-num ${
                  idx < step ? 'completed' : idx === step ? 'current' : 'todo'
                }`}
              >
                {idx !== 0 && <div className='line'></div>}
                <div className='num'>
                  <div className='name'>Step {currStepNum}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className='content'>
          <div className='img-container-outer'>
            <div className='step-img-container'>
              {step === lastStepIndex ? (
                <div className='upload-img'>
                  <div className='icon-container'>
                    <AiOutlineCloudUpload className='icon' />
                  </div>
                  <div className='text'>dasher_delivery_information.csv</div>
                </div>
              ) : (
                <img src={tutorialData[step].img} alt='' />
              )}
            </div>
          </div>
          <div className='instructions'>{tutorialData[step].description}</div>
        </div>

        <div className='btns'>
          <button className='back' onClick={decStep}>
            Back
          </button>
          {step !== lastStepIndex && (
            <button className='next' onClick={incStep}>
              Next
            </button>
          )}
          {step === lastStepIndex && <CollectCSV setData={setDataDD} />}
        </div>
      </div>
    </>
  )
}

export default Tutorial
