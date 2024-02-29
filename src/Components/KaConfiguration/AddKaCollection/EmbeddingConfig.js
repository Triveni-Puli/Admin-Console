import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import SelectComponent from "../../Common/Select";
// import TextField from '@mui/material/TextField';
import { setFieldValue } from "../KaActions";
import { showField } from "../../../shared/methods"
import InputBox from "../../Common/InputBox";

// import "./KaConfiguration.css"

const EmbeddingConfigComponent = ({isDefault}) => {
  const dispatch = useDispatch();
  const collectionDetails = useSelector((state) => state.KnowlegdeAgent.collectionDetails);
  const embeddingDetails = collectionDetails.embedding.embedding_config;
  const formValues = useSelector((state) => state.KnowlegdeAgent.formValues);
  const [embeddingTypeList, setEmbeddingTypeList] = useState(["OpenAI"]);
  const [modelList, setModelList] = useState(["text-embedding-ada-002"]);
  const [embeddingConfigList, setEmbeddingConfigList] = useState([]);
  const [apikey, setApiKey] = useState('');


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
    getEmbeddingConfigList("OpenAI");

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
    dispatch(setFieldValue("embeddingType", embeddingType));
    getEmbeddingModelAPI(embeddingType);
    getEmbeddingConfigList(embeddingType);
  }

  function handleEmbeddingModelChange(embeddingModelType) {
    dispatch(setFieldValue("embeddingModel", embeddingModelType));
  }

  function handleApiKeyChange(event) {
    dispatch(setFieldValue("embeddingApiKey", event.target.value));
    setApiKey(event.target.value);
  }
  return (
    <>
      <div className="items">
        <label className="inputLabel">Embedding Type</label>
        <SelectComponent id="emdedding"  disabled={isDefault} list={embeddingTypeList} handleChange={handleEmbeddingTypeChange} />
      </div>
      <span >Embedding Config</span>
      <hr className="line" />
      <div className="kaConfig">
        <div className="configCol">
          <label className="inputLabel">Model Name</label>
          <SelectComponent id="emdeddingModel" disabled={isDefault} list={modelList} handleChange={handleEmbeddingModelChange} />
        </div>
        {showField(embeddingConfigList, 'credentials') && <div className="configCol">
          <label className="inputLabel">Credentials</label>
          <InputBox disabled={isDefault} onChange="" />
        </div>}

        {showField(embeddingConfigList, 'api_key') && <div className="configCol">
          <label className="inputLabel">API Key</label>
          <InputBox type="password" value={apikey} onChange={handleApiKeyChange} />
        </div>}
        {showField(embeddingConfigList, 'openai_api_version') && <div className="configCol">
          <label className="inputLabel">API Version</label>
          <InputBox disabled={isDefault} onChange="" />
        </div>}
        {showField(embeddingConfigList, 'openai_api_base') && <div className="configCol">
          <label className="inputLabel">API Base</label>
          <InputBox disabled={isDefault} onChange="" />
        </div>}
      </div>
    </>
  )
};

export default EmbeddingConfigComponent;
