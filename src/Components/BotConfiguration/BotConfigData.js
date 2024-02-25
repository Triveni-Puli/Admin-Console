import { Link, useLocation, useNavigate } from "react-router-dom";
import "../KaConfiguration/KaConfiguration.css";
import plusImg from "../../assets/plusIcon.svg";
import CustomGrid from "../Common/Grid";
import React, { useEffect, useState } from "react";
import delSmallImg from "../../assets/deleteSmall.svg";
import axios from "axios";
import {
  clearList,
  deleteItem,
} from "../BotConfiguration/AddNewIntent/IntentExample/actions";
import { useDispatch, useSelector } from "react-redux";
import DeletePopup from "../BotConfiguration/AddNewIntent/IntentExample/DeletePopup";

const BotConfigData = () => {
  // const [responseData, setResponseData] = useState({});

  // const handleNewIntentAdded = (data) => {
  //   setResponseData(data);
  // };
  // const location = useLocation();
  // const { state } = location;

  // useEffect(() => {
  //   if (state && state.responseData) {
  //     setResponseData(state.responseData);
  //   }
  // }, [state]);

  // console.log(responseData);
  const dispatch = useDispatch();
  const [botIntentList, setBotIntentList] = useState([]);
  const [gridSelectionModel, setGridSelectionModel] = useState([]);
  const [delPopupOpen, setDelPopupOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://hi954elm6a.execute-api.ap-south-1.amazonaws.com/dev/list_intents",
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
  }, []);

  const handleAddNewIntent = () => {
    dispatch(clearList());
  };

  const handleDeleteMultiple = () => {
    const updatedRows = botIntentList.filter(
      (row) => !gridSelectionModel.includes(row.intent)
    );
    setBotIntentList(updatedRows);
  };

  const handleDeleteItem = async (item) => {
    try {
      const response = await axios.delete(
        "https://hi954elm6a.execute-api.ap-south-1.amazonaws.com/dev/delete_intent",
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

  return (
    <div>
      <div className="configContainer">
        <div className="grid">
          <div className="titleArea">
            <span style={{ fontSize: "20px", fontWeight: 500 }}>
              Bot Intents
            </span>
            <span className="topRight">
              <Link
                to={{
                  pathname: "/addNewintent",
                  // state: {
                  //   onNewIntentAdded: handleNewIntentAdded,
                  //  }
                }}>
                {/*               <Link to="/addNewintent"> */}
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
              </Link>
              <button
                className="topBtn delBtn"
                onClick={handleDeleteMultiple}
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
                onSelectionModelChange={setGridSelectionModel}
                //onDelete={handleDeleteAPI}
                onDeleteIcon={handleDeleteClick}
              />
            )}
            {delPopupOpen && (
              <DeletePopup
                delPopupOpen={delPopupOpen}
                onClose={() => setDelPopupOpen(false)}
                onDelete={() => handleDeleteItem(selectedRow)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotConfigData;
