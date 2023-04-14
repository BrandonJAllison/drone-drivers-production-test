import React from 'react';
import { Link } from 'react-router-dom';
import './TestLanding.css';

const TestLanding = () => {
  return (
    <div className="test-landing">
      <h1>Test Instructions</h1>
      <p>
        This test consists of 60 questions covering all of the material in the course. You have 2 hours to complete the test.
      </p>
      <p>
        Upon completing the test, you will be shown the results and will also have the ability to save the PDF of the results for later reference.
      </p>
      <Link to="/practice-test" className="testing-button">
                Continue to Test
      </Link>
    </div>
  );
};

export default TestLanding;