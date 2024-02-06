import React from "react";
import { useDispatch } from "react-redux";
import { hideDelPopup } from "./actions";
import "../AddIntentStyles.css";
/* import "../IntentExample/IntentExPopupstyles.css"; */

const DeletePopup = ({ onDelete }) => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(hideDelPopup());
  };
  return (
    <div className="modalcontainer">
      <div className="modall">
        <div className="modalheader">
          <p>Delete Confirmation</p>

          <p className="close" onClick={handleCancel}>
            &times;
          </p>
        </div>
        <hr />
        <div className="modalcontent">
          <p className="text">
            Are you sure you want to delete the intent example?
          </p>
        </div>
        <div className="modalfooter">
          <button className="btnn cancel" onClick={handleCancel}>
            CANCEL
          </button>
          <button className="btnn delete" onClick={onDelete}>
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
