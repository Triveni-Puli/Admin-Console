import React from "react";
/* import BotLogo from "../assets/Layer_1.png";
import UserImage from "../assets/user-octagon.png";
import BotImage from "../assets/PRINT.png";
import KnowledgeImage from "../assets/setting.png";
import Chart from "../assets/chart.png";
import ReinforcementImg from "../assets/Reinforcement.png";
import ReportImg from "../assets/note.png"; */
import United from "../../../assets/United.svg";
import Notification from "../../../assets/Notifications.png";
import profileIcon from "../../../assets/Mask group.png";
/* import { BrowserRouter, Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import DashboardImage from "../assets/Dashboard.png";
import UserMgmt from "../Pages/UserMgmt"; */

const Header = () => {
  return (
    <div className="form-section">
      <p>DashBoard</p>
      <input
        className="input-search"
        type="search"
        placeholder="search here..."
      />

      <div>
        <img src={United} alt="flag" />
        <select>
          <option>ENG(US)</option>
          <option>IND(IND)</option>
        </select>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <img src={Notification} alt="Notification" />
        <img src={profileIcon} alt="GenAIBot-logo" width={30} />
        <select style={{ border: "none" }}>
          <option>Jathin</option>
          <option>Triveni</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
