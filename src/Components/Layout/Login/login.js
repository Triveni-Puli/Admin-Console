import React from "react";

import "../Login/loginstyles.css";
import Image1 from "../../../assets/layer-1@2x.png";
import Image2 from "../../../assets/vector-1.svg";
import Image3 from "../../../assets/vector-2.svg";
import LoginBotImage from "../../../assets/LoginBotImage.png";
import Form from "./form";

const Login = ({ onLogin }) => {
  return (
    <div className="main-container">
      <div className="container-fluid">
        <div className="row ">
          <div className="row innerCard">
            <div className="col col-lg-8 imageContainer">
              <div className="layer1Parent">
                <img src={LoginBotImage} alt="Bot Image" />
              </div>
              <div className="imageByMacrovector">
                Image by macrovector on Freepik
              </div>
            </div>
            <div className="col col-lg-4 formContainer  ">
              <Form onLogin={onLogin} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
