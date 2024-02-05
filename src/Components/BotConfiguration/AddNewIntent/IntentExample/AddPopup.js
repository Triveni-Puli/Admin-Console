import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hidePopup, addNewItem } from "./actions"; // Create actions file

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
    <div className="popup">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default Popup;
