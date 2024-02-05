import React from "react";
import { Link } from "react-router-dom";
import "../AddNewIntent/AddIntentStyles.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showPopup, deleteItem } from "../AddNewIntent/IntentExample/actions"; // Import the action
import Popup from "./IntentExample/AddPopup";

const AddNewIntent = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [inputEntity, setInputEntity] = useState("");
  // const [items, setItems] = useState(state.items);

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const isPopupVisible = useSelector((state) => state.isPopupVisible);
  const items = useSelector((state) => state.items);
  console.log(items);

  //const [error, setError] = useState(false)

  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleDescription = (e) => {
    setDescription(e.target.value);
    setSubmitted(false);
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
                <button type="button" className="add-enti-button">
                  +
                </button>
              </div>
            </div>
            <div className="intent-example">
              <div>
                <div>Intent Examples</div>
                <p style={{ fontSize: "14px", color: "#A5AFBE" }}>
                  Add Examples for the intent
                </p>
              </div>
              <div>
                <button
                  type="button"
                  className="add-ex-button"
                  onClick={() => dispatch(showPopup())}>
                  Add {""} +
                </button>{" "}
                {isPopupVisible && <Popup />}
                <ul>
                  {items.map((item, i) => {
                    <li key={i}>
                      {item.text}
                      <button
                        type="button"
                        onClick={() => dispatch(deleteItem(i))}>
                        Delete
                      </button>
                    </li>;
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
