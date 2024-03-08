import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewItem } from "../../BotConfigActions";
import "../AddIntentStyles.css";
import Button from "@mui/material/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import DialogActions from "@mui/joy/DialogActions";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import ModalDialog from "@mui/joy/ModalDialog";
import Input from "@mui/joy/Input";

//const ariaLabel = { "aria-label": "description" };

export default function Popup({ addPopupOpen, onClose }) {
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
          style={{
            width: "661px",
            height: "271px",
            borderRadius: "16px",
            border: " 1px solid ##C8D2DD",
          }}>
          <DialogTitle
            style={{
              fontSize: "20px",
              fontWeight: "500",
              lineHeight: "24px",
              letterSpacing: "0em",
              color: "#19191E",
              margin: "8px",
            }}>
            {" "}
            Add Intent Example
          </DialogTitle>
          <Divider style={{ border: "1.3px solid #C8D2DD" }} />
          <ModalClose
            variant="plain"
            sx={{
              m: 2,
              "& .MuiSvgIcon-root": {
                color: "#323232",
              },
            }}
          />
          <Typography
            level="body-sm"
            style={{
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "17px",
              letterSpacing: "0em",
              color: "#8291A0",
            }}>
            Add Examples for the intent
          </Typography>
          <Input
            style={{
              width: "612px",
              padding: "10px 12px 10px 14px",
              borderRadius: "5px",
              border: "1px solid #C8D2DD",
            }}
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
              style={{
                width: "152px",
                height: "50px",
                padding: "10px, 20px, 10px, 20px",
                borderRadius: "8px",
                border: "1px solid #8291A0",
                gap: "8px",
                color: "#FFFFFF",
                backgroundColor: "#9747ff",
                fontSize: "16px",
                fontWeight: "500",
              }}
              onClick={handleAdd}>
              ADD
            </Button>
            <Button
              variant="outlined"
              style={{
                width: "152px",
                height: "50px",
                padding: "10px, 20px, 10px, 20px",
                borderRadius: "8px",
                border: "1px solid #8291A0",
                gap: "8px",
                color: "#8291A0",
                backgroundColor: "#FFFFFF",
                fontSize: "16px",
                fontWeight: "500",
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
