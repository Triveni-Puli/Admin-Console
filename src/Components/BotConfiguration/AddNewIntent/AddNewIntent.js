import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../AddNewIntent/AddIntentStyles.css";
import { useState } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import {
  showPopup,
  deleteItem,
  showDelPopup,
  hideDelPopup,
  removeIntentEntity,
  addIntentEntity,
  clearList,
} from "../AddNewIntent/IntentExample/actions";
import Popup from "./IntentExample/AddPopup";
import DeletePopup from "./IntentExample/DeletePopup";

const AddNewIntent = () => {
  const [name, setName] = useState("");
  const [intentError, setIntentError] = useState("");
  const [description, setDescription] = useState("");
  const [inputEntity, setInputEntity] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [apiParameter, setApiParameter] = useState("");
  const [apiDescription, setApiDescription] = useState("");
  const [delPopupOpen, setDelPopupOpen] = useState(false);
  const [addPopupOpen, setAddpopupOpen] = useState(false);

  //const [data, setData] = useState(null);
  const history = useNavigate();

  // const [items, setItems] = useState(state.items);

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const isPopupVisible = useSelector((state) => state.isPopupVisible);
  const isDelPopupVisible = useSelector((state) => state.isDelPopupVisible);
  const items = useSelector((state) => state.items);
  const intentEntities = useSelector((state) => state.intentEntities);

  /*   dispatch(clearList()); */

  const handleName = (e) => {
    setName(e.target.value);
    setIntentError("");
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleDeleteItem = (index) => {
    dispatch(deleteItem(index));
    /*  dispatch(hideDelPopup()); */
    setDelPopupOpen(false);
  };

  const handleAddEntity = () => {
    if (inputEntity.trim() !== "") {
      dispatch(addIntentEntity(inputEntity));
      setInputEntity("");
    } else {
      alert("Please Enter the Intent Entity Value");
    }
  };

  const handleRemoveEntity = (index) => {
    dispatch(removeIntentEntity(index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const duplicateCheckResponse = await axios.get(
        "https://hi954elm6a.execute-api.ap-south-1.amazonaws.com/dev/check_intent",
        { params: { intent: name } },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(duplicateCheckResponse);

      /*       call POST API on Form Submit if no duplicate intent present */
      const response = await axios.post(
        "https://hi954elm6a.execute-api.ap-south-1.amazonaws.com/dev/put_intent",
        {
          intent: name,
          description: description,
          entities: intentEntities,
          examples: items,
          api_url: apiUrl,
          api_parameters: apiParameter,
          api_description: apiDescription,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      /*  if (response?.data?.statusCode === 200) {
       
      } */
      console.log(response);
      // setData(response?.data);
      history(
        "/botconfiguration"
        // { state: { responseData: response.data } }
      );
    } catch (err) {
      if (err.response?.status === 400) {
        setIntentError(err.response.data);
      }
      console.log(err);
    }
  };

  return (
    <div>
      <div className="d-flex">
        <Link
          to="/botconfiguration"
          style={{
            textDecoration: "none",
            color: "#0049B2",
            fontSize: "16px",
            fontWeight: 400,
          }}>
          <p>Bot Intents</p>
        </Link>
        <p className="pt-1" style={{ fontSize: "14px" }}>
          &nbsp; {">"}&nbsp;Add New Intent
        </p>
      </div>
      <div className="add-intent-main">
        <div className="add-intent-label">Add New Intent</div>
        <hr />
        <form onSubmit={handleSubmit}>
          <section>
            <div className="name">
              <label for="name">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                name="name"
                onChange={handleName}
                placeholder="Book a cab"
                required
              />
              {intentError && <p style={{ color: "red" }}>{intentError}</p>}
            </div>
            <div className="description">
              <label for="description">Description</label>
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
            <div className="intent-entity">
              <p>Intent Entities</p>
              <p style={{ fontSize: "14px", color: "#A5AFBE" }}>
                Add Entities for the intent
              </p>
              <div className="d-flex entity-container">
                <ul>
                  {intentEntities.map((intentEntity, index) => (
                    <li key={index} className="list-item">
                      <span>{intentEntity}</span>
                      <div
                        className="cross-circle"
                        onClick={() => handleRemoveEntity(index)}>
                        <span className="cross-symbol">X</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="d-flex intent-entity-text">
                <input
                  id="entity"
                  type="text"
                  value={inputEntity}
                  onChange={(e) => {
                    setInputEntity(e.target.value);
                  }}
                  name="entity"
                  placeholder="Add Entities"
                />
                <button
                  type="button"
                  className="add-enti-button"
                  onClick={handleAddEntity}>
                  +
                </button>
              </div>
            </div>
            <div className="intent-container">
              <div className="intent-example">
                <div>
                  <div>Intent Examples</div>
                  <p style={{ fontSize: "14px", color: "#A5AFBE" }}>
                    Add Examples for the intent
                  </p>
                </div>
                {/*   <button
                  type="button"
                  className="add-ex-button"
                  onClick={() => dispatch(showPopup())}>
                  Add {""} +
                </button>{" "} */}
                <button
                  type="button"
                  className="add-ex-button"
                  onClick={() => setAddpopupOpen(true)}>
                  Add {""} +
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
                  {items.map((item, i) => {
                    return (
                      <div className="ex-list-items">
                        <li key={i}>
                          <span className="intent-example-text">
                            {item.text}
                          </span>
                          <span className="icons">
                            <button
                              className="trash-btn"
                              type="button"
                              onClick={() => setDelPopupOpen(true)}>
                              {/*  onClick={() => dispatch(showDelPopup())} */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-trash"
                                viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                              </svg>
                            </button>
                            {/*    Using Modal in Material UI */}
                            {delPopupOpen && (
                              <DeletePopup
                                delPopupOpen={delPopupOpen}
                                onClose={() => setDelPopupOpen(false)}
                                onDelete={() => handleDeleteItem(i)}
                              />
                            )}

                            {/*   {isDelPopupVisible && (
                              <DeletePopup
                                onDelete={() => handleDeleteItem(i)}
                              />
                            )} */}
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
                <div>Reasoning and Action</div>
                <p style={{ fontSize: "14px", color: "#A5AFBE" }}>
                  Add reasoning and action
                </p>
              </div>
              <div className="api-url">
                <label for="api-url">API URL</label>
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
                <label for="api-param">API Parameters</label>
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
                <label for="reason-description">Description</label>
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
