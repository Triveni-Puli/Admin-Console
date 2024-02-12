import React from "react";
import "../Dashboard/dashboardStyles.css";
import United from "../../../assets/United.svg";
import Notification from "../../../assets/Notifications.png";
import profileIcon from "../../../assets/Mask group.png";

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
