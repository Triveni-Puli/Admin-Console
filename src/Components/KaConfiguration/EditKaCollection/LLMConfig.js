import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import SelectComponent from "../../Common/Select";
// import TextField from '@mui/material/TextField';
import RangeSliderComponent from '../../Common/RangeSlider';
import { setFieldValue } from "../KaActions";
import { showField } from "../../../shared/methods"
import InputBox from "../../Common/InputBox";

// import "./KaConfiguration.css"

const LLMConfigComponent = (props) => {
  const dispatch = useDispatch();
  const collectionDetails = useSelector((state) => state.KnowlegdeAgent.collectionDetails);
  const llmDetails = collectionDetails && collectionDetails.llm  && collectionDetails.llm.llm_config;
  const llmType = collectionDetails && collectionDetails.llm  && collectionDetails.llm.llm_type;
  const llmModel = llmDetails && llmDetails.model;
  const [llmTypeList, setLlmTypeList] = useState([llmType]);
  const [llmConfigList, setLlmConfigList] = useState([]);
  const [modelList, setModelList] = useState([llmModel]);
  // const [selectedLlmType, setselectedLlmType] = useState('');
  const [selectedModel, setselectedModel] = useState('');
  const [apikey, setApiKey] = useState(llmDetails.api_key);
  const [maxToken, setMaxToken] = useState(llmDetails.max_tokens);
  const [temp, setTemp] = useState(llmDetails.temperature)

  // const llmTypeList = ["OpenAI", "AzureOpenAI", "VertexAI", "Anthropic", "Cohere"];


  function getLlmListAPI() {
    axios.get("https://5yguhudqn325lpvt6g2ekm22gy0qnfrj.lambda-url.ap-south-1.on.aws/llm_type", {}, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {
      //  console.log("response", response);
      setLlmTypeList(response.data);
    }).catch(err => {
    });
  }

  function getLlmModelAPI(llmType) {
    axios.post("https://5yguhudqn325lpvt6g2ekm22gy0qnfrj.lambda-url.ap-south-1.on.aws/llm_model", {
      "llm_type": llmType
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

  function getLlmConfigList(llmType) {
    axios.post("https://5yguhudqn325lpvt6g2ekm22gy0qnfrj.lambda-url.ap-south-1.on.aws/llm_config", {
      "llm_type": llmType
    }, {
      headers: {
        "Content-Type": "text/plain",
      },
    }).then(response => {
      // console.log("response", response);
      setLlmConfigList(response.data);
    }).catch(err => {
    });
  }



  useEffect(() => {
    getLlmListAPI();
    getLlmModelAPI("OpenAI");
    getLlmConfigList("OpenAI");
  }, [])

  function handleLlmChange(selectedLLM) {
    // setselectedLlmType(selectedLLM);
    props.handleLlmChange(selectedLLM);
    getLlmConfigList(selectedLLM);
    getLlmModelAPI(selectedLLM);
  }

  function handleModelChange(val) {
    setselectedModel(val);
    dispatch(setFieldValue("llmModel", val));
  }

  function handleAPIKeyChange(event) {
    dispatch(setFieldValue("llmApiKey", event.target.value));
    setApiKey(event.target.value);
  }

  function handleTokenChange(event) {
    dispatch(setFieldValue("llmMaxToken", event.target.value));
    setMaxToken(event.target.value);
  }

  return (
    <>
      <div className="items">
        <label className="inputLabel">LLM Type</label>
        {llmTypeList.length > 0 && <SelectComponent id="llm" list={llmTypeList} handleChange={handleLlmChange} />}
      </div>
      <span >LLM Config</span>
      <hr className="line" />
      <div className="kaConfig">
        <div className="configCol">
          <label className="inputLabel">Model Name</label>
          {modelList.length > 0 && <SelectComponent id="llmModel" list={modelList} handleChange={handleModelChange} />}
        </div>
        {showField(llmConfigList, 'credentials') && <div className="configCol">
          <label className="inputLabel">Credentials</label>
          <InputBox className="inputBorder" onChange="" />
        </div>}
        {showField(llmConfigList, 'deployment_name') && <div className="configCol">
          <label className="inputLabel">Deployment Name</label>
          <InputBox onChange="" />
        </div>}
        {showField(llmConfigList, 'api_key') && <div className="configCol">
          <label className="inputLabel">API Key</label>
          <InputBox className="inputBorder" type="password" value ={apikey} onChange={handleAPIKeyChange} />
        </div>}
        {showField(llmConfigList, 'openai_api_version') && <div className="configCol">
          <label className="inputLabel">API Version</label>
          <InputBox onChange="" />
        </div>}
        {showField(llmConfigList, 'openai_api_base') && <div className="rightSpace configCol">
          <label className="inputLabel">API Base</label>
          <InputBox onChange="" />
        </div>}
        <div className="rightSpace configCol">
          <label className="inputLabel">Max Tokens</label>
          <InputBox className="inputBorder" value={maxToken} onChange={handleTokenChange} />
        </div>
        <div>
          <label className="inputLabel">Temperature</label>
          <div><RangeSliderComponent min={0} max={1} step={0.1} defaultValue={temp} /></div>
        </div>
      </div>
    </>
  )
};

export default LLMConfigComponent;
