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
            <h1>Drone Drivers User Profile</h1>
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
              <li>
                <span className="info-label">Address:</span> {user.address}
              </li>
              <li>
              <span className="info-label">Bio:</span> {user.bio}
              </li>
            </ul>
          </div>

        </>
      )}

      {!user && (
        <div className="section">
          <h1>Please log in to access your user profile</h1>
        </div>
      )}
    </div>
  );
}

export default Profile;