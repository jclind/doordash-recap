import React, { useState } from 'react'
import tutorial0 from '../../assets/images/tutorial-0.jpg'
import tutorial1 from '../../assets/images/tutorial-1.jpg'
import tutorial2 from '../../assets/images/tutorial-2.jpg'
import tutorial3 from '../../assets/images/tutorial-3.jpg'
import './Tutorial.scss'
import CollectCSV from '../../components/CollectCSV'
import { DoorDashOrderType } from '../../types'
import { AiOutlineCloudUpload } from 'react-icons/ai'

const stepData = [
  {
    index: 0,
    img: tutorial0,
    description:
      "In the DoorDash Dasher app navigate to the 'Account' tab and tap 'Account data'.",
  },
  {
    index: 1,
    img: tutorial1,
    description: "Then on the manage account page, tap 'Request Data'.",
  },
  {
    index: 2,
    img: tutorial2,
    description: "Tap 'Request Data'.",
  },
  {
    index: 3,
    img: tutorial3,
    description:
      "In a few minutes you should be emailed a download link from doordash. (DD says it takes days but it's usually minutes)",
  },
  {
    index: 0,
    img: tutorial0,
    description:
      "After downloading/extracting the files, click 'Upload' below and select 'dasher_delivery_information.csv' file.",
  },
]

type TutorialProps = {
  setDataDD: (data: DoorDashOrderType[] | null) => void
}

const Tutorial = ({ setDataDD }: TutorialProps) => {
  const [step, setStep] = useState(0)
  const lastStepIndex = stepData.length - 1

  const incStep = () => {
    if (lastStepIndex === step) return
    setStep(prev => prev + 1)
  }
  const decStep = () => {
    if (step === 0) return
    setStep(prev => prev - 1)
  }

  return (
    <div className='tutorial-page'>
      <div className='steps-header'>
        {stepData.map((currStep, idx) => {
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
              <img src={stepData[step].img} alt='' />
            )}
          </div>
        </div>
        <div className='instructions'>{stepData[step].description}</div>
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
  )
}

export default Tutorial
