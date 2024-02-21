import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import SelectComponent from "../../Common/Select";
// import TextField from '@mui/material/TextField';
import RangeSliderComponent from '../../Common/RangeSlider';
import { setFormValues} from "../KaActions";
import {showField} from "../../../shared/methods"
import InputBox from "../../Common/InputBox";

// import "./KaConfiguration.css"

const LLMConfigComponent = (props) => {
  const dispatch = useDispatch();
  const [llmTypeList, setLlmTypeList] = useState([]);
  const [llmConfigList, setLlmConfigList] = useState([]);
  const [modelList, setModelList] = useState([]);
  // const [selectedLlmType, setselectedLlmType] = useState('');
  const [selectedModel, setselectedModel] = useState('');
  const [apikey, setApiKey] = useState('');

    // const llmTypeList = ["OpenAI", "AzureOpenAI", "VertexAI", "Anthropic", "Cohere"];
    

    function getLlmListAPI(){
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

    function getLlmModelAPI(llmType){
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

    function getLlmConfigList(llmType){
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

    function handleLlmChange(selectedLLM){
      // setselectedLlmType(selectedLLM);
      props.handleLlmChange(selectedLLM);
      getLlmConfigList(selectedLLM);
      getLlmModelAPI(selectedLLM);
    }

    function handleModelChange(val){
      setselectedModel(val);
      dispatch(setFormValues("llmModel", val));
    }

    function handleAPIKeyChange(event){
      dispatch(setFormValues("llmApiKey", event.target.value));
      setApiKey(event.target.value);
    }

    function handleTokenChange(event){
      dispatch(setFormValues("llmMaxToken", event.target.value));
    }
    
  return (
    <>
      <div className="items">
            <label>LLM Type</label>
            {llmTypeList.length > 0 && <SelectComponent id= "llm" list={llmTypeList} handleChange= {handleLlmChange}/>}
          </div>
          <span >LLM Config</span>
          <hr className="line"/>
          <div className="kaConfig">
            <div className="rightSpace configCol">
              <label>Model Name</label>
              { modelList.length > 0 && <SelectComponent id= "llmModel" list={modelList} handleChange = {handleModelChange} /> } 
            </div>
            { showField(llmConfigList, 'credentials') &&<div className="rightSpace configCol">
              <label>Credentials</label>
              <InputBox onChange="" width={250} />
            </div>}
            { showField(llmConfigList, 'deployment_name') &&<div className="rightSpace configCol">
              <label>Deployment Name</label>
              <InputBox  width = {250} onChange="" />
            </div>}
            { showField(llmConfigList, 'api_key') &&<div className="rightSpace configCol">
              <label>API Key</label>
              <InputBox type="password" width={250} onChange={handleAPIKeyChange} />
            </div>}
            { showField(llmConfigList, 'openai_api_version') && <div className="rightSpace configCol">
              <label>API Version</label>
              <InputBox width={250} onChange={handleAPIKeyChange} />
            </div>}
            { showField(llmConfigList, 'openai_api_base') &&<div className="rightSpace configCol">
              <label>API Base</label>
              <InputBox  width={250} onChange={handleAPIKeyChange} />
            </div>}
            <div className="rightSpace configCol">
              <label>Max Tokens</label>
              <InputBox width={250} onChange={handleTokenChange} />
            </div>
            <div>
              <label>Temperature</label>
              <div><RangeSliderComponent min={0} max={1} step={0.1} /></div>
            </div>
          </div>
    </>
  )
};

export default LLMConfigComponent;
