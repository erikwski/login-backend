import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../reducers/user";
import { CustomInput } from "../components/customInput/CustomInput";
import { Navigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validLogin, setValidLogin] = useState(false);
  const [confirmLogin, setConfirmLogin] = useState(false);
  useEffect(
    () => setValidLogin(username.length && password.length),
    [username, password]
  );
  let checkLogin = async (e) => {
    e.preventDefault();
    try {
      let login_res = (
        await axios.get(
          `${process.env.REACT_APP_API_KEY}login?user=${username}&pwd=${password}`
        )
      ).data;
      if (login_res.status) {
        dispatch(updateUser({ logged: true, ...login_res.user }));
        setConfirmLogin(true);
      } else {
        setPassword("");
        throw login_res.msg;
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  let onSetUsername = (e) => setUsername(e.target.value);
  let onSetPassword = (e) => setPassword(e.target.value);
  return confirmLogin ? (
    <Navigate push to="/profile" />
  ) : (
    <form>
      <CustomInput
        label="Username"
        type="text"
        value={username}
        keyup={onSetUsername}
      />
      <CustomInput
        label="Password"
        type="password"
        value={password}
        keyup={onSetPassword}
      />
      <button onClick={checkLogin} disabled={!validLogin}>
        LOGIN
      </button>
      {!validLogin && (
        <label className="error_on_form">
          Compila username e password per procedere al login
        </label>
      )}
    </form>
  );
}

export default Login;
