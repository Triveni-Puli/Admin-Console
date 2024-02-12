import React from "react";
import { useDispatch } from "react-redux";
import { hideDelPopup } from "./actions";
import "../AddIntentStyles.css";
/* import "../IntentExample/IntentExPopupstyles.css"; */

/* const DeletePopup = ({ onDelete }) => {
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

export default DeletePopup; */
/* 
Delete Popup Using Material UI */

import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";

export default function DeletePopup({ onClose, delPopupOpen, onDelete }) {
  return (
    <React.Fragment>
      <Modal open={delPopupOpen} onClose={onClose}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>Delete Confirmation</DialogTitle>
          <Divider />
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <DialogContent>
            Are you sure you want to delete the intent example?
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={onDelete}>
              Delete
            </Button>
            <Button variant="plain" color="neutral" onClick={onClose}>
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
