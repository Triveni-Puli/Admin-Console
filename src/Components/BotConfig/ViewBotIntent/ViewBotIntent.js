import React from "react";
import { Link } from "react-router-dom";
import "../ViewBotIntent/ViewBotIntentStyles.css";
import { showViewIntentPageUI } from "../BotConfigActions";
import { useDispatch, useSelector } from "react-redux";

const ViewBotIntent = (props) => {
  const dispatch = useDispatch();
  const intentDetails = useSelector((state) => state.BotConfig.intentDetails);
  console.log(intentDetails);

  function handleBotIntentLink() {
    dispatch(showViewIntentPageUI(false));
  }

  console.log(props);
  return (
    <div>
      <div className="d-flex" style={{ fontSize: "16px", fontWeight: "400" }}>
        <Link
          to=""
          style={{
            textDecoration: "none",
            color: "#0049B2",
            fontSize: "16px",
            fontWeight: 400,
          }}
          onClick={handleBotIntentLink}>
          Bot Intents
        </Link>
        <p className="pt-0" style={{ fontSize: "16px", fontWeight: "400" }}>
          &nbsp; {">"}&nbsp;View
        </p>
      </div>
      <div style={{ fontSize: "20px", fontWeight: "500" }}>View Intent</div>
      <hr style={{ margin: "10px 0px" }} />
      <div className="main-content">
        <div>{intentDetails.intent}</div>
        <div>{intentDetails.description}</div>
      </div>
    </div>
  );
};

export default ViewBotIntent;
