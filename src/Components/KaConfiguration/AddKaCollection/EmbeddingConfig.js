import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import SelectComponent from "../../Common/Select";
import TextField from '@mui/material/TextField';
import { setFormValues } from "../KaActions";
import { showField } from "../../../shared/methods"
import InputBox from "../../Common/InputBox";

// import "./KaConfiguration.css"

const EmbeddingConfigComponent = (props) => {
  const dispatch = useDispatch();
  const [embeddingTypeList, setEmbeddingTypeList] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [embeddingConfigList, setEmbeddingConfigList] = useState([]);


  function getEmbeddingListAPI() {
    axios.get("https://5yguhudqn325lpvt6g2ekm22gy0qnfrj.lambda-url.ap-south-1.on.aws/embedding_type", {}, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {
      //  console.log("response", response);
      setEmbeddingTypeList(response.data);
    }).catch(err => {
    });
  }

  function getEmbeddingModelAPI(embeddingType) {
    axios.post("https://5yguhudqn325lpvt6g2ekm22gy0qnfrj.lambda-url.ap-south-1.on.aws/embedding_model_name", {
      "embedding_type": embeddingType
    }, {
      headers: {
        "Content-Type": "text/plain",
      },
    }).then(response => {
      // console.log("response", response);
      setModelList(response.data);
    }).catch(err => {
    });
  }

  useEffect(() => {
    getEmbeddingListAPI();
    getEmbeddingModelAPI("OpenAI");
  }, [])

  function getEmbeddingConfigList(embeddingType) {
    axios.post("https://5yguhudqn325lpvt6g2ekm22gy0qnfrj.lambda-url.ap-south-1.on.aws/embedding_config", {
      "embedding_type": embeddingType
    }, {
      headers: {
        "Content-Type": "text/plain",
      },
    }).then(response => {
      // console.log("response", response);
      setEmbeddingConfigList(response.data);
    }).catch(err => {
    });
  }

  function handleEmbeddingTypeChange(embeddingType) {
    dispatch(setFormValues("embeddingType", embeddingType));
    getEmbeddingModelAPI(embeddingType);
    getEmbeddingConfigList(embeddingType);
  }

  function handleEmbeddingModelChange(embeddingModelType) {
    dispatch(setFormValues("embeddingModel", embeddingModelType));
  }

  function handleApiKeyChange(event) {
    dispatch(setFormValues("embeddingApiKey", event.target.value));
  }
  return (
    <>
      <div className="items">
        <label>Embedding Type</label>
        <SelectComponent id="emdedding" list={embeddingTypeList} handleChange={handleEmbeddingTypeChange} />
      </div>
      <span >Embedding Config</span>
      <hr className="line" />
      <div className="kaConfig">
        <div className="rightSpace">
          <label>Model Name</label>
          <SelectComponent id="emdeddingModel" list={modelList} handleChange={handleEmbeddingModelChange} />
        </div>
        {showField(embeddingConfigList, 'credentials') && <div className="rightSpace">
          <label>Credentials</label>
          <TextField id="outlined-basic" label="" variant="outlined" size="small" onChange="" />
        </div>}

        {showField(embeddingConfigList, 'api_key') && <div className="rightSpace">
          <label>API Key</label>
          <TextField id="outlined-basic" label="" variant="outlined" size="small" type="password" onChange={handleApiKeyChange} />
        </div>}
        {showField(embeddingConfigList, 'openai_api_version') && <div className="rightSpace">
          <label>API Version</label>
          <TextField id="outlined-basic" label="" variant="outlined" size="small" onChange="" />
        </div>}
        {showField(embeddingConfigList, 'openai_api_base') && <div className="rightSpace">
          <label>API Base</label>
          <TextField id="outlined-basic" label="" variant="outlined" size="small" onChange="" />
        </div>}
      </div>
    </>
  )
};

export default EmbeddingConfigComponent;
