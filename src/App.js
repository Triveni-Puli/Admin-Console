import Login from "./Components/Layout/Login/login";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserMgmtData from "./Components/UserManagement/UserMgmtData";
import BotConfigData from "./Components/BotConfiguration/BotConfigData";
import AddNewIntent from "./Components/BotConfiguration/AddNewIntent/AddNewIntent";
import DashboardData from "./Components/Dashboard/DashboardData";
import KaConfiguration from "./Components/KaConfiguration/KaConfiguration";
import AnalyticsConfig from "./Components/AnalyticsConfig/AnalyticsConfig";
import Reinforcement from "./Components/Reinforcement/Reinforcement";
import Reports from "./Components/Reports/Reports";
import Navbar from "./Components/Layout/Dashboard/Navbar";
import Header from "./Components/Layout/Dashboard/Header";
/* import "../src/Components/Layout/Dashboard/dashboardStyles.css"; */

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />}></Route>
        </Routes>
        {isLoggedIn && (
          <div className="row main">
            <div className="col col-lg-3 sidebar-col">
              <Navbar />
            </div>
            <div className="col col-lg-9">
              <div class="container h-100 d-flex flex-column">
                <div class="row header-row ">
                  <Header />
                </div>
                <div className="row flex-grow-1">
                  <Routes>
                    <Route
                      path="/dashboard"
                      element={<DashboardData />}></Route>
                    <Route
                      path="/usermanagement"
                      element={<UserMgmtData />}></Route>
                    <Route
                      path="/botconfiguration"
                      element={<BotConfigData />}></Route>
                    <Route
                      path="/knowledgeagentconfiguration"
                      element={<KaConfiguration />}></Route>
                    <Route
                      path="/analyticsconfiguration"
                      element={<AnalyticsConfig />}></Route>
                    <Route
                      path="/reinforcementlearning"
                      element={<Reinforcement />}></Route>
                    <Route path="/reports" element={<Reports />}></Route>
                    <Route
                      path="/addNewintent"
                      element={<AddNewIntent />}></Route>
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
