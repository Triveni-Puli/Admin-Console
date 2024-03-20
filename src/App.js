import Login from "./Components/Layout/Login/login";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserMgmtData from "./Components/UserManagement/UserMgmtData";
//import BotConfigData from "./Components/BotConfiguration/BotConfigData";
//import AddNewIntent from "./Components/BotConfiguration/AddNewIntent/AddNewIntent";
import { useSelector } from "react-redux";
import DashboardData from "./Components/Dashboard/DashboardData";
import BotConfig from "./Components/BotConfig/BotConfig";
import KaConfiguration from "./Components/KaConfiguration/KaConfiguration";
import AnalyticsConfig from "./Components/AnalyticsConfig/AnalyticsConfig";
import Reinforcement from "./Components/Reinforcement/Reinforcement";
import Reports from "./Components/Reports/Reports";
import Navbar from "./Components/Layout/Dashboard/Navbar";
import Header from "./Components/Layout/Dashboard/Header";
import Loader from "./Components/Loader/Loader";

function App() {
  const showLoader = useSelector((state) => state.Loader.showLoader);
  const [isLoggedIn, setIsLoggedIn] = useState(
    window.sessionStorage.getItem("isLoggedIn")
  );
  const handleLogin = () => {
    setIsLoggedIn(true);
    window.sessionStorage.setItem("isLoggedIn", true);
  };
  /*  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  }; */
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />}></Route>
        </Routes>
        {showLoader && <Loader/>}
        {isLoggedIn && (
          <>
            <div className="row main">
              <div className="col col-lg-3 sidebar-col">
                <Navbar />
              </div>
              <div className="col col-lg-9">
                <div className="container h-100 d-flex flex-column">
                  <div className="row header-row ">
                    <div className="col-lg-12">
                      <Header />
                    </div>
                  </div>
                  <div
                    className="row flex-grow-1"
                    style={{ backgroundColor: "#F9FAFB" }}>
                    <div className="col-lg-12">
                      <Routes>
                        <Route
                          path="/dashboard"
                          element={<DashboardData />}></Route>
                        <Route
                          path="/usermanagement"
                          element={<UserMgmtData />}></Route>
                        {/*   <Route
                        path="/botconfiguration"
                        element={<BotConfigData />}></Route> */}
                        <Route
                          path="/botconfiguration"
                          element={<BotConfig />}></Route>
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
                        {/*        <Route
                        path="/addNewintent"
                        element={<AddNewIntent />}></Route> 
                      <Route
                        path="/viewIntent"
                        element={<ViewBotIntent />}></Route> */}
                      </Routes>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*  <div className="container-fluid d-flex flex-column flex-grow-1">
            <div className="row flex-grow-1">
              <div className="col-lg-3 bg-dark sidebar-col">
                <Navbar />
              </div>
              <div className="col-lg-9 main-content">
                <header className="bg-secondary text-light p-3">
                  <Header />
                </header>
                <main className="p-3">
                  <Routes>
                    <Route
                      path="/dashboard"
                      element={<DashboardData />}></Route>
                    <Route
                      path="/usermanagement"
                      element={<UserMgmtData />}></Route>
                    <Route
                      path="/botconfiguration"
                      element={<BotConfig />}></Route>
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
                  </Routes>
                </main>
                <footer className="text-center">
                  <div style={{ backgroundColor: "yellow" }}>
                    <p>Footer</p>
                  </div>
                </footer>
              </div>
            </div>
          </div> */}{" "}
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
