import React from "react";

import "../Login/loginstyles.css";
import Image1 from "../../../assets/layer-1@2x.png";
import Image2 from "../../../assets/vector-1.svg";
import Image3 from "../../../assets/vector-2.svg";
import Form from "./form";

const Login = ({ onLogin }) => {
  return (
    <div className="main-container">
      <div className="container-fluid">
        <div className="row ">
          <div className="row innerCard">
            <div className="col col-lg-8 imageContainer">
              <div className="layer1Parent">
                <div className="vectorParent p-2">
                  <img className="groupItem" alt="" src={Image2} />
                  <div className="groupInner" />
                </div>
                <div className="rectangleParent p-2">
                  <div className="groupChild1" />
                  <img className="groupChild2" alt="" src={Image3} />
                </div>
                <img className="layer1Icon p-2" alt="" src={Image1} />
              </div>
              <div className="imageByMacrovector">
                Image by macrovector on Freepik
              </div>
            </div>
            <div className="col col-lg-4 m-auto  ">
              <Form onLogin={onLogin} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
