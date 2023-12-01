import React from 'react'
import Nav from '../components/Nav/Nav'

const TermsOfService = () => {
  return (
    <div className='terms-of-service-page legal-page'>
      <div className='content'>
        <h1>Terms and Conditions for Dasher Recap</h1>
        <p>Last updated: December 1, 2023</p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By using the Dasher Recap application (the "App"), you agree to
            comply with these Terms and Conditions. If you do not agree with any
            part of these terms, please do not use the App.
          </p>
        </section>

        <section>
          <h2>2. Firebase and Google Analytics</h2>
          <p>
            Dasher Recap utilizes Firebase and Google Analytics for analytics
            and other services. Users must adhere to the terms and policies of
            Firebase and Google Analytics. You can find the Firebase terms{' '}
            <a
              href='https://firebase.google.com/terms'
              target='_blank'
              rel='noopener noreferrer'
            >
              here
            </a>{' '}
            and the Google Analytics terms{' '}
            <a
              href='https://analytics.google.com/analytics/terms/'
              target='_blank'
              rel='noopener noreferrer'
            >
              here
            </a>
            .
          </p>
        </section>

        <section>
          <h2>3. User Responsibilities</h2>
          <p>
            Users are solely responsible for their use of the App and must
            comply with all applicable laws and regulations. Users must not
            engage in any activity that interferes with or disrupts the
            functionality of the App.
          </p>
        </section>

        <section>
          <h2>4. No Affiliation with DoorDash</h2>
          <p>
            Dasher Recap is an independent application and is not affiliated
            with DoorDash or DoorDash Dasher. Any references to DoorDash are for
            informational purposes only.
          </p>
        </section>

        <section>
          <h2>5. Changes to Terms</h2>
          <p>
            These Terms and Conditions may be updated from time to time. It is
            your responsibility to review this document periodically for
            changes. Continued use of the App after any modifications
            constitutes acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2>6. Disclaimer of Warranty</h2>
          <p>
            The App is provided "as is" without any warranty of any kind. Dasher
            Recap makes no warranties, express or implied, regarding the
            accuracy, completeness, or reliability of the App.
          </p>
        </section>

        <section>
          <h2>7. Limitation of Liability</h2>
          <p>
            In no event shall Dasher Recap be liable for any indirect,
            incidental, special, consequential, or punitive damages, or any loss
            of profits or revenues, whether incurred directly or indirectly.
          </p>
        </section>

        <section>
          <h2>8. Governing Law</h2>
          <p>
            These Terms and Conditions are governed by and construed in
            accordance with the laws of the United States. Any disputes arising
            out of or in connection with these terms shall be subject to the
            exclusive jurisdiction of the federal and state courts located
            within the United States.
          </p>
        </section>

        <section>
          <h2>Contact Information:</h2>
          <p>
            For any questions or concerns regarding these Terms and Conditions,
            please contact us at{' '}
            <a href='mailto:jesselindcs@gmail.com'>jesselindcs@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  )
}

export default TermsOfService
