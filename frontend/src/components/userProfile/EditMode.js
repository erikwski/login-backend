import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CustomInput } from "../customInput/CustomInput";
import { CustomSelect } from "../customInput/CustomSelect";
import { LANGUAGES } from "../../data/languages";
import { USER_TYPE } from "../../data/userType";
import { updateUser } from "../../reducers/user";
import axios from "axios";
let EditMode = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user.value;
  });
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [type, setType] = useState(user.type);
  const [language, setLanguage] = useState(user.language);
  let changeViewMode = () => props.change_mod(false);
  let onSetUsername = (e) => setUsername(e.target.value);
  let onSetEmail = (e) => setEmail(e.target.value);
  let onSetPassword = (e) => setPassword(e.target.value);
  let onSetType = (e) => setType(e.target.value);
  let onSetLanguage = (e) => setLanguage(e.target.value);
  let saveEdit = async () => {
    try {
      let user_data = {
        id: user.id,
        username: username,
        email: email,
        password: password,
        type: type,
        language: language,
      };
      let update_user = await axios.post(
        `${process.env.REACT_APP_API_KEY}update`,
        user_data
      );
      if (update_user.status >= 200 && update_user.status < 300) {
        dispatch(updateUser({ logged: true, ...user_data }));
        changeViewMode();
      } else {
        throw new Error("Update fallito, contattare assistenza");
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };
  return (
    <div>
      <h1> Edit user</h1>
      <CustomInput
        label="Username"
        type="text"
        value={username}
        keyup={onSetUsername}
      />
      <CustomInput label="Mail" type="mail" value={email} keyup={onSetEmail} />
      <CustomInput
        label="Password"
        type="password"
        value={password}
        keyup={onSetPassword}
      />
      <CustomSelect
        label="Type of user"
        value={type}
        change={onSetType}
        data={USER_TYPE}
      />
      <CustomSelect
        label="Language"
        value={language}
        change={onSetLanguage}
        data={LANGUAGES}
      />
      <div className="wrap_button">
        <button onClick={saveEdit} style={{ backgroundColor: "#0fdd0f" }}>
          SAVE EDIT
        </button>
        <button onClick={changeViewMode}>CANCEL</button>
      </div>
    </div>
  );
};

export default EditMode;
