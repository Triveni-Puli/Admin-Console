import React, { useState } from "react";

import { Link } from "react-router-dom";

import "../BotConfiguration/BotConfigStyles.css";

const BotConfigData = () => {
  const [addEntity, setAddEntity] = useState([]);
  let addEntityList = (inputText) => {
    if (inputText !== "") setAddEntity([...addEntity, inputText]);
  };

  return (
    <div>
      <div className="bot-home">
        <div className="d-flex justify-content-between">
          <div className="botintent-label"> Bot Intents</div>
          <div>
            <Link to="/addNewintent" addEntityList={addEntityList}>
              <button className="addnew-btn">Add New Intent&nbsp;+</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotConfigData;
