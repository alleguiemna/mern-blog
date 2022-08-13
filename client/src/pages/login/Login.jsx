import axios from "axios";
import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../components/context/Context";
import "./Login.css";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, loading } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START"});
    try {
      const res = await axios.post("/users/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      console.log(res.data);
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username ..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password ..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={loading}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
};

export default Login;
