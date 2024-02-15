import React, { useEffect, useState } from "react";
import axios from 'axios';
import SelectComponent from "../../Common/Select";
import TextField from '@mui/material/TextField';

const VectorDBConfigComponent = (props) => {
    const [vectorDBList, setVectorDBList] = useState([]);

    useEffect(() => {
      axios.get("https://5yguhudqn325lpvt6g2ekm22gy0qnfrj.lambda-url.ap-south-1.on.aws/db_type", {}, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then(response => {
       //  console.log("response", response);
        setVectorDBList(response.data);
      }).catch(err => {
      });
    }, [])   
  return (
    <>
      <div className="items">
            <label>Vector DB Type</label>
            <SelectComponent list={vectorDBList} />
          </div>
          <span >DB Config</span>
          <hr className="line"/>
          <div className="kaConfig">
          <div className="rightSpace">
              <label>API Key</label>
              <TextField id="outlined-basic" label="" variant="outlined" size="small" />
            </div>
            <div className="rightSpace">
              <label>Environment</label>
              <TextField id="outlined-basic" label="" variant="outlined" size="small" />
            </div>
          </div>
    </>
  )
};

export default VectorDBConfigComponent;
