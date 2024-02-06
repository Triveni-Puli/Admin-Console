import React from "react";
import { Link } from "react-router-dom";
import "../AddNewIntent/AddIntentStyles.css";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  showPopup,
  deleteItem,
  showDelPopup,
  hideDelPopup,
} from "../AddNewIntent/IntentExample/actions";
import Popup from "./IntentExample/AddPopup";
import DeletePopup from "./IntentExample/DeletePopup";

const AddNewIntent = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [inputEntity, setInputEntity] = useState("");
  // const [items, setItems] = useState(state.items);

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const isPopupVisible = useSelector((state) => state.isPopupVisible);
  const isDelPopupVisible = useSelector((state) => state.isDelPopupVisible);
  const items = useSelector((state) => state.items);

  //const [error, setError] = useState(false)

  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
    setSubmitted(false);
  };

  const handleDeleteItem = (index) => {
    dispatch(deleteItem(index));
    dispatch(hideDelPopup());
  };

  const handleAddEntity = () => {
    /*  if (inputEntity.trim() !== '') {
      onAdd(inputEntity);
      setInputEntity('');
    } */
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /*  if (name === "" || email === "" || password === "") {
       setError(true); 
  } else {
      setSubmitted(true);
     /*  setError(false); 
  } */
    setSubmitted(true);
  };

  return (
    <div>
      <div className="d-flex">
        <Link
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
        <form>
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
              />
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
              />
            </div>
            <div className="intent-entity">
              <p>Intent Entities</p>
              <p style={{ fontSize: "14px", color: "#A5AFBE" }}>
                Add Entities for the intent
              </p>
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
                <button
                  type="button"
                  className="add-ex-button"
                  onClick={() => dispatch(showPopup())}>
                  Add {""} +
                </button>{" "}
              </div>
              {isPopupVisible && <Popup />}
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
                              onClick={() => dispatch(showDelPopup())}>
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
                            {isDelPopupVisible && (
                              <DeletePopup
                                onDelete={() => handleDeleteItem(i)}
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
                  value=""
                  name="api-url"
                  placeholder="abcxyz@hcl.com"
                />
              </div>
              <div className="api-param">
                <label for="api-param">API Parameters</label>
                <input
                  id="api-param"
                  type="text"
                  value=""
                  name="api-param"
                  placeholder="abcxyz@hcl.com"
                />
              </div>
              <div className="reason-description">
                <label for="reason-description">Description</label>
                <input
                  id="reason-description"
                  type="text"
                  value=""
                  name="reason-description"
                  placeholder="abcxyz@hcl.com"
                />
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button className="add-intent-submit"> ADD INTENT</button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default AddNewIntent;
