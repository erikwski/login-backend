import React from "react";
import { useSelector } from "react-redux";

let ShowUserDetails = (props) => {
  const user = useSelector((state) => {
    return state.user.value;
  });
  let changeViewMode = () => props.change_mod(true);

  return (
    <div>
      <h1> Profile Page</h1>
      <p> id: {user.id}</p>
      <p> username: {user.username}</p>
      <p> email: {user.email} </p>
      <p> password: {user.password} </p>
      <p> type: {user.type}</p>
      <p> language: {user.language}</p>

      <button onClick={changeViewMode}>EDIT MODE</button>
    </div>
  );
};

export default ShowUserDetails;
