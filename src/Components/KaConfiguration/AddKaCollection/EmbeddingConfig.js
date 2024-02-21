import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import SelectComponent from "../../Common/Select";
// import TextField from '@mui/material/TextField';
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
        <label className="inputLabel">Embedding Type</label>
        <SelectComponent id="emdedding" list={embeddingTypeList} handleChange={handleEmbeddingTypeChange} />
      </div>
      <span >Embedding Config</span>
      <hr className="line" />
      <div className="kaConfig">
        <div className="configCol">
          <label className="inputLabel">Model Name</label>
          <SelectComponent id="emdeddingModel" list={modelList} handleChange={handleEmbeddingModelChange} />
        </div>
        {showField(embeddingConfigList, 'credentials') && <div className="configCol">
          <label className="inputLabel">Credentials</label>
          <InputBox onChange="" />
        </div>}

        {showField(embeddingConfigList, 'api_key') && <div className="configCol">
          <label className="inputLabel">API Key</label>
          <InputBox type="password" onChange={handleApiKeyChange} />
        </div>}
        {showField(embeddingConfigList, 'openai_api_version') && <div className="configCol">
          <label className="inputLabel">API Version</label>
          <InputBox onChange="" />
        </div>}
        {showField(embeddingConfigList, 'openai_api_base') && <div className="configCol">
          <label className="inputLabel">API Base</label>
          <InputBox onChange="" />
        </div>}
      </div>
    </>
  )
};

export default EmbeddingConfigComponent;
