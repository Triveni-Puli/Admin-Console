import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddNewIntent from "../BotConfig/AddNewIntent/AddNewIntent";
import ViewBotConfig from "./ViewBotConfig";
import ViewBotIntent from "./ViewBotIntent/ViewBotIntent";
import EditBotIntent from "./EditBotIntent/EditBotIntent";

const BotConfig = () => {
  const showAddIntentUI = useSelector(
    (state) => state.BotConfig.showAddIntentUI
  );
  const showEditIntentUI = useSelector(
    (state) => state.BotConfig.showEditIntentUI
  );
  const showViewIntentUI = useSelector(
    (state) => state.BotConfig.showViewIntentUI
  );
  return (
    <>
      {showAddIntentUI ? (
        <AddNewIntent />
      ) : showEditIntentUI ? (
        <EditBotIntent />
      ) : showViewIntentUI ? (
        <ViewBotIntent />
      ) : (
        <ViewBotConfig />
      )}
    </>
  );
};

export default BotConfig;
