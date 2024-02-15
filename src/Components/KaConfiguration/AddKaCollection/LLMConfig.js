import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import SelectComponent from "../../Common/Select";
import TextField from '@mui/material/TextField';
import RangeSliderComponent from '../../Common/RangeSlider';
import { setFormValues} from "../KaActions";

// import "./KaConfiguration.css"

const LLMConfigComponent = (props) => {
  const dispatch = useDispatch();
  const [llmTypeList, setLlmTypeList] = useState([]);
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

    useEffect(() => {
      getLlmListAPI();
      getLlmModelAPI("OpenAI");
    }, [])

    function handleLlmChange(val){
      // setselectedLlmType(val);
      props.handleLlmChange(val);
      getLlmModelAPI(val);
    }

    function handleModelChange(val){
      setselectedModel(val);
      dispatch(setFormValues("llmModel", val));
    }

    function handleAPIKeyChange(event){
      dispatch(setFormValues("llmApiKey", event.target.value));
      setApiKey(event.target.value);
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
            <div className="rightSpace">
              <label>Model Name</label>
              { modelList.length > 0 && <SelectComponent id= "llmModel" list={modelList} handleChange = {handleModelChange} /> } 
            </div>
            <div className="rightSpace">
              <label>API Key</label>
              <TextField id="outlined-basic" label="" variant="outlined" size="small" onChange={handleAPIKeyChange} />
            </div>
            <div>
              <label>Temperature</label>
              <RangeSliderComponent min={0} max={1} />
            </div>
          </div>
    </>
  )
};

export default LLMConfigComponent;
