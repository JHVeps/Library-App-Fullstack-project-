import { useNavigate } from "react-router-dom";
import Users from "../../components/users/Users";

import "./UserOperations.css";

const UserOperations = () => {
  const navigate = useNavigate();
  const toHome = () => {
    navigate("/home");
  };
  const toAddUser = () => {
    navigate("/home/allusers/addusers");
  };
  return (
    <div className="usersOperations">
      <h1>ALL USERS</h1>
      <button className="usersOperations__button" onClick={toHome}>
        HOME
      </button>
      <button className="usersOperations__button" onClick={toAddUser}>
        ADD A NEW USER
      </button>
      <Users />
    </div>
  );
};

export default UserOperations;
