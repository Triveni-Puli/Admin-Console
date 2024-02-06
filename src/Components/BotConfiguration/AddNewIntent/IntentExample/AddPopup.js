import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hidePopup, addNewItem } from "./actions";
import "../AddIntentStyles.css";

const Popup = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim() !== "") {
      dispatch(addNewItem(text));
      dispatch(hidePopup());
      setText("");
    }
  };

  const handleCancel = () => {
    dispatch(hidePopup());
  };

  return (
    <div className="modalcontainer">
      <div className="modall">
        <div className="modalheader">
          <p>Add Intent Example</p>
          <p className="close" onClick={handleCancel}>
            &times;
          </p>
        </div>
        <hr />
        <div className="modalcontent">
          <p style={{ fontSize: "14px", color: "#A5AFBE" }}>
            Add Examples for the intent
          </p>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div className="modalfooter">
          <button className="btnn cancel" onClick={handleCancel}>
            CANCEL
          </button>
          <button className="btnn add" onClick={handleAdd}>
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
