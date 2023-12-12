import React from 'react';
import { UserContext } from "../Usercontext";
import "./Profile.css";

const Profile = ({ user, signout }) => {
  const hasPaid = user?.hasPaidForFAAPart107;
  console.log(user.attributes)

  return (
    <div className="profile-container">
      {user && (
        <>
          <div className="section">
            <h1>My Information</h1>
           
            <ul>
              <li>
                <span className="info-label">Name:  </span>
                {user.attributes.name} 
              </li>
              <li>
                <span className="info-label">Username:  </span> {user.attributes.preferred_username}
              </li>
              <li>
                <span className="info-label">Email:  </span> {user.attributes.email}
              </li>
            </ul>
          </div>

          <div className="section">
            <h1>My Courses</h1>
            <div className="course">
              <img 
                src="https://dronedriver.com/wp-content/uploads/2023/11/part-107-card.png"
                alt="FAA Part 107 Training Course"
                className={`course-image ${!hasPaid ? 'locked-image' : ''}`}
              />
              {!hasPaid && (
                <div className="locked-course">
                  <span className="lock-icon">🔒</span>
                  <button className="purchase-button">Purchase Course</button>
                </div>
              )}
            </div>
          </div>

          {/* ... other sections ... */}
        </>
      )}
    </div>
  );
}

export default Profile;