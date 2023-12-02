import React, { useState } from 'react'
import tutorial0 from '../../assets/images/tutorial-0.png'
import tutorial1 from '../../assets/images/tutorial-1.png'
import tutorial2 from '../../assets/images/tutorial-2.png'
import tutorial3 from '../../assets/images/tutorial-3.png'
import './Tutorial.scss'

const stepData = [
  {
    index: 0,
    img: tutorial0,
    description:
      "In the DoorDash Dasher app navigate to the 'Account' tab and click on 'Account data'.",
  },
  {
    index: 1,
    img: tutorial1,
    description: "Then on the manage account page, click 'Request Data'.",
  },
  {
    index: 2,
    img: tutorial2,
    description: "Click 'Request Data'",
  },
  {
    index: 3,
    img: tutorial3,
    description:
      "In the next couple minutes you should receive and email with your data. (It says several days but usually it's ready within minutes)",
  },
  {
    index: 0,
    img: tutorial0,
    description:
      "In the DoorDash Dasher app navigate to the 'Account' tab and click on 'Account data'",
  },
]

const Tutorial = () => {
  const [step, setStep] = useState(0)
  return <div>Tutorial</div>
}

export default Tutorial
