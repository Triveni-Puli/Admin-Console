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
import { showCreatePageUI, setFieldValue, setCollectionDetails, setFormValues } from "../KaActions";
import "../KaConfiguration.css"
import { setLoader } from "../../Loader/LoaderActions";

const AddCustomKaCollection = () => {
  const dispatch = useDispatch();
  const collectionDetails = useSelector((state) => state.KnowlegdeAgent.collectionDetails);
  const llmDetails = collectionDetails && collectionDetails.llm && collectionDetails.llm.llm_config;
  const chunkDetails = collectionDetails && collectionDetails.splitter_config;
  const [collectionName, setCollectionName] = useState('');
  const [description, setDescription] = useState('');
  const [collectionNameErr, setCollectionNameErr] = useState('');
  const [selectedLlmType, setselectedLlmType] = useState('OpenAI');
  const [apiErrorMsg, setApiErrMsg] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [defaultCollection, setDefaultCollection] = useState({});
  const formValues = useSelector((state) => state.KnowlegdeAgent.formValues);
  useEffect(() => {
    // if(isDefault){
    axios.get("https://5yguhudqn325lpvt6g2ekm22gy0qnfrj.lambda-url.ap-south-1.on.aws/default_config", {
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {
      console.log("response", response.data);
      dispatch(setCollectionDetails(response.data));
    }).catch(err => {

    })
    // }else{
    //   dispatch(setCollectionDetails({}));
    // }
  }, [isDefault])

  const [activeStep, setActiveStep] = useState(0);

  function handleKALink() {
    dispatch(showCreatePageUI(false));
  }

  function checkCollectionName(event) {
    const collection = event.target.value;
    setCollectionName(collection);
    if (collection) {
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

  // function handleLlmChange(val) {
  //   setselectedLlmType(val);
  //   dispatch(setFieldValue("llmType", val));
  // }

  function handleDescChange(event) {
    setDescription(event.target.value);
    dispatch(setFieldValue("description", event.target.value));
  }

  function handleCollectionNameChange(event) {
    setCollectionName(event.target.value);
    dispatch(setFieldValue("collection_name", event.target.value));
  }
  function handleSave() {
    // dispatch(showCreatePageUI(false));
    if (activeStep === 3) {
    dispatch(setLoader(true));

      axios.post("https://erj3tyfntew3xum2dh6icphrye0ktrco.lambda-url.ap-south-1.on.aws/create_collection", {
        "config": {
          "collection_name": formValues.collection_name,
          "description": formValues.description,
          "llm": {
            "llm_type": formValues.llmType,
            // "llm_type": "OpenAI",
            "llm_config": {
              "model": formValues.llmModel,
              "api_key": formValues.llmApiKey,
              "temperature": formValues.llmTemp,
              "max_tokens": isDefault ? llmDetails.max_tokens : formValues.llmMaxToken,
              "deployment_name": "",
              "openai_api_version": "",
              "openai_api_base": "",
              "credentials": "",
              //  "model": "gpt-3.5-turbo",
              //  "top_p": 1
            }
          },
          "vector_db": {
            "db_type": "ChromaDB",
            "db_config": {
              "api_key": "",
              "environment": "",
              "url": ""
            }
          },
          "embedding": {
            //  "embedding_type": isDefault ? "OpenAI" :formValues.embeddingType,
            "embedding_type": "OpenAI",
            "embedding_config": {
              "model_name": "text-embedding-ada-002",
              "api_key": formValues.embeddingApiKey,
              "openai_api_version": "",
              "openai_api_base": "",
              "credentials": ""
            }
          },
          "splitter_config": {
            "chunk_size": isDefault ? '' : formValues.chunkSize,
            "chunk_overlap": isDefault ? '' : formValues.chunkOverlap
            // "chunk_size": 2000,
            // "chunk_overlap": 100
          }
        }
      }, {
        headers: {
          "Content-Type": "text/plain",
        },
      }).then(response => {
        dispatch(showCreatePageUI(false));
        setApiErrMsg('');
        dispatch(setLoader(false));

      }).catch(err => {
      dispatch(setLoader(false));
        console.log(err);
        setApiErrMsg(err.response.data);
      });
    }
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    }

  }
  function handlePrevious() {
    setActiveStep(activeStep - 1);
  }
  // console.log("default", defaultCollection);
  function handleDefault() {
    setIsDefault(true);
    const defaultBtn = document.getElementById("default");
    const customBtn = document.getElementById("custom");
    defaultBtn.classList.remove("switcherWhiteBtn");
    customBtn.classList.remove("switcherBlueBtn");
    defaultBtn.classList.add("switcherBlueBtn");
    customBtn.classList.add("switcherWhiteBtn");

  }

  function handleCustom() {
    setIsDefault(false);
    dispatch(setCollectionDetails({}));

    // dispatch(setFormValues({}));
    // dispatch(setCollectionDetails({}));
    const defaultBtn = document.getElementById("default");
    const customBtn = document.getElementById("custom");
    customBtn.classList.remove("switcherWhiteBtn");
    defaultBtn.classList.remove("switcherBlueBtn");
    defaultBtn.classList.add("switcherWhiteBtn");
    customBtn.classList.add("switcherBlueBtn");
  }

  return (
    <>
      <div className="configContainer" >
        <span className="kaTopText"><a href="" style={{ textDecoration: "none" }} onClick={handleKALink}>K A Collections</a> {">"} Add new Collection </span>
        <div className="heading">Add new Collection</div>
        <hr className="line" />
        <div className="error">{apiErrorMsg}</div>
        <div className="items">
          <label className="inputLabel">Collection Name</label>
          <InputBox width={370} value={collectionName} onBlur={checkCollectionName} onChange={handleCollectionNameChange} />
          <div className="error">{collectionNameErr}</div>
        </div>
        <div className="items">
          <label className="inputLabel">Description</label>
          <InputBox className="inputBorder" value={description} width={728} onChange={handleDescChange} />
        </div>
        <div className="switcher">
          <Button className="switcherWhiteBtn" id="default" sx={{ marginRight: 5 }} onClick={handleDefault}>Create Default </Button>
          <Button className="switcherBlueBtn" id="custom" onClick={handleCustom} >Create Custom</Button>
        </div>
        <StepperComponent activeStep={activeStep} />
        <div className="kaBottom">
          {activeStep == 0 && <LLMConfigComponent isDefault={isDefault} />}
          {activeStep == 1 && <EmbeddingConfigComponent isDefault={isDefault} />}
          {activeStep == 2 && <VectorDBConfigComponent isDefault={isDefault} />}
          {activeStep == 3 && <ChunkConfigComponent />}
        </div>
        <div className="bottomBtn">
          {activeStep !== 0 && <button className="btn btnPrev" disabled={activeStep === 0} variant="outlined" sx={{ marginRight: 2 }} onClick={handlePrevious}> Previous </button>}
          <button className="btn btnSave" variant="contained" onClick={handleSave}>{activeStep === 3 ? "SUBMIT AND CREATE COLLECTION" : "Save & Continue"}</button>
        </div>
      </div>
    </>
  )
};

export default AddCustomKaCollection;
