import React, { useEffect, useState } from "react";
import axios from 'axios';
import {  useSelector } from "react-redux";
import SelectComponent from "../../Common/Select";
// import TextField from '@mui/material/TextField';
import {showField} from "../../../shared/methods";
import InputBox from "../../Common/InputBox";


const VectorDBConfigComponent = (props) => {
  const collectionDetails = useSelector((state) => state.KnowlegdeAgent.collectionDetails);
  const dbDetails = collectionDetails.vector_db.db_config;
  const [vectorDBList, setVectorDBList] = useState([]);
  const [dbConfigList, setDBConfigList] = useState([]);
  const [selectedDB, setSelectedDB] = useState([]);
  const dbType = collectionDetails.vector_db.db_type;
  useEffect(() => {
    axios.get("https://5yguhudqn325lpvt6g2ekm22gy0qnfrj.lambda-url.ap-south-1.on.aws/db_type", {}, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {
      setVectorDBList(response.data);
    }).catch(err => {
    });
    getVectorDBConfigList(dbType);
  }, [])
  function getVectorDBConfigList(dbType) {
    axios.post("https://5yguhudqn325lpvt6g2ekm22gy0qnfrj.lambda-url.ap-south-1.on.aws/db_config", {
      "db_type": dbType
    }, {
      headers: {
        "Content-Type": "text/plain",
      },
    }).then(response => {
      // console.log("response", response);
      setDBConfigList(response.data);
    }).catch(err => {
    });
  }

  function handleDBChange(selectedDB) {
    setSelectedDB(selectedDB);
    getVectorDBConfigList(selectedDB);
  }
  return (
    <>
      <div className="items">
        <label className="inputLabel">Vector DB Type</label>
        <SelectComponent disabled list={[dbType]} handleChange="" />
      </div>
      {(dbType !== "ChromaDB" && dbType !== "FAISS" ) &&
        <>
          <span >DB Config</span>
          <hr className="line" />
          <div className="kaConfig">
          { dbConfigList && showField(dbConfigList, 'api_key') && <div className="configCol">
              <label className="inputLabel">API Key</label>
              <InputBox type="password"  />
            </div> }
            { dbConfigList && showField(dbConfigList, 'environment') && <div className="configCol">
              <label className="inputLabel">Environment</label>
              <InputBox />
            </div> }
            { dbConfigList && showField(dbConfigList, 'url') && <div className="configCol">
              <label className="inputLabel">Url</label>
              <InputBox />
            </div> }
          </div>
        </>}
    </>
  )
};

export default VectorDBConfigComponent;
