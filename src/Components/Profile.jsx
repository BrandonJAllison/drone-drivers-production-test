import React, { useContext } from "react";
import { UserContext } from "../Usercontext";
import "./Profile.css";

function Profile() {
  const { state } = useContext(UserContext);
  const { user } = state;

  return (
    <div className="profile-container">
      {user && (
        <>
         
      <div className="section">
        <h1>My Information</h1>
        <ul>
              <li>
                <span className="info-label">Name:</span>{" "}
                {user.firstName} {user.lastName}
              </li>
              <li>
                <span className="info-label">Username:</span> {user.username}
              </li>
              <li>
                <span className="info-label">Email:</span> {user.email}
              </li>
            </ul>
      </div>

      <div className="section">
        <h1>Courses Completed</h1>
        <ul>
          <li>You Currently Have No Completed Courses</li>
        </ul>
      </div>

      <div className="section">
        <h1>Tests Completed</h1>
        <ul>
          <li>You Currently Have No Tests Courses</li>
        </ul>
      </div>

      <div className="section">
        <h1>Remote Pilot Certification Information</h1>
        <ul>
          <li>You Have No Current Remote Pilot Certification Information to Display</li>
        </ul>
      </div>

        </>
      )}

      {user && (
        <div className="section">
          <h1>Please log in to access your user profile</h1>
        </div>
      )}
    </div>
  );
}

export default Profile;