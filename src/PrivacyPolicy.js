import './PrivacyPolicy.css'


const PrivacyPolicy = () => {
  return (
    <div className='privacyPolicyContainer'>
      <h1>Privacy Policy</h1>
      <p>
        Drone Drivers ("we", "us", "our") operates the dronedrivers.com website
        (the "Service").
      </p>
      <p>
        This page informs you of our policies regarding the collection, use,
        and disclosure of personal data when you use our Service and the
        choices you have associated with that data. We use your data to
        provide and improve the Service. By using the Service, you agree to
        the collection and use of information in accordance with this policy.
      </p>

      <h2>Information Collection and Use</h2>
      <p>
        While using our Service, we may ask you to provide us with certain
        personally identifiable information that can be used to contact or
        identify you ("Personal Data"). Personally identifiable information
        may include, but is not limited to:
      </p>
      <ul>
        <li>Email address</li>
        <li>First name and last name</li>
        <li>Phone number</li>
        <li>Address, State, Province, ZIP/Postal code, City</li>
        <li>Cookies and Usage Data</li>
      </ul>

      <h2>Use of Data</h2>
      <p>Drone Drivers uses the collected data for various purposes:</p>
      <ul>
        <li>To provide and maintain our Service</li>
        <li>To notify you about changes to our Service</li>
        <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
        <li>To provide customer support</li>
        <li>To gather analysis or valuable information so that we can improve our Service</li>
        <li>To monitor the usage of our Service</li>
        <li>To detect, prevent and address technical issues</li>
      </ul>

      {/* Add more sections as needed, such as Disclosure of Data, Security of Data, etc. */}
    </div>
  );
};

export default PrivacyPolicy;
