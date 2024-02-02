import React, { useState } from "react";
import Navbar from "../Layout/Dashboard/Navbar";
import { Link } from "react-router-dom";
import Header from "../Layout/Dashboard/Header";
import "../BotConfiguration/BotConfigStyles.css";
import AddNewIntent from "./AddNewIntent/AddNewIntent";
/* import BotConfig from "../../Pages/BotConfig"; */

const BotConfigData = () => {
  const [addEntity, setAddEntity] = useState([]);
  let addEntityList = (inputText) => {
    if (inputText !== "") setAddEntity([...addEntity, inputText]);
  };

  const [showComponent, setShowComponent] = useState(false);
  const handleClick = () => {
    setShowComponent(true);
  };
  return (
    <div>
      {/*   <BotConfig /> */}
      <div className="row main">
        <div className="col col-lg-2 sidebar-col">
          <Navbar />
        </div>
        <div className="col col-lg-10">
          <div className="container h-100 d-flex flex-column">
            <div className="row header-row ">
              <Header />
            </div>
            <div className="row flex-grow-1 bg-secondary">
              <div className="bot-home">
                <div className="d-flex justify-content-between">
                  <div className="botintent-label"> Bot Intents</div>
                  <div>
                    <Link to="/addNewintent" addEntityList={addEntityList}>
                      <button className="addnew-btn">
                        Add New Intent&nbsp;+
                      </button>
                    </Link>
                    {/*   {showComponent && <AddNewIntent />} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotConfigData;
