import React from "react";
import axios from "axios";
import { useRef, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import "../Login/loginstyles.css";
import Image4 from "../../../assets/image 8.png";
import Image5 from "../../../assets/image 9.png";
import GenAIBotLogo from "../../../assets/Union.png";

const Form = ({ onLogin }) => {
  const userRef = useRef();
  const errRef = useRef();
  /*   const navigate = useNavigate();
   */
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [message, setMessage] = useState({});

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    /*     setMessages([...messages, { text: user }]);
     */ e.preventDefault();
    try {
      const response = await axios.post(
        "https://twqjm7v0ia.execute-api.ap-south-1.amazonaws.com/dev",
        {
          User_Id: user,
          User_Password: pwd,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(response.data);

      console.log(response?.data?.body);
      if (response?.data?.statusCode === 200) {
        onLogin();
        setSuccess(true);
      } else {
        alert(response?.data?.body);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      /* errRef.current.focus(); */
    }
  };

  return (
    <>
      {success ? (
        <div>
          <Navigate to="/dashboard" state={message} replace={true} />
        </div>
      ) : (
        <div>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive">
            {errMsg}
          </p>

          <div className="genaibot">
            <img src={GenAIBotLogo} alt="GenAi-bot-logo" />
            {/* <span className="genai">GenAI</span>
            <span className="bot">Bot</span> */}
          </div>
          <div className="userLogin">USER LOGIN</div>

          <form onSubmit={handleSubmit} style={{ margin: "30px 65px" }}>
            <input
              id="login-username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              type="text"
              className="form-control my-4 py-2 inputText1"
            />

            <input
              type="password"
              id="login-password"
              required
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              className="form-control my-4 py-2 inputText2"
            />

            <div className="container" style={{ width: "366px" }}>
              <div className="row">
                <div className="col-auto">
                  <input
                    type="checkbox"
                    className="checkbox"
                    style={{ marginTop: "4px" }}
                  />
                </div>
                <div className="col">
                  <a
                    style={{ color: "#9747FF", fontSize: "14px" }}
                    href="#"
                    className="nav-link">
                    Login with OTP
                  </a>
                </div>
                <div className="col-auto ml-auto">
                  <a
                    style={{ color: "#9747FF", fontSize: "14px" }}
                    href="#"
                    className="nav-link">
                    Forgot Password?
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center mt-3">
              <button className="loginScreenChild2">LOGIN</button>
            </div>
          </form>
          <div className="orLoginWith">
            <span style={{ marginLeft: "20px" }}>
              &nbsp;&nbsp;Or Login with&nbsp;&nbsp;
            </span>
          </div>
          <div className="loginContainer">
            <img className="image8Icon p-3" src={Image4} alt="" />
            <img className="image9Icon p-3" src={Image5} alt="" />
          </div>
          <div className="needAnAccountParent p-2">
            <div className="needAnAccount">Need an Account?</div>
            <a href="#" className="signupContainer">
              Sign Up
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;
