import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Spin } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../src/Usercontext';
import { Link, useNavigate } from "react-router-dom"; 
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // state
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    if (user !== null) navigate("/");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.table({ email, password });
    try {
      setLoading(true);
      const { data } = await axios.post(`https://sea-turtle-app-l7rbe.ondigitalocean.app/api/login`, {
        email,
        password,
      });
      console.log("LOGIN RESPONSE", data);
      // dispatch({
      //   type: "LOGIN",
      //   payload: data,
      // });
      // save in local storage
      window.localStorage.setItem("user", JSON.stringify(data));
      // redirect
      navigate("/");
      // setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-container">
        <h1 className="login-title">LOGIN</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-4 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />

          <input
            type="password"
            className="form-control mb-4 p-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />

          <button
            type="submit"
            className="btn btn-block btn-primary"
            disabled={!email || !password || loading}
          >
            {loading ? <Spin /> : "Login"}
          </button>
        </form>

        <div className="login-links">
          <p className="text-center" style={{color:'black'}}>
            Not yet registered?{" "}
            <Link to="/register">
              Register
            </Link>
          </p>

          <p className="text-center">
            <Link to="/forgot-password">
              Forgot password
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
