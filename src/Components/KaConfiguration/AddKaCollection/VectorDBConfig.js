import React, { useEffect, useState } from "react";
import axios from 'axios';
import SelectComponent from "../../Common/Select";
import TextField from '@mui/material/TextField';
import {showField} from "../../../shared/methods";

const VectorDBConfigComponent = (props) => {
  const [vectorDBList, setVectorDBList] = useState([]);
  const [dbConfigList, setDBConfigList] = useState([]);
  const [selectedDB, setSelectedDB] = useState([]);

  useEffect(() => {
    axios.get("https://5yguhudqn325lpvt6g2ekm22gy0qnfrj.lambda-url.ap-south-1.on.aws/db_type", {}, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {
      setVectorDBList(response.data);
    }).catch(err => {
    });
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
        <label>Vector DB Type</label>
        <SelectComponent list={vectorDBList} handleChange={handleDBChange} />
      </div>
      {(selectedDB !== "ChromaDB" && selectedDB !== "FAISS" ) &&
        <>
          <span >DB Config</span>
          <hr className="line" />
          <div className="kaConfig">
          { dbConfigList && showField(dbConfigList, 'api_key') && <div className="rightSpace">
              <label>API Key</label>
              <TextField id="outlined-basic" label="" variant="outlined" size="small" type="password"  />
            </div> }
            { dbConfigList && showField(dbConfigList, 'environment') && <div className="rightSpace">
              <label>Environment</label>
              <TextField id="outlined-basic" label="" variant="outlined" size="small" />
            </div> }
            { dbConfigList && showField(dbConfigList, 'url') && <div className="rightSpace">
              <label>Url</label>
              <TextField id="outlined-basic" label="" variant="outlined" size="small" />
            </div> }
          </div>
        </>}
    </>
  )
};

export default VectorDBConfigComponent;
