import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hidePopup, addNewItem } from "./actions";
import "../AddIntentStyles.css";

import Box from "@mui/material/Box";

import Dialog from "@mui/material/Dialog";
/* import DialogActions from "@mui/material/DialogActions"; */
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
/* import DialogTitle from "@mui/material/DialogTitle"; */
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";

/* const Popup = () => {
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

export default Popup; */

/* Add Popup using MUI
 */

/* import Button from "@mui/joy/Button"; */
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import DialogActions from "@mui/joy/DialogActions";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import ModalDialog from "@mui/joy/ModalDialog";
import Input from "@mui/joy/Input";

/* import Input from "@mui/material/Input"; */
const ariaLabel = { "aria-label": "description" };

export default function Popup({ addPopupOpen, onClose }) {
  /*   const [open, setOpen] = React.useState(false); */
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim() !== "") {
      dispatch(addNewItem(text));
      onClose();
      setText("");
    }
  };

  return (
    <div className="modalDialog">
      <Modal open={addPopupOpen} onClose={onClose}>
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          style={{ width: "41rem" }}>
          <DialogTitle> Add Intent Example</DialogTitle>
          <Divider />
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography level="body-sm">Add Examples for the intent</Typography>
          <Input
            placeholder="Type in here…"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#9747ff", width: "8rem" }}
              onClick={handleAdd}>
              ADD
            </Button>
            <Button
              variant="outlined"
              style={{
                color: "#C8D2DD",
                width: "8rem",
                border: "1px solid #C8D2DD",
              }}
              onClick={onClose}>
              CANCEL
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </div>
  );
}
