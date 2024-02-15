import "../KaConfiguration/KaConfiguration.css";
import plusImg from "../../assets/plusIcon.svg";
import CustomGrid from "../Common/Grid";
import React, { useEffect, useState } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { createSvgIcon } from "@mui/material/utils";
import axios from "axios";

const UserMgmtData = () => {
  const [KACollections, setKACollections] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://lohbeuf4mgodcuhxj3q343z7o40brjhx.lambda-url.ap-south-1.on.aws/",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setKACollections(response.data);
      })
      .catch((err) => {});
  }, []);
  return (
    <div>
      <div className="configContainer">
        <div className="grid">
          <div className="titleArea">
            {/*      <span>Bot Intents</span> */}
            <span className="topRight">
              <button className="topBtn addBtn">
                Add User<img src={plusImg}></img>
              </button>
            </span>
          </div>
          <div className="gridDetailsSection">
            {KACollections.length > 0 && (
              <CustomGrid
                rows={KACollections}
                dataIdentifier="userManagement"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMgmtData;
