import React, { useContext } from "react";
import { UserContext } from "../Usercontext";
import "./Profile.css";

const Profile = ( {user, signout} ) => {
  // const { state } = useContext(UserContext);
  // const { user } = state;

  return (
    <div className="profile-container">
      {user && (
        <>
         
      <div className="section">
        <h1>My Information</h1>
        <p>Welcome back, {user.attributes.name}!</p>
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

    </div>
  );
}

export default Profile;