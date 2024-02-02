import React from "react";
import { Link } from "react-router-dom";
import "../AddNewIntent/AddIntentStyles.css";
import { useState } from "react";

const AddNewIntent = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [inputEntity, setInputEntity] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  //const [error, setError] = useState(false);

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
                <button className="add-enti-button">+</button>
              </div>
            </div>
            <div className="intent-example">
              <div>
                <div>Intent Examples</div>
                <p style={{ fontSize: "14px", color: "#A5AFBE" }}>
                  Add Examples for the intent
                </p>
              </div>
              <button className="add-ex-button">Add {""} +</button>
            </div>
            <div className="reasoning-action">
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
                  onChange={""}
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
                  onChange={""}
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
                  onChange={""}
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
