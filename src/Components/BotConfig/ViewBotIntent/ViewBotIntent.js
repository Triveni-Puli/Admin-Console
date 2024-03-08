import React from "react";
import { Link } from "react-router-dom";
import "../ViewBotIntent/ViewBotIntentStyles.css";
import { showViewIntentPageUI } from "../BotConfigActions";
import { useDispatch, useSelector } from "react-redux";
import circleImg from "../../../assets/circle.svg";

const ViewBotIntent = (props) => {
  const dispatch = useDispatch();
  const intentDetails = useSelector((state) => state.BotConfig.intentDetails);
  console.log(intentDetails);

  function handleBotIntentLink() {
    dispatch(showViewIntentPageUI(false));
  }

  console.log(props);
  return (
    <div style={{ padding: "10px" }}>
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
      <div style={{ padding: "20px" }}>
        <div style={{ fontSize: "20px", fontWeight: "500" }}>View Intent</div>
        <hr style={{ margin: "10px 0px" }} />
        <div className="main-content">
          <div className="bot-intent-name">{intentDetails.intent}</div>
          <div className="bot-intent-desc">{intentDetails.description}</div>
          <div className="bot-intent-entity-container">
            <p className="intent-entity-label">Intent Entities</p>
            <div className="d-flex bot-intent-entity">
              <ul>
                {intentDetails &&
                  intentDetails.entities.map((intentEntity, i) => (
                    <li key={i}>
                      <div className="bot-intent-entity-list">
                        <div className="intent-input-group">
                          <p id="intent-name">{intentEntity.name}</p>
                        </div>
                        <div className=" intent-input-group">
                          <p id="intent-dropdown">{intentEntity.type}</p>
                        </div>
                        <div className=" intent-input-group">
                          <p id="intent-description">
                            {intentEntity.description}
                          </p>
                        </div>
                        <div className=" intent-input-group">
                          <p id="intent-example">{intentEntity.example}</p>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="bot-intent-example-container">
            <div style={{ padding: "0.8rem 2rem" }}>
              <div className="example-label">Examples</div>
              <ul className="intent-list">
                {intentDetails &&
                  intentDetails.examples.map((item, i) => {
                    return (
                      <div className="d-flex intent-ex-list">
                        <li key={i}>
                          <img
                            src={circleImg}
                            alt="circle-img"
                            style={{ marginBottom: "5px" }}
                          />
                          <span style={{ paddingLeft: "15px" }}>{item}</span>
                        </li>
                      </div>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBotIntent;
