import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalDialog,
  DialogTitle,
  Divider,
  ModalClose,
  DialogActions,
} from "@mui/joy";
import axios from "axios";
import "./userMgmtStyles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

//import { FormControl, FormLabel, Select } from "@mui/material";

const AddUserPopup = ({ open, onClose, updateGrid }) => {
  //const [name, setName] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    useremail: "",
    role: "Admin",
    userID: "",
    password: "",
    confirmPassword: "",
  });
  const [userIdError, setUserIdError] = useState("");
  const [emailIdError, setEmailIdError] = useState("");
  const [pwdError, setPwdError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      if (
        !formData.useremail ||
        !formData.userID ||
        !formData.password ||
        !formData.role
      ) {
        throw new Error(
          "Email, UserID, Password, and Role are required fields"
        );
      } else if (!formData.confirmPassword) {
        throw new Error("Please Enter Confirm Password");
      } else if (formData.password !== formData.confirmPassword) {
        throw new Error("Password and Confirm Password do not match");
      }

      // Create a mapping between form fields and API fields
      const dataToSend = {
        Email_id: formData.useremail,
        User_Id: formData.userID,
        Password: formData.password,
        "Role Type": formData.role,
      };

      // Add name to dataToSend if it's not empty
      if (formData.username.trim() !== "") {
        dataToSend.User_Name = formData.username;
      }

      const response = await axios.post(
        "https://wffa8je7n1.execute-api.ap-south-1.amazonaws.com/dev/Create_new_user",
        dataToSend,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );

      // If the response is successful
      if (response.status === 200) {
        // Reset form data
        updateGrid();
        onClose();
        setVerificationError("");
        setFormData({
          username: "",
          useremail: "",
          role: "",
          userID: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.error("Error adding user:", error);
      setVerificationError(error.message);
    }
  };

  const handleUserIdBlur = async () => {
    try {
      const response = await axios.post(
        "https://wffa8je7n1.execute-api.ap-south-1.amazonaws.com/dev/user_id_creation_rule",
        { User_Id: formData.userID },
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      if (response.status === 200) {
        setUserIdError("");
      }
    } catch (err) {
      console.log(err);
      if (err.response?.status === 400) {
        setUserIdError(err.response.data.message);
      }
    }
  };

  const handleEmailIdBlur = async () => {
    try {
      const response = await axios.post(
        "https://wffa8je7n1.execute-api.ap-south-1.amazonaws.com/dev/email_id_creation_rule",
        { Email_id: formData.useremail },
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      if (response.status === 200) {
        setEmailIdError("");
      }
    } catch (err) {
      console.log(err);
      if (err.response?.status === 400) {
        setEmailIdError(err.response.data.message);
      }
    }
  };

  const handlePwdBlur = async () => {
    try {
      /* if (!formData.password) {
        throw new Error("Password cannot be empty");
      } */
      const response = await axios.post(
        "https://wffa8je7n1.execute-api.ap-south-1.amazonaws.com/dev/password_rule",
        { Password: formData.password },
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      if (response.status === 200) {
        setPwdError("");
      }
    } catch (err) {
      //setPwdError(err);
      if (err.response?.status === 400) {
        setPwdError(err.response.data.message);
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog
        variant="outlined"
        role="alertdialog"
        style={{
          width: "500px",
          height: "769px",
          borderRadius: "10px",
          border: " 1px solid #F9FAFB",
          backgroundColor: "#FFFFFF",
        }}>
        <DialogTitle
          style={{
            fontSize: "20px",
            fontWeight: "500",
            lineHeight: "24px",
            letterSpacing: "0em",
            textAlign: "left",
            color: "#19191E",
          }}>
          Add User
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

        <form>
          {verificationError && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {verificationError}
            </span>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}>
            <div className="field-container">
              <label
                for="username"
                style={{
                  fontSize: "15px",
                  fontWeight: "500",
                  color: "#0A0A0A",
                }}>
                Name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="field-container">
              <label
                for="useremail"
                style={{
                  fontSize: "15px",
                  fontWeight: "500",
                  color: "#0A0A0A",
                }}>
                Email
              </label>
              <input
                type="email"
                id="useremail"
                name="useremail"
                value={formData.useremail}
                onChange={handleChange}
                onBlur={handleEmailIdBlur}
              />
              {emailIdError && <p style={{ color: "red" }}>{emailIdError}</p>}
            </div>
            <div className="field-container">
              <label
                for="userrole"
                style={{
                  fontSize: "15px",
                  fontWeight: "500",
                  color: "#0A0A0A",
                }}>
                Role
              </label>
              <select
                id="userrole"
                name="role"
                value={formData.role}
                onChange={handleChange}>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="field-container">
              <label
                style={{
                  fontSize: "15px",
                  fontWeight: "500",
                  color: "#0A0A0A",
                }}
                for="userID">
                UserID
              </label>
              <input
                type="text"
                id="userID"
                name="userID"
                value={formData.userID}
                onChange={handleChange}
                onBlur={handleUserIdBlur}
              />
              {userIdError && <p style={{ color: "red" }}>{userIdError}</p>}
            </div>
            <div className="field-container">
              <label
                style={{
                  fontSize: "15px",
                  fontWeight: "500",
                  color: "#0A0A0A",
                }}
                for="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handlePwdBlur}
              />
              {pwdError && <p style={{ color: "red" }}>{pwdError}</p>}
            </div>
            <div className="field-container">
              <label
                style={{
                  fontSize: "15px",
                  fontWeight: "500",
                  color: "#0A0A0A",
                }}
                for="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <DialogActions
              style={{
                display: "flex",
                justifyContent: "center",
              }}>
              <Button
                variant="solid"
                style={{
                  backgroundColor: "#9747FF",
                  color: "#FFFFFF",
                  borderRadius: "8px",
                  width: "152px",
                  height: "50px",
                  padding: "10px, 20px, 10px, 20px",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
                onClick={handleAddUser}>
                ADD
              </Button>
              <Button
                variant="plain"
                style={{
                  width: "152px",
                  height: "50px",
                  padding: "10px, 20px, 10px, 20px",
                  borderRadius: "8px",
                  border: "1px solid #9747FF",
                  color: "#9747FF",
                  backgroundColor: "#FFFFFF",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
                onClick={onClose}>
                CANCEL
              </Button>
            </DialogActions>
          </div>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default AddUserPopup;
