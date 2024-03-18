import "../KaConfiguration/KaConfiguration.css";
import plusImg from "../../assets/plusIcon.svg";
import CustomGrid from "../Common/Grid";
import React, { useEffect, useState } from "react";
import delSmallImg from "../../assets/deleteSmall.svg";
import axios from "axios";
import {
  clearList,
  showAddIntentPageUI,
  showViewIntentPageUI,
  showIntentDetails,
  showEditIntentPageUI,
} from "../BotConfig/BotConfigActions";
import { useDispatch, useSelector } from "react-redux";
import DeletePopup from "../Common/DeletePopup";

const ViewBotConfig = () => {
  const dispatch = useDispatch();
  const [botIntentList, setBotIntentList] = useState([]);
  const [delPopupOpen, setDelPopupOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const delPopupMsg = "Are you sure you want to delete the Intent?";

  function getBotIntentList() {
    axios
      .get(
        "https://zb64ezs7owjxvexvevkhmtbmv40liioq.lambda-url.ap-south-1.on.aws/list_intents",
        /* "https://hi954elm6a.execute-api.ap-south-1.amazonaws.com/dev/list_intents", */
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setBotIntentList(response.data);
      })
      .catch((err) => {});
  }

  useEffect(() => {
    getBotIntentList();
  }, []);

  const handleAddNewIntent = () => {
    dispatch(showAddIntentPageUI(true));
    dispatch(clearList());
  };

  function handleEdit(item) {
    console.log("in edit", item.id);
    axios
      .post(
        "https://zb64ezs7owjxvexvevkhmtbmv40liioq.lambda-url.ap-south-1.on.aws/view_intent",
        {
          intent: item.id,
        },
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      )
      .then((response) => {
        dispatch(showEditIntentPageUI(true));
        dispatch(showIntentDetails(response.data));
      })
      .catch((err) => {});
  }

  const handleDeleteItem = async (item) => {
    try {
      const response = await axios.delete(
        "https://zb64ezs7owjxvexvevkhmtbmv40liioq.lambda-url.ap-south-1.on.aws/delete_intent",
        { params: { intent: item.id } },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Item deleted", response.data);
        const updatedBotIntentListAfterDel = botIntentList.filter(
          (row) => row.intent !== item.id
        );
        setBotIntentList(updatedBotIntentListAfterDel);
        setDelPopupOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setDelPopupOpen(true);
  };

  const handleViewClick = (row) => {
    setSelectedRow(row);
    dispatch(showViewIntentPageUI(true));
    /*   dispatch(showIntentDetails()); */

    const selectedRecord = botIntentList.find(
      (record) => record.intent === row.id
    );
    // setSelectedRow(selectedRecord);
    dispatch(showIntentDetails(selectedRecord));
  };

  return (
    <div>
      <div className="configContainer">
        <div className="grid">
          <div className="titleArea">
            <span style={{ fontSize: "20px", fontWeight: 500 }}>
              Bot Intents
            </span>
            <span className="topRight">
              <button
                className="topBtn addBtn"
                onClick={handleAddNewIntent}
                style={{
                  width: "146px",
                  fontSize: "14px",
                  fontWeight: 600,
                }}>
                Add New Intent
                <img style={{ marginLeft: "6px" }} src={plusImg}></img>
              </button>
              <button
                className="topBtn delBtn"
                // onClick={handleDeleteMultiple}
                style={{ width: "140px", fontSize: "14px", fontWeight: 600 }}>
                Delete Intent{" "}
                <img style={{ marginLeft: "6px" }} src={delSmallImg}></img>
              </button>
            </span>
          </div>
          <div className="gridDetailsSection">
            {botIntentList.length > 0 && (
              <CustomGrid
                rows={botIntentList}
                getRowId={(row) => row.intent}
                dataIdentifier="botConfig"
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                onView={handleViewClick}
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

export default ViewBotConfig;
