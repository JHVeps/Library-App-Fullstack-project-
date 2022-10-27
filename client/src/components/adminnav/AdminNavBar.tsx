import { useNavigate } from "react-router-dom";

import "./AdminNavBar.css";

const AdminNavBar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toUsersManagement = () => {
    navigate("/home/allusers");
  };

  const toAllBooks = () => {
    navigate("/home/allbooks");
  };
  return (
    <>
      <button className="adminNav__button" onClick={logout}>
        LOGOUT
      </button>
      <button className="adminNav__button" onClick={toAllBooks}>
        BOOKS MANAGEMENT
      </button>

      <button className="adminNav__button" onClick={toUsersManagement}>
        USERS MANAGEMENT
      </button>
    </>
  );
};

export default AdminNavBar;
