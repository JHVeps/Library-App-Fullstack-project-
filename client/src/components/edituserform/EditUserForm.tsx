import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { RootState } from "redux/store";
import { findUser, updateUser } from "services/user-services";

import "./EditUserForm.css";

const EditUserForm = () => {
  const { _id } = useParams<{ _id: string }>();
  const user = useAppSelector((state: RootState) => state.users.item);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const goBackToAllUsers = () => {
    navigate("/home/allusers");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = { _id: user._id!, updatedUser: state };
    console.log("state: ", state);
    dispatch(updateUser(data));
    navigate("/home/allusers");
  };

  const [state, setState] = useState(user);

  const handleFnameChange = (e: any) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleLnameChange = (e: any) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleEmailChange = (e: any) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(findUser(_id as string));
  }, [dispatch, _id]);
  if (!user)
    return (
      <div className="edituser">
        <h1>User not found!</h1>
        <button className="edituser__button" onClick={goBackToAllUsers}>
          BACK
        </button>
      </div>
    );
  return (
    <form onSubmit={handleSubmit}>
      <h1>
        EDIT: {user.firstName} {user.lastName}
      </h1>
      <label>
        <h4>User ID</h4>
      </label>
      <input
        type="text"
        name="_id"
        value={state._id}
        placeholder="USER ID"
        readOnly
      />
      <label>Firstname</label>
      <input
        type="text"
        name="firstName"
        value={state.firstName}
        onChange={handleFnameChange}
        placeholder="FIRSTNAME"
      />
      <label>Lastname</label>
      <input
        type="text"
        name="lastName"
        value={state.lastName}
        onChange={handleLnameChange}
        placeholder="LASTNAME"
      />
      <label>Email</label>
      <input
        type="text"
        name="email"
        value={state.email}
        onChange={handleEmailChange}
        placeholder="EMAIL"
      />

      <button type="submit">UPDATE</button>
      <button onClick={goBackToAllUsers}>BACK</button>
    </form>
  );
};

export default EditUserForm;
