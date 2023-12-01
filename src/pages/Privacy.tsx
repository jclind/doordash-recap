import React from 'react'

const Privacy = () => {
  return (
    <div className='privacy-page legal-page'>
      <div className='content'>
        <section>
          <h1>Privacy Policy</h1>
          <p>Last updated: December 1, 2023</p>

          <p>
            Thank you for choosing DoorDash Recap! This Privacy Policy outlines
            how we collect, use, and safeguard the information you entrust to
            us.
          </p>
        </section>
        <section>
          <h2>1. Collection of DoorDash Dasher Data</h2>

          <p>
            We may optionally collect data from the DoorDash Dasher app,
            encompassing various details such as delivery times, order status,
            and store information.
          </p>

          <pre>
            {`
        {
          ACTUAL_DELIVERY_TIME: string
          ACTUAL_PICKUP_TIME: string
          ORDER_CREATED_TIME: string
          ORDER_STATUS: string
          STORE_NAME: string
          SUBTOTAL_IN_CENTS: number
          TOTAL_ITEM_COUNT: number
        }[]
        `}
          </pre>
        </section>
        <section>
          <h2>2. Collection Method</h2>

          <p>
            Data collection occurs when users choose to share a link to their
            'recap card.' This information is securely stored in our Firebase
            Firestore database through a Firestore function call.
          </p>
        </section>
        <section>
          <h2>3. Purpose of Collection</h2>

          <p>
            The primary purpose of collecting this information is to facilitate
            users in sharing their data via a unique link in the future.
          </p>
        </section>
        <section>
          <h2>4. Use of Information</h2>

          <p>
            The data collected is utilized to generate and display the 'recap
            card' and may also contribute to store name analysis for continuous
            data enhancement.
          </p>
        </section>
        <section>
          <h2>5. Third-Party Sharing</h2>

          <p>
            Rest assured, none of the information collected is shared with any
            third parties.
          </p>
        </section>
        <section>
          <h2>6. Data Accessibility</h2>

          <p>
            User-specific data can only be accessed by others if they possess
            the unique link or data ID. While freely accessible, it cannot be
            modified once set.
          </p>
        </section>
        <section>
          <h2>7. Data Retention</h2>

          <p>User 'recap' data is retained indefinitely.</p>
        </section>
        <section>
          <h2>8. Cookies and Local Storage</h2>

          <p>
            We utilize Firebase, which may use cookies. Additionally, user
            'recap' data is stored in local storage for a seamless experience.
          </p>
        </section>
        <section>
          <h2>9. Notice of Data Storage</h2>

          <p>
            Users are visually informed, with a footnote, that their data will
            be securely saved to the Firestore database.
          </p>
        </section>
        <section>
          <h2>10. Data Modification</h2>

          <p>
            While data cannot be altered or deleted, it can be accessed through
            a unique link or ID.
          </p>
        </section>
        <section>
          <h2>11. User Age</h2>

          <p>
            The age of users is unknown, and no personal information is
            intentionally collected.
          </p>
        </section>
        <section>
          <h2>12. Data Security</h2>

          <p>
            User data is safeguarded by Google Firebase and reinforced by
            security rules implemented in the Firestore database.
          </p>
        </section>
        <section>
          <h2>13. Third-Party Services</h2>

          <p>DoorDash Recap does not utilize any third-party services.</p>
        </section>
        <section>
          <h2>14. International Data Transfer</h2>

          <p>No international data transfers take place.</p>
        </section>
        <section>
          <h2>15. Contact Information</h2>

          <p>
            For any inquiries or concerns regarding this Privacy Policy, please
            reach out to us at{' '}
            <a href='mailto:jesselindcs@gmail.com'>jesselindcs@gmail.com</a>.
          </p>
        </section>
        <section>
          <h2>Additional Notes</h2>

          <p>
            Google Analytics is employed to collect page data and track the
            current number of users on the page.
          </p>
        </section>
      </div>
    </div>
  )
}

export default Privacy
