import jwtDecode from "jwt-decode";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "../helpers/axios";
import protectApi, { getMe } from "../services/protectApi";

const initialAuthState = {
  isAuthenticated: !!localStorage.getItem("token") || false,
  isInitialised: false,
  user: null,
};

export const isValidToken = (token) => {
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

const setSession = (token, refreshtoken) => {
  if (token) {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshtoken);
    Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  }
};
const reducer = (state, action) => {
  switch (action.type) {
    case "INITIALISE": {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case "LOGIN": {
      return {
        ...state,
        isAuthenticated: true,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case "REGISTER": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialAuthState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);
  const dispatchRedux = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const login = async (email, password) => {
    const response = await Axios.post("admin/auth/login", {
      email,
      password,
    });
    // if (response.response && response.response?.status !== 200)
    //   return showPopup("invalid creadentialls");
    // showPopup("you logged in successfully", "SUCCESS");
    if (!response.data) return null;
    let { accessToken, refreshToken } = response.data;
    setSession(accessToken, refreshToken);
    dispatch({
      type: "LOGIN",
      payload: {
        token: accessToken,
      },
    });
    return response;
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  useEffect(() => {
    const initialise = async () => {
      try {
        let token = window.localStorage.getItem("token");
        let refreshToken = window.localStorage.getItem("refreshToken");
        if (token && isValidToken(refreshToken)) {
          if (!state.user) {
            // const { data } = await getMe("admin/me");
            dispatch({
              type: "INITIALISE",
              payload: {
                isAuthenticated: true,
                // user: data.payload.admin,
                user: {},
              },
            });
          }
        } else if (!isValidToken(refreshToken)) {
          dispatch({
            type: "INITIALISE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: "INITIALISE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialise();
  }, [location.pathname]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export const useAuth = () => useContext(AuthContext);
