import React from "react";
import Image1 from "../../assets/No of Users.png";
import Image2 from "../../assets/Customer Satisfaction.png";
import Image3 from "../../assets/Handoff.png";
import Image4 from "../../assets/Top Products.png";
import Image5 from "../../assets/Total Revenue (1).png";
import Image6 from "../../assets/Total Revenue (2).png";

const images = [
  { src: Image1, width: 570, height: 351 },
  { src: Image2, width: 420, height: 351 },
  { src: Image3, width: 420, height: 351 },
  { src: Image4, width: 570, height: 351 },
  { src: Image5, width: 420, height: 351 },
  { src: Image6, width: 420, height: 351 },
  // Add more images as needed
];

const DashboardContent = () => {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          // gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "10px",
          // overflowX: "auto",
        }}>
        {" "}
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              width: `${image.width}px`,
              height: `${image.height}px`,
              overflow: "hidden",
            }}>
            {" "}
            <img
              src={image.src}
              alt={`Image ${index + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />{" "}
          </div>
        ))}{" "}
      </div>
    </>
  );
};

export default DashboardContent;
