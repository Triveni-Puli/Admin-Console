import { Link, useLocation, useNavigate } from "react-router-dom";
import "../KaConfiguration/KaConfiguration.css";
import plusImg from "../../assets/plusIcon.svg";
import CustomGrid from "../Common/Grid";
import React, { useEffect, useState } from "react";
import delSmallImg from "../../assets/deleteSmall.svg";
import axios from "axios";
import { clearList } from "../BotConfiguration/AddNewIntent/IntentExample/actions";
import { useDispatch, useSelector } from "react-redux";

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

  const handleDelete = async (item) => {
    console.log(item.id);
    const data = JSON.stringify({ intent: item.id });
    // if (dataIdentifier === "botConfig") {
    try {
      /* for (const id of selectedRowIds) { */
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

        /*     setRows(updatedRows);
          setBotIntentList([]); */
        setBotIntentList(botIntentList.filter((row) => row.intent !== item.id));
      }
    } catch (err) {
      console.log(err);
    }

    /*     setRows(rows.filter((row) => row.id !== id)); */
  };

  return (
    <div>
      <div className="configContainer">
        <div className="grid">
          <div className="titleArea">
            <span>Bot Intents</span>
            <span className="topRight">
              <Link
                to={{
                  pathname: "/addNewintent",
                  // state: {
                  //   onNewIntentAdded: handleNewIntentAdded,
                  //  }
                }}>
                {/*               <Link to="/addNewintent"> */}
                <button className="topBtn addBtn" onClick={handleAddNewIntent}>
                  Add New Intent<img src={plusImg}></img>
                </button>
              </Link>
              <button className="topBtn delBtn" onClick={handleDeleteMultiple}>
                Delete Intent <img src={delSmallImg}></img>
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
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotConfigData;
