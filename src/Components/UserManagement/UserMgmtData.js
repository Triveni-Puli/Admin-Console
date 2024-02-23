import "../KaConfiguration/KaConfiguration.css";
import plusImg from "../../assets/plusIcon.svg";
import CustomGrid from "../Common/Grid";
import React, { useEffect, useState } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { createSvgIcon } from "@mui/material/utils";
import axios from "axios";

const UserMgmtData = () => {
  const [userManagementdata, setUserManagementdata] = useState([]);
  useEffect(() => {
    axios
      .get(
        " https://476gx73uu6.execute-api.ap-south-1.amazonaws.com/default/Get_all_user_details_api?Role%20Type=admin",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setUserManagementdata(response.data);
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
            {userManagementdata.length > 0 && (
              <CustomGrid
                rows={userManagementdata}
                getRowId={(row) => row.User_Id}
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
