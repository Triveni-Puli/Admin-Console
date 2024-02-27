import React from "react";
// import "../AddIntentStyles.css";

import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
//import crossImg from "../../../../assets/crossimg.svg"

export default function DeletePopup({ onClose, delPopupOpen, onDelete, popupMsg }) {
  return (
    <React.Fragment>
      <Modal open={delPopupOpen} onClose={onClose}>
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          style={{
            width: "500px",
            height: "250px",
            borderRadius: "16px",
            border: " 1px solid #F9FAFB",
          }}>
          <DialogTitle
            style={{
              width: "184px",
              height: "20px",
              fontSize: "20px",
              fontWeight: "600",
              lineHeight: "24px",
              letterSpacing: "0em",
              textAlign: "left",
              color: "#19191E",
            }}>
            Delete Confirmation
          </DialogTitle>
          <Divider style={{ border: "1.3px solid #C8D2DD" }} />

          <ModalClose
            variant="plain"
            sx={{
              m: 1,
              "& .MuiSvgIcon-root": {
                color: "#323232",
              },
            }}
          />
          <DialogContent
            style={{
              width: "445px",
              height: "19px",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "19px",
              letterSpacing: "0em",
              textAlign: "center",
              color: "#373737",
              marginTop: "20px",
            }}>
            {popupMsg}
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "30px",
            }}>
            <Button
              variant="solid"
              style={{
                backgroundColor: "#C3325F",
                color: "#FFFFFF",
                borderRadius: "8px",
                width: "152px",
                height: "50px",
                padding: "10px, 20px, 10px, 20px",
                fontSize: "16px",
                fontWeight: "500",
              }}
              onClick={onDelete}>
              DELETE
            </Button>
            <Button
              variant="plain"
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
    </React.Fragment>
  );
}
