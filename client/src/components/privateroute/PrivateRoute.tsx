import { useNavigate } from "react-router-dom";
import { DecodedUser } from "types";
import jwt_decode from "jwt-decode";

import "./PrivateRoute.css";

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";
  const authUser = jwt_decode(token) as DecodedUser;

  if (!authUser.isAdmin) {
    //Returned to home
    return (
      <div className="privateRoute">
        <h2>You are not allowed</h2>
        <button onClick={() => navigate("/home")}>BACK</button>
      </div>
    );
  }
  //authorized so return child components

  return children;
};

export default PrivateRoute;
