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
import {showCreatePageUI, setFormValues} from "../KaActions";
import "../KaConfiguration.css"


const EditCustomKaCollection = () => {
  const dispatch = useDispatch();
  const [collectionName, setCollectionName] = useState('');
  // const [description, setDescription] = useState('');
  const [collectionNameErr, setCollectionNameErr] = useState('');
  const [selectedLlmType, setselectedLlmType] = useState('OpenAI');
  const [apiErrorMsg, setApiErrMsg] = useState('');
  const formValues = useSelector((state) => state.KnowlegdeAgent.formValues);
    console.log("form values", formValues);
  useEffect(() => {
  }, [])

  // const steps = [0,1,2,3];
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    // setFormValues({ ...formValues, ...newValues });
    setActiveStep(activeStep + 1);
  };

  function handleKALink() {
    dispatch(showCreatePageUI(false));
  }

  function checkCollectionName(event){
    const collection = event.target.value;
    setCollectionName(collection);
    if(collection){
      axios.post("https://5yguhudqn325lpvt6g2ekm22gy0qnfrj.lambda-url.ap-south-1.on.aws/verify_collection", {
        "collection_name": collection
      }, {
        headers: {
          "Content-Type": "text/plain",
        },
      }).then(response => {
        console.log("response", response);
        setCollectionNameErr('');
      }).catch(err => {
        console.log("err", err);
        setCollectionNameErr(err.response.data.message);
      });
    }
  }

  function handleLlmChange(val){
    setselectedLlmType(val);
    dispatch(setFormValues("llmType", val));
  }

  function handleDescChange(event){
    // setDescription(event.target.value);
    dispatch(setFormValues("description", event.target.value));
  }

  function handleCollectionNameChange(event){
    dispatch(setFormValues("collectionName", event.target.value));
  }

  function handleSave(){

    // dispatch(showCreatePageUI(false));
    // if(activeStep===3){
    // axios.post("https://erj3tyfntew3xum2dh6icphrye0ktrco.lambda-url.ap-south-1.on.aws/create_collection", {
    //   "config": {
    //     "collection_name": formValues.collectionName,
    //     "description": formValues.description,
    //     "llm": {
    //         // "llm_type": formValues.llmType,
    //         "llm_type": "OpenAI",
    //         "llm_config": {
    //             "model": formValues.llmModel,
    //              "api_key": formValues.llmApiKey,
    //              "temperature": 0.3,
    //              "max_tokens": formValues.llmMaxToken,
    //              "deployment_name":"",
    //              "openai_api_version":"",
    //              "openai_api_base":"",
    //              "credentials":""
    //             //  "top_p": 1
    //         }
    //     },
    //     "vector_db": {
    //         "db_type": "ChromaDB",
    //         "db_config": {
    //           "api_key": "",
    //           "environment":"",
    //           "url":""
    //         }
    //     },
    //     "embedding": {
    //          "embedding_type": formValues.embeddingType,
    //         "embedding_config": {
    //              "model_name": formValues.embeddingModel,
    //              "api_key": formValues.embeddingApiKey,
    //              "openai_api_version":"",
    //              "openai_api_base":"",
    //              "credentials":""
    //         }
    //     },
    //     "splitter_config": {
    //         "chunk_size": 2000,
    //          "chunk_overlap": 100
    //     }
    // }
    //   }, {
    //     headers: {
    //       "Content-Type": "text/plain",
    //     },
    //   }).then(response => {
    //     dispatch(showCreatePageUI(false));
    //     setApiErrMsg('');
    //   }).catch(err => {
    //     console.log(err);
    //     setApiErrMsg(err.response.data);
    //   });

    // }
    // if(activeStep <3){
    // setActiveStep(activeStep + 1);
    // }

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
        <div className="error">{apiErrorMsg}</div>
        <div className="items">
          <label className="inputLabel">Collection Name</label>
          <InputBox width={370} onBlur={checkCollectionName} onChange={handleCollectionNameChange}/>
        <div className="error">{collectionNameErr}</div>
        </div>
        <div className="items">
          <label className="inputLabel">Description</label>
          <InputBox className="inputBorder" width={728} onChange={handleDescChange}/>
        </div>
        <div className="switcher">
        <Button className="defaultBtn"  sx={{ marginRight: 5 }}>Create Default </Button>
        <Button className="customBtn" >Create Custom</Button>
        </div>
        <StepperComponent activeStep={activeStep}/>
        {/* <Stepper  activeStep={activeStep} sx={{ marginTop: 4, marginBottom: 4 }} alternativeLabel>
          {steps.map((label) => (
            <Step key={label} sx={{ '& .MuiStepLabel-root .Mui-completed': {
              color: '#8291A0', // circle color (COMPLETED)
            }}}  >
              <StepLabel></StepLabel>
            </Step>
          ))}
        </Stepper> */}
        <div className="kaBottom">
          {activeStep == 0 && <LLMConfigComponent handleLlmChange = {handleLlmChange} />}
          {activeStep == 1 && <EmbeddingConfigComponent/>}
          {activeStep == 2 && <VectorDBConfigComponent />}
          {activeStep == 3 && <ChunkConfigComponent/>}
        </div>
        <div className="bottomBtn">
          {activeStep !== 1 && activeStep !== 3 && <button className="btn btnPrev" disabled= {activeStep === 0} variant="outlined" sx={{ marginRight: 2 }} onClick={handlePrevious}> Previous </button>}
          <button className="btn btnSave" variant="contained" onClick={handleSave}>{activeStep === 3 ? "SUBMIT AND CREATE COLLECTION": "Save & Continue"}</button>
        </div>
      </div>
    </>
  )
};

export default EditCustomKaCollection;
