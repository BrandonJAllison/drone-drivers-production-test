import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [completedTests, setCompletedTests] = useState([]);

  useEffect(() => {
    // Fetch completed tests data here and set it to the state
    // Example: fetch('https://api.example.com/completed-tests')
    //           .then(response => response.json())
    //           .then(data => setCompletedTests(data));
  }, []);

  return (
    <div className="dashboard-container">
      <div className="section">
        <h1>Completed Tests</h1>
        <ul>
          {completedTests.map(test => (
            <li key={test.id}>
              Test: {test.name} | Date Taken: {test.dateTaken} | Score: {test.score}
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h1>Membership</h1>
        <ul>
          {/* Display membership details here */}
        </ul>
      </div>

      <div className="section">
        <h1>Invoices</h1>
        <ul>
          {/* Display invoices here */}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
