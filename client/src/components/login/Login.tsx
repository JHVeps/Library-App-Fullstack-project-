import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const [signIn, setSingIn] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  console.log("Token:", token);

  const getToken = async (response: CredentialResponse) => {
    console.log("Response", response);
    if (response.credential) {
      const res = await axios.post(
        "http://localhost:4000/api/v1/login",
        {},
        { headers: { id_token: response.credential } }
      );
      const token = res.data.token;
      localStorage.setItem("token", token);
      setToken(token);
      navigate("/home");
    }
  };

  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <div className="loginScreen__gradient" />
      </div>
      <div className="loginScreen__body">
        {!signIn ? (
          <>
            <h1>Unlimited books, Comics and more.</h1>
            <h2>Access anywhere. Start reading now.</h2>
            <h3>Ready to read? Sign in with your Google credentials.</h3>
            <button
              onClick={() => setSingIn(true)}
              className="loginScreen__signIn"
            >
              SIGN IN
            </button>
          </>
        ) : (
          <div className="googleLogin">
            <GoogleLogin
              theme="filled_black"
              size="large"
              logo_alignment="left"
              width="300"
              onSuccess={getToken}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
