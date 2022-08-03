import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../reducers/user";
import { Navigate } from "react-router-dom";
import EditMode from "../components/userProfile/EditMode";
import ShowUserDetails from "../components/userProfile/ShowUserDetails";
function Profile() {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  return confirmLogout ? (
    <Navigate push to="/" />
  ) : (
    <React.Fragment>
      {editMode ? (
        <EditMode change_mod={setEditMode} />
      ) : (
        <ShowUserDetails change_mod={setEditMode} />
      )}
      <button
        id="logout"
        onClick={() => {
          dispatch(updateUser(null));
          setConfirmLogout(true);
        }}
      >
        LOG OUT
      </button>
    </React.Fragment>
  );
}

export default Profile;
