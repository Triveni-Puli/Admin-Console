import React from "react";
import { Link } from "react-router-dom/dist";
import "../ViewIntent/ViewBotIntentStyles.css";

const ViewBotIntent = (props) => {
  console.log(props);
  return (
    <div>
      <div className="d-flex">
        <Link
          to="/botconfiguration"
          style={{
            textDecoration: "none",
            color: "#0049B2",
            fontSize: "16px",
            fontWeight: 400,
          }}>
          <p>Bot Intents</p>
        </Link>
        <p className="pt-0" style={{ fontSize: "16px", fontWeight: "400" }}>
          &nbsp; {">"}&nbsp;View
        </p>
      </div>
      <div style={{ fontSize: "20px", fontWeight: "500" }}>View Intent</div>
      <hr style={{ margin: "10px 0px" }} />
      <div className="main-content">
        <div>{props.data.intent}</div>
      </div>
    </div>
  );
};

export default ViewBotIntent;
