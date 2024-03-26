import React from "react";
import "../Dashboard/dashboardStyles.css";
import United from "../../../assets/United.svg";
import Notification from "../../../assets/Notifications.png";
import profileIcon from "../../../assets/Mask group.png";
import SearchBar from "../../../assets/Search Bar.png";
import selectlanguage from "../../../assets/languange.png";
import notificationMenu from "../../../assets/menu.png";
import magnifier from "../../../assets/magnifier.svg";

const Header = () => {
  return (
    <div className="form-section">
      <p
        style={{
          fontSize: "26px",
          fontWeight: 600,
          color: "#373737",
          marginTop: "20px",
        }}>
        Dashboard
      </p>

      <div className="search-container">
        <input
          className="input-search"
          type="search"
          placeholder="Search here..."
        />
      </div>

      <div className="d-flex select-lang">
        <img src={United} alt="flag" />
        <select style={{ height: "21px" }}>
          <option>ENG &nbsp;(US) &nbsp;</option>
          <option>IND &nbsp;(IND) &nbsp;</option>
        </select>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "298px",
        }}>
        <div>
          <img
            style={{ width: "48px", height: "48px", marginRight: "20px" }}
            src={Notification}
            alt="Notification"
          />
        </div>
        <div>
          <img
            style={{ width: "55px", height: "55px", marginRight: "20px" }}
            src={profileIcon}
            alt="GenAIBot-logo"
            width={30}
          />
        </div>
        <select style={{ border: "none", height: "48px" }}>
          <option>Jatin</option>
          <option>Triveni</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
