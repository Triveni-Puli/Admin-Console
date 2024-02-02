import Login from "./Components/Layout/Login/login";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserMgmtData from "./Components/UserManagement/UserMgmtData";
import BotConfigData from "./Components/BotConfiguration/BotConfigData";
import AddNewIntent from "./Components/BotConfiguration/AddNewIntent/AddNewIntent";
import DashboardData from "./Components/Dashboard/DashboardData";
import KaConfiguration from "./Components/KaConfiguration/KaConfiguration";
import AnalyticsConfig from "./Components/AnalyticsConfig/AnalyticsConfig";
import Reinforcement from "./Components/Reinforcement/Reinforcement";
import Reports from "./Components/Reports/Reports";
import ParentLayout from "./Components/Layout/Dashboard/ParentLayout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<ParentLayout />}></Route>
          {/*  <Route path="/dashboard" element={<DashboardData />}></Route> */}
          <Route path="/usermanagement" element={<UserMgmtData />}></Route>
          <Route path="/botconfiguration" element={<BotConfigData />}></Route>
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
          <Route path="/addNewintent" element={<AddNewIntent />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
