import "../KaConfiguration/KaConfiguration.css";
import plusImg from "../../assets/plusIcon.svg";
import CustomGrid from "../Common/Grid";
import React, { useEffect, useState } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { createSvgIcon } from "@mui/material/utils";
import axios from "axios";
import AddUserPopup from "./AddUserPopup";
import delSmallImg from "../../assets/deleteSmall.svg";
import DeletePopup from "../Common/DeletePopup";

const UserMgmtData = () => {
  const [userManagementdata, setUserManagementdata] = useState([]);
  const [adduserPopup, setAddUserPopup] = useState(false);
  const [delPopupOpen, setDelPopupOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const delPopupMsg = "Are you sure you want to delete this User?";

  const getUserManagementdata = () => {
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
  };
  useEffect(() => {
    getUserManagementdata();
  }, []);

  const handleOpenPopup = () => {
    setAddUserPopup(true);
  };

  const handleClosePopup = () => {
    setAddUserPopup(false);
  };

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setDelPopupOpen(true);
  };

  const handleDeleteItem = (item) => {
    const updatedUserData = userManagementdata.filter(
      (row) => row.User_Id !== item.id
    );
    setUserManagementdata(updatedUserData);
    setDelPopupOpen(false);
  };

  return (
    <div>
      <div className="configContainer">
        <div className="grid">
          <div className="titleArea">
            <span style={{ fontSize: "20px", fontWeight: 500 }}>
              User Details
            </span>
            <span className="topRight">
              <button
                className="topBtn addBtn"
                style={{ width: "100px", fontSize: "14px", fontWeight: 600 }}
                onClick={handleOpenPopup}>
                Add User<img src={plusImg}></img>
              </button>
              <button
                className="topBtn delBtn"
                // onClick={handleDeleteMultiple}
                style={{ width: "120px", fontSize: "14px", fontWeight: 600 }}>
                Delete User{" "}
                <img style={{ marginLeft: "6px" }} src={delSmallImg}></img>
              </button>
              <AddUserPopup
                open={adduserPopup}
                onClose={handleClosePopup}
                updateGrid={getUserManagementdata}
              />
            </span>
          </div>
          <div className="gridDetailsSection">
            {userManagementdata.length > 0 && (
              <CustomGrid
                rows={userManagementdata}
                getRowId={(row) => row.User_Id}
                dataIdentifier="userManagement"
                // onDelete={handleDeleteClick}
              />
            )}
            {delPopupOpen && (
              <DeletePopup
                delPopupOpen={delPopupOpen}
                onClose={() => setDelPopupOpen(false)}
                onDelete={() => handleDeleteItem(selectedRow)}
                popupMsg={delPopupMsg}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMgmtData;
