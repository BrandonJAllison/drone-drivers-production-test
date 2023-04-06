import { useContext } from "react";
import { UserContext } from "../Usercontext";

const Dashboard = () => {
  const { state } = useContext(UserContext);
  const { user } = state;

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        {user && user ? (
          <h1>Welcome to the Dashboard, {user.firstName}!</h1>
        ) : (
          <h1>Please log in to access the Dashboard</h1>
        )}
      </div>
    </div>
  );
};

export default Dashboard;