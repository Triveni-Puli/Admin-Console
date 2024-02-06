import React from "react";
import "../Layout/Dashboard/dashboardStyles.css";
import Navbar from "../Layout/Dashboard/Navbar";
import Header from "../Layout/Dashboard/Header";
import "./KaConfiguration.css"
import showImg from "../../assets/show.svg";
import editImg from "../../assets/edit.svg";
import deleteImg from "../../assets/delete.svg";

const KaConfiguration = () => {
  return (
    <>
      <div className="row main">
        <div className="col col-lg-2 sidebar-col">
          <Navbar />
        </div>

        <div className="col col-lg-10">
          <div class="container h-100 d-flex flex-column">
            <div class="row header-row ">
              <Header />
            </div>

            <div className="configContainer">
              <div className="grid">
                <div>
                  <span>K A Collections</span>
                  <span className="topBtn">
                    <button className="addBtn">Add New Collection</button>
                    <button className="delBtn">Delete  Collection</button>
                  </span>
                </div>
                <div className="gridSection">
                  <div class="gridRow gridHeader">
                      <div class="gridFirstCol"><input type="checkbox"></input></div>
                      <div class="gridSecCol">Name</div>
                      <div class="gridThirdCol">Description</div>
                      <div class="gridFourCol">Actions</div>
                  </div>
                  <div class="gridRow">
                      <div class="gridFirstCol"><input type="checkbox"></input></div>
                      <div class="gridSecCol">Global Procurement Services</div>
                      <div class="gridThirdCol">Information regarding LMS</div>
                      <div class="gridFourCol">
                        <img src={showImg} />
                        <img src={editImg} />
                        <img src={deleteImg} />

                      </div>
                  </div>
                </div>
            </div>

            </div>
          </div>
        </div>
      </div> 
    </>
  )
};

export default KaConfiguration;
