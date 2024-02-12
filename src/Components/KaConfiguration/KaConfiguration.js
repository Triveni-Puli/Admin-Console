import React, { useEffect, useState } from "react";
import axios from 'axios';
import delSmallImg from "../../assets/deleteSmall.svg";
import plusImg from "../../assets/plusIcon.svg";
import CustomGrid from '../Common/Grid';
import "./KaConfiguration.css"

const KaConfiguration = () => {
  const [KACollections, setKACollections] = useState([]);
  useEffect(() => {
    axios.get("https://lohbeuf4mgodcuhxj3q343z7o40brjhx.lambda-url.ap-south-1.on.aws/", {
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {
      setKACollections(response.data);
    }).catch(err => {
    });
  }, [])


  return (
    <>
      <div className="configContainer">
        <div className="grid">
          <div className="titleArea">
            <span>K A Collections</span>
            <span className="topRight">
              <button className="topBtn addBtn">Add New Collection<img src={plusImg}></img></button>
              <button className="topBtn delBtn">Delete  Collection <img src={delSmallImg}></img></button>
            </span>
          </div>
          <div className="gridDetailsSection">
            {KACollections.length > 0 && <CustomGrid rows={KACollections} />}
          </div>
        </div>
      </div>
    </>
  )
};

export default KaConfiguration;
