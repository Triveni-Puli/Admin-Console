import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../AddNewIntent/AddIntentStyles.css";
import { useState } from "react";
import axios from "axios";
import addExImg from "../../../assets/addImg.svg";
import addEntImg from "../../../assets/addentiImg.svg";
import cancelImg from "../../../assets/Cancel.png";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  removeIntentEntity,
  addIntentEntity,
  showAddIntentPageUI,
} from "../BotConfigActions";
import Popup from "./IntentExample/AddPopup";
import DeletePopup from "../../Common/DeletePopup";
//import TextField from "@mui/material/TextField";

const AddNewIntent = () => {
  const [name, setName] = useState("");
  const [intentError, setIntentError] = useState("");
  const [description, setDescription] = useState("");
  const [inputEntity, setInputEntity] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [apiParameter, setApiParameter] = useState("");
  const [apiDescription, setApiDescription] = useState("");
  const [delExPopupOpen, setDelExPopupOpen] = useState(false);
  const [delEntityPopupOpen, setDelEntityPopupOpen] = useState(false);
  const [addPopupOpen, setAddpopupOpen] = useState(false);
  const [intentItemIndexToBeDeleted, setIntentItemIndexToBeDeleted] =
    useState(false);
  const [intentEntityIndexToBeDeleted, setIntentEntityIndexToBeDeleted] =
    useState(false);

  const [intentName, setIntentName] = useState("");
  const [intentType, setIntentType] = useState("Select Type");
  const [intentDescription, setIntentDescription] = useState("");
  const [intentExample, setIntentExample] = useState("");
  //const [entityId, setEntityId] = useState(0);

  const delPopupMsg = "Are you sure you want to delete the intent example?";
  const dispatch = useDispatch();
  const intentExamples = useSelector((state) => state.BotConfig.intentExamples);
  const intentEntities = useSelector((state) => state.BotConfig.intentEntities);

  const handleName = (e) => {
    setName(e.target.value);
    setIntentError("");
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleDeleteItem = (index) => {
    dispatch(deleteItem(intentItemIndexToBeDeleted));
    /*  dispatch(hideDelPopup()); */
    setDelExPopupOpen(false);
  };

  const handleRemoveEntity = (index) => {
    dispatch(removeIntentEntity(intentEntityIndexToBeDeleted));
    setDelEntityPopupOpen(false);
  };

  const handleAddEntity = () => {
    const intentEntity = {
      name: intentName,
      type: intentType,
      description: intentDescription,
      example: intentExample,
      //id: intentEntities.length
      // id: entityId,
    };

    dispatch(addIntentEntity(intentEntity));
    // entityId++;
    //setEntityId(entityId + 1);
    setIntentName("");
    setIntentDescription("");
    setIntentExample("");
    setIntentType("Select Type");
    /*  if (inputEntity.trim() !== "") {
      dispatch(addIntentEntity(inputEntity));
      setInputEntity("");
    } else {
      alert("Please Enter the Intent Entity Value");
    } */
  };

  const handleOptionChange = (e) => {
    setIntentType(e.target.value);
    console.log(intentType);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://zb64ezs7owjxvexvevkhmtbmv40liioq.lambda-url.ap-south-1.on.aws/put_intent",
        {
          intent: name,
          description: description,
          entities: intentEntities,
          examples: intentExamples,
          api_url: apiUrl,
          api_parameters: apiParameter,
          api_description: apiDescription,
        },
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      console.log(response);
      dispatch(showAddIntentPageUI(false));
      /*  history(
        "/botconfiguration"
        // { state: { responseData: response.data } }
      ); */
    } catch (err) {
      if (err.response?.status === 400) {
        setIntentError(err.response.data);
      }
      console.log(err);
    }
  };

  const handleNameBlur = async () => {
    try {
      const response = await axios.get(
        "https://zb64ezs7owjxvexvevkhmtbmv40liioq.lambda-url.ap-south-1.on.aws/check_intent",
        { params: { intent: name } },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.log(err);
      if (err.response?.status === 400) {
        setIntentError(err.response.data);
      }
    }
  };

  function handleBotIntentLink() {
    dispatch(showAddIntentPageUI(false));
  }

  return (
    <div style={{ padding: "10px" }}>
      <div className="d-flex" style={{ fontSize: "16px", fontWeight: "400" }}>
        <Link
          to=""
          style={{
            textDecoration: "none",
            color: "#0049B2",
            fontSize: "16px",
            fontWeight: 400,
          }}
          onClick={handleBotIntentLink}>
          Bot Intents
        </Link>
        <p className="pt-0" style={{ fontSize: "16px", fontWeight: "400" }}>
          &nbsp; {">"}&nbsp;Add New Intent
        </p>
      </div>
      <div className="add-intent-main">
        <div
          className="add-intent-label"
          style={{ fontSize: "20px", fontWeight: "500" }}>
          Add New Intent
        </div>
        <hr />
        <form onSubmit={handleSubmit}>
          <section>
            <div className="name">
              <label
                for="name"
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "17px",
                  letterSpacing: "0em",
                }}>
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                name="name"
                onChange={handleName}
                onBlur={handleNameBlur}
                placeholder="Book a cab"
                required
              />
              {intentError && <p style={{ color: "red" }}>{intentError}</p>}
            </div>
            <div className="description">
              <label
                for="description"
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "17px",
                  letterSpacing: "0em",
                }}>
                Description
              </label>
              <input
                id="description"
                type="text"
                onChange={handleDescription}
                value={description}
                name="Description"
                placeholder="Booking a cab"
                required
              />
            </div>
            {/* change in Intent Entity
             */}

            <div className="intent-entity">
              <p style={{ marginBottom: 0 }}>Intent Entities</p>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#A5AFBE",
                  marginBottom: 0,
                }}>
                Add Entities for the intent
              </p>
              <div className="intent-entity-container">
                <div className="intent-input-group">
                  <label
                    style={{ fontSize: "14px", fontWeight: 500 }}
                    for="intent-name">
                    Intent
                  </label>
                  <input
                    id="intent-name"
                    type="text"
                    placeholder="Textbox 1"
                    value={intentName}
                    onChange={(e) => setIntentName(e.target.value)}
                  />
                </div>
                <div className=" intent-input-group">
                  <label
                    style={{ fontSize: "14px", fontWeight: 500 }}
                    for="intent-dropdown">
                    Type
                  </label>
                  <select
                    id="intent-dropdown"
                    value={intentType}
                    onChange={handleOptionChange}>
                    <option value="Select Type" disabled>
                      Select Type
                    </option>
                    <option value="String">String</option>
                    <option value="Number">Number</option>
                  </select>
                  {/* <p> Selected Option:{intentType}</p> */}
                </div>
                <div className="intent-input-group">
                  <label
                    style={{ fontSize: "14px", fontWeight: 500 }}
                    for="intent-description">
                    Description
                  </label>
                  <input
                    id="intent-description"
                    type="text"
                    placeholder="Textbox 2"
                    value={intentDescription}
                    onChange={(e) => setIntentDescription(e.target.value)}
                  />
                </div>
                <div className=" intent-input-group">
                  <label
                    style={{ fontSize: "14px", fontWeight: 500 }}
                    for="intent-example">
                    Example
                  </label>
                  <input
                    id="intent-example"
                    type="text"
                    placeholder="Textbox 3"
                    value={intentExample}
                    onChange={(e) => setIntentExample(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="add-enti-button"
                  onClick={handleAddEntity}>
                  <img src={addEntImg} alt="" />
                </button>
              </div>
              <div className="d-flex entity-container">
                <ul>
                  {intentEntities &&
                    intentEntities.map((intentEntity, i) => (
                      <li key={i} className="list-item">
                        <div className="intent-entity-container">
                          {/*  <p>ID:{intentEntity.id}</p> */}
                          <div className="intent-input-group">
                            <p id="intent-name">{intentEntity.name}</p>
                          </div>
                          <div className=" intent-input-group">
                            <p id="intent-dropdown">{intentEntity.type}</p>
                          </div>
                          <div className=" intent-input-group">
                            <p id="intent-description">
                              {intentEntity.description}
                            </p>
                          </div>
                          <div className=" intent-input-group">
                            <p id="intent-example">{intentEntity.example}</p>
                          </div>
                          <div>
                            <button
                              className="trash-btn"
                              style={{ marginBottom: "12px" }}
                              type="button"
                              onClick={() => {
                                setDelEntityPopupOpen(true);
                                setIntentEntityIndexToBeDeleted(i);
                              }}>
                              {/*  onClick={() => dispatch(showDelPopup())} */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                class="bi bi-trash"
                                viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                              </svg>
                            </button>
                            {/*    Using Modal in Material UI */}
                            {delEntityPopupOpen && (
                              <DeletePopup
                                delPopupOpen={delEntityPopupOpen}
                                onClose={() => setDelEntityPopupOpen(false)}
                                onDelete={() => handleRemoveEntity()}
                                popupMsg="Are you sure you want to delete the Intent Entity?"
                              />
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="intent-container">
              <div className="intent-example">
                <div>
                  <div>Intent Examples</div>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#A5AFBE",
                      marginBottom: 0,
                    }}>
                    Add Examples for the intent
                  </p>
                </div>
                <button
                  type="button"
                  className="add-ex-button"
                  onClick={() => setAddpopupOpen(true)}>
                  Add {""} <img src={addExImg} alt="" />
                </button>
              </div>
              {addPopupOpen && (
                <Popup
                  addPopupOpen={addPopupOpen}
                  onClose={() => setAddpopupOpen(false)}
                />
              )}
              {/*  {isPopupVisible && <Popup />} */}
              <div>
                <ul className="intent-list">
                  {intentExamples?.map((item, i) => {
                    return (
                      <div className="ex-list-items">
                        <li key={i}>
                          <span className="intent-example-text">{item}</span>
                          <span className="icons">
                            <button
                              className="trash-btn"
                              type="button"
                              onClick={() => {
                                setDelExPopupOpen(true);
                                setIntentItemIndexToBeDeleted(i);
                              }}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                class="bi bi-trash"
                                viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                              </svg>
                            </button>
                            {/*    Using Modal in Material UI */}
                            {delExPopupOpen && (
                              <DeletePopup
                                popupMsg={delPopupMsg}
                                delPopupOpen={delExPopupOpen}
                                onClose={() => setDelExPopupOpen(false)}
                                onDelete={() => handleDeleteItem()}
                              />
                            )}
                          </span>
                        </li>
                      </div>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="reasoning-action ">
              <div>
                <div style={{ height: "22px" }}>Reasoning and Action</div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#A5AFBE",
                    fontWeight: 400,
                    letterSpacing: "0em",
                    height: "17px",
                  }}>
                  Add reasoning and action
                </p>
              </div>
              <div className="api-url">
                <label
                  for="api-url"
                  style={{ fontSize: "14px", height: "17px" }}>
                  API URL
                </label>
                <input
                  id="api-url"
                  type="text"
                  value={apiUrl}
                  onChange={(e) => {
                    setApiUrl(e.target.value);
                  }}
                  name="api-url"
                  placeholder="abcxyz@hcl.com"
                />
              </div>
              <div className="api-param">
                <label
                  for="api-param"
                  style={{ fontSize: "14px", height: "17px" }}>
                  API Parameters
                </label>
                <input
                  id="api-param"
                  type="text"
                  value={apiParameter}
                  onChange={(e) => {
                    setApiParameter(e.target.value);
                  }}
                  name="api-param"
                  placeholder="abcxyz@hcl.com"
                />
              </div>
              <div className="reason-description">
                <label
                  for="reason-description"
                  style={{ fontSize: "14px", height: "17px" }}>
                  Description
                </label>
                <input
                  id="reason-description"
                  type="text"
                  value={apiDescription}
                  onChange={(e) => {
                    setApiDescription(e.target.value);
                  }}
                  name="reason-description"
                  placeholder="abcxyz@hcl.com"
                />
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="add-intent-submit">
                {" "}
                ADD INTENT
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default AddNewIntent;
