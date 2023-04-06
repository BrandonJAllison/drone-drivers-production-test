import { useReducer, createContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// initial state
const intialState = {
  user: null,
  userHasPaid: false,
};

// create context
export const UserContext = createContext(null);

// root reducer
const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

// context provider
const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, intialState);

  // navigate
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(window.localStorage.getItem("user")),
    });
  }, []);

  axios.interceptors.response.use(
    function (response) {
      // any status code that lie within the range of 2XX cause this function
      // to trigger
      return response;
    },
    function (error) {
      // any status codes that falls outside the range of 2xx cause this function
      // to trigger
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get("localhost:3001/api/logout")
            .then((data) => {
              console.log("/401 error > logout");
              dispatch({ type: "LOGOUT" });
              window.localStorage.removeItem("user");
              navigate("/login");
            })
            .catch((err) => {
              console.log("AXIOS INTERCEPTORS ERR", err);
              reject(error);
            });
        });
      }
      return Promise.reject(error);
    }
  );

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
