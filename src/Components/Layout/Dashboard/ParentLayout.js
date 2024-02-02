import React from "react";
import { useLocation } from "react-router";
import "../Dashboard/dashboardStyles.css";
import Navbar from "./Navbar";
import Header from "./Header";

const ParentLayout = () => {
  const location = useLocation();
  console.log(location.state);
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
              {/* code for Header */}
            </div>

            <div className="row flex-grow-1 bg-secondary">
              {/*   <p style={{ backgroundColor: "blue" }}>World</p> */}
              {/*   <UserMgmtData /> */}Hello World
              {/* <UserMgmt /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParentLayout;
