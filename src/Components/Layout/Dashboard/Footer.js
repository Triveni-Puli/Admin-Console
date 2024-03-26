import React from "react";
import footerLogo from "../../../assets/footer-hcl.png";

const Footer = () => {
  return (
    <div>
      {" "}
      <div
        className="text-center"
        style={{
          bottom: 0,
        }}>
        <div
          className="d-flex justify-content-space-between "
          style={{
            backgroundColor: "#E6EBF5",
            height: "47px",
            padding: "12px 15px",
          }}>
          <div
            style={{
              fontSize: "16px",
              fontWeight: 500,
              color: "#8291A0",
            }}>
            2024 © HCL Technologies
          </div>
          <div style={{ marginLeft: "auto" }}>
            <img src={footerLogo} alt="hcltech-logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
