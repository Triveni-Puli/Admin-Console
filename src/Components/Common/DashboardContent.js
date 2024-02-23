import React from "react";
import Image1 from "../../assets/No of Users.png";
import Image2 from "../../assets/Customer Satisfaction.png";
import Image3 from "../../assets/Handoff.png";
import Image4 from "../../assets/Top Products.png";
import Image5 from "../../assets/Total Revenue (1).png";
import Image6 from "../../assets/Total Revenue (2).png";

const ImageContainer = ({ images }) => {
  return (
    <div
      className="container"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: "10px",
      }}>
      <img
        src={Image1}
        alt="Image 1"
        style={{ maxWidth: "570px", height: "351px" }}
      />
      <img
        src={Image2}
        alt="Image 2"
        style={{ maxWidth: "420px", height: "351px" }}
      />
      <img
        src={Image3}
        alt="Image 3"
        style={{ maxWidth: "420px", height: "351px" }}
      />
      <img
        src={Image4}
        alt="Image 4"
        style={{ maxWidth: "570px", height: "351px" }}
      />
      <img
        src={Image5}
        alt="Image 5"
        style={{ maxWidth: "420px", height: "351px" }}
      />
      <img
        src={Image6}
        alt="Image 6"
        style={{ maxWidth: "420px", height: "351px" }}
      />

      {/*  {images.map((image, index) => (

        <img key={index} src={image} alt={`Image ${index}`} style={{ maxWidth: '100%', height: 'auto' }} />

      ))} */}
    </div>
  );
};

const DashboardContent = () => {
  return (
    <div>
      <ImageContainer />
    </div>
  );
};

export default DashboardContent;
