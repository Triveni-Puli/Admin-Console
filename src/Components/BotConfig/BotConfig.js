import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddNewIntent from "../BotConfig/AddNewIntent/AddNewIntent";
import ViewBotConfig from "./ViewBotConfig";
import ViewBotIntent from "./ViewBotIntent/ViewBotIntent";

const BotConfig = () => {
  const showAddIntentUI = useSelector((state) => state.BotConfig.showAddIntentUI);
  const showViewIntentUI = useSelector((state)=> state.BotConfig.showViewIntentUI);
  return (
    <>
      {showAddIntentUI ? <AddNewIntent /> :
      showViewIntentUI? <ViewBotIntent /> :
         <ViewBotConfig />
      }
    </>
  )
};

export default BotConfig;
