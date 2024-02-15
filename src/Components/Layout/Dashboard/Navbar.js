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

const Navbar = () => {
  return (
    <div>
      {" "}
      <div className="sidebar">
        <div className="dashboard-genaibot">
          <img
            src={BotLogo}
            alt="Bot-Logo"
            style={{
              width: "45.87px",
              height: "44.73px",
              marginRight: "5px",
              marginBottom: "12px",
            }}
          />
          <span className="genai">GenAI</span>
          <span className="bot">Bot</span>
        </div>

        <Nav className="flex-column sidebar">
          <ul>
            <li className="sidebar-items mt-4">
              <NavLink to="/dashboard" activeClassName="active">
                <img
                  src={DashboardImage}
                  alt="dashboardsvg"
                  style={{
                    width: "20px",
                    height: "20px",
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
                  style={{ width: "20px", height: "20px" }}
                />
                <p>User Management</p>
              </NavLink>
            </li>
            <li className="sidebar-items">
              <NavLink to="/botconfiguration" activeClassName="active">
                <img
                  src={BotImage}
                  alt=""
                  style={{ width: "20px", height: "20px" }}
                />
                <p>Bot Configuration</p>
              </NavLink>
            </li>
            <li className="sidebar-items">
              <NavLink to="/knowledgeagentconfiguration">
                <img
                  src={KnowledgeImage}
                  alt=""
                  style={{ width: "20px", height: "20px" }}
                />
                <p>Knowledge Agent Configuration</p>
              </NavLink>
            </li>
            <li className="sidebar-items">
              <NavLink to="/analyticsconfiguration">
                <img
                  src={Chart}
                  alt=""
                  style={{ width: "20px", height: "20px" }}
                />
                <p>Analytics Configuration</p>
              </NavLink>
            </li>
            <li className="sidebar-items">
              <NavLink to="/reinforcementlearning">
                <img
                  src={ReinforcementImg}
                  alt=""
                  style={{ width: "20px", height: "20px" }}
                />
                <p>Reinforcement Learning</p>
              </NavLink>
            </li>
            <li className="sidebar-items">
              <NavLink to="/reports">
                <img
                  src={ReportImg}
                  alt=""
                  style={{ width: "20px", height: "20px" }}
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
