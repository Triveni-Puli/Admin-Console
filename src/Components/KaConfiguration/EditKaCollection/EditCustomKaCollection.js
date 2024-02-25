import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import InputBox from "../../Common/InputBox";
import StepperComponent from '../../Common/Stepper';
import LLMConfigComponent from "./LLMConfig";
import EmbeddingConfigComponent from "./EmbeddingConfig";
import VectorDBConfigComponent from "./VectorDBConfig";
import ChunkConfigComponent from "./ChunkConfig";
import {showEditPageUI, setFieldValue} from "../KaActions";
import "../KaConfiguration.css"


const EditCustomKaCollection = () => {
  const dispatch = useDispatch();
  const collectionDetails = useSelector((state) => state.KnowlegdeAgent.collectionDetails);
  const [collectionName, setCollectionName] = useState('');
  const [description, setDescription] = useState(collectionDetails.description);
  const [collectionNameErr, setCollectionNameErr] = useState('');
  const [selectedLlmType, setselectedLlmType] = useState('OpenAI');
  const [apiErrorMsg, setApiErrMsg] = useState('');
  const formValues = useSelector((state) => state.KnowlegdeAgent.formValues);

    console.log("form values", formValues);
    console.log("collec values", collectionDetails);

  useEffect(() => {
  }, [])

  // const steps = [0,1,2,3];
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    // setFormValues({ ...formValues, ...newValues });
    setActiveStep(activeStep + 1);
  };

  function handleKALink() {
    dispatch(showEditPageUI(false));
  }

  function handleLlmChange(val){
    setselectedLlmType(val);
    dispatch(setFieldValue("llmType", val));
  }

  function handleDescChange(event){
    setDescription(event.target.value);
    dispatch(setFieldValue("description", event.target.value));
  }

  function handleSubmit(){
    if(activeStep===3){
    axios.post("https://erj3tyfntew3xum2dh6icphrye0ktrco.lambda-url.ap-south-1.on.aws/edit_collection", {
      "config": {
        "collection_name": formValues.collectionName,
        "description": formValues.description,
        "llm": {
            // "llm_type": formValues.llmType,
            "llm_type": "OpenAI",
            "llm_config": {
                 "api_key": formValues.llmApiKey,
                 "temperature": 0.3,
                 "max_tokens": formValues.llmMaxToken,
                 "deployment_name":"",
                 "openai_api_version":"",
                 "openai_api_base":"",
                 "credentials":"",
                 "model": "gpt-3.5-turbo",

                // "model": formValues.llmModel,
                //  "top_p": 1
            }
        },
        "vector_db": {
            "db_type": "ChromaDB",
            "db_config": {
              "api_key": "",
              "environment":"",
              "url":""
            }
        },
        "embedding": {
             "embedding_type": formValues.embeddingType,
            "embedding_config": {
                 "model_name": formValues.embeddingModel,
                 "api_key": formValues.embeddingApiKey,
                 "openai_api_version":"",
                 "openai_api_base":"",
                 "credentials":""
            }
        },
        "splitter_config": {
            "chunk_size": 2000,
             "chunk_overlap": 100
        }
    }
      }, {
        headers: {
          "Content-Type": "text/plain",
        },
      }).then(response => {
        dispatch(showEditPageUI(false));
        setApiErrMsg('');
      }).catch(err => {
        console.log(err);
        setApiErrMsg(err.response.data);
      });

    }
    if(activeStep <3){
    setActiveStep(activeStep + 1);
    }

  }
  function handlePrevious() {
    setActiveStep(activeStep-1);
  }
  return (
    <>
      <div className="configContainer" >
        <span className="kaTopText"><a href="" style={{textDecoration: "none"}} onClick={handleKALink}>K A Collections</a> {">"} Edit Collection </span>
        <div className="heading">Edit Collection</div>
        <hr className="line"/>
        <div className="items">
          <label className="inputLabel">Collection Name</label>
          <InputBox value={collectionDetails.collection_name} width={370}  onChange="" disabled/>
        </div>
        <div className="items">
          <label className="inputLabel">Description</label>
          <InputBox className="inputBorder" value={description} width={728} onChange={handleDescChange}/>
        </div>
        {/* <div className="switcher">
        <Button className="defaultBtn"  sx={{ marginRight: 5 }}>Create Default </Button>
        <Button className="customBtn" >Create Custom</Button>
        </div> */}
        <StepperComponent activeStep={activeStep}/>
        <div className="kaBottom">
          {activeStep == 0 && <LLMConfigComponent handleLlmChange = {handleLlmChange} />}
          {activeStep == 1 && <EmbeddingConfigComponent/>}
          {activeStep == 2 && <VectorDBConfigComponent />}
          {activeStep == 3 && <ChunkConfigComponent/>}
        </div>
        <div className="bottomBtn">
          {activeStep !== 0 && activeStep !== 3 && <button className="btn btnPrev" disabled= {activeStep === 0} variant="outlined" sx={{ marginRight: 2 }} onClick={handlePrevious}> Previous </button>}
          <button className="btn btnSave" variant="contained" onClick={handleSubmit}>{activeStep === 3 ? "SUBMIT AND EDIT COLLECTION": "Save & Continue"}</button>
        </div>
      </div>
    </>
  )
};

export default EditCustomKaCollection;
