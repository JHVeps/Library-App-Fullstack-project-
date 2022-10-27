import { useNavigate } from "react-router-dom";

import "./UserNavBar.css";

const UserNavBar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toAllBooks = () => {
    navigate("/home/allbooks");
  };

  return (
    <>
      <button className="userNav__button" onClick={logout}>
        LOGOUT
      </button>
      <button className="userNav__button" onClick={toAllBooks}>
        ALL BOOKS
      </button>
    </>
  );
};

export default UserNavBar;
