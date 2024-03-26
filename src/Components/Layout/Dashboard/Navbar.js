import React from "react";
import "../Dashboard/dashboardStyles.css";
import BotLogo from "../../../assets/Layer_1.png";
import UserImage from "../../../assets/user-octagon.png";
import BotImage from "../../../assets/PRINT.png";
import KnowledgeImage from "../../../assets/setting.png";
import Chart from "../../../assets/chart.png";
import ReinforcementImg from "../../../assets/Reinforcement.png";
import ReportImg from "../../../assets/note.png";
import { Link, NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
// import DashboardImage from "../../../assets/Dashboard.png";
import DashboardImage from "../../../assets/dashboard.svg";
import GenAIBotLogo from "../../../assets/Union.png";

const Navbar = () => {
  return (
    <div>
      {" "}
      <div className="sidebar">
        <div className="dashboard-genaibot">
          <img src={GenAIBotLogo} alt="GenAi-bot-logo" />
        </div>

        <Nav className="flex-column sidebar">
          <ul>
            <li className="sidebar-items mt-4">
              <NavLink to="/dashboard" activeClassName="active">
                <img
                  src={DashboardImage}
                  alt="dashboardsvg"
                  style={{
                    width: "32px",
                    height: "32px",
                  }}
                />
                <p>Dashboard</p>
              </NavLink>
            </li>

            <li className="sidebar-items">
              <NavLink to="/usermanagement" activeClassName="active">
                <img
                  src={UserImage}
                  alt=""
                  style={{ width: "32px", height: "32px" }}
                />
                <p>User Management</p>
              </NavLink>
            </li>
            <li className="sidebar-items">
              <NavLink to="/botconfiguration" activeClassName="active">
                <img
                  src={BotImage}
                  alt=""
                  style={{ width: "32px", height: "32px" }}
                />
                <p>Bot Configuration</p>
              </NavLink>
            </li>
            <li className="sidebar-items" style={{ width: "230px" }}>
              <NavLink to="/knowledgeagentconfiguration">
                <img
                  src={KnowledgeImage}
                  alt=""
                  style={{ width: "32px", height: "32px" }}
                />
                <p>Knowledge agent Configuration</p>
              </NavLink>
            </li>
            <li className="sidebar-items">
              <NavLink to="/analyticsconfiguration">
                <img
                  src={Chart}
                  alt=""
                  style={{ width: "32px", height: "32px" }}
                />
                <p>Analytics Configuration</p>
              </NavLink>
            </li>
            <li className="sidebar-items">
              <NavLink to="/reinforcementlearning">
                <img
                  src={ReinforcementImg}
                  alt=""
                  style={{ width: "32px", height: "32px" }}
                />
                <p>Reinforcement Learning</p>
              </NavLink>
            </li>
            <li className="sidebar-items">
              <NavLink to="/reports">
                <img
                  src={ReportImg}
                  alt=""
                  style={{ width: "32px", height: "32px" }}
                />
                <p>Reports</p>
              </NavLink>
            </li>
          </ul>
        </Nav>
      </div>
    </div>
  );
};

export default Navbar;
