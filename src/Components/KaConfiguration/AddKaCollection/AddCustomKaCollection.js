import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import SelectComponent from "../../Common/Select";
import TextField from '@mui/material/TextField';
import RangeSliderComponent from '../../Common/RangeSlider';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import LLMConfigComponent from "./LLMConfig";
import EmbeddingConfigComponent from "./EmbeddingConfig";
import VectorDBConfigComponent from "./VectorDBConfig";
import ChunkConfigComponent from "./ChunkConfig";
import {showCreatePageUI, setFormValues} from "../KaActions";
import "../KaConfiguration.css"


const AddCustomKaCollection = () => {
  const dispatch = useDispatch();
  const [collection, setCollection] = useState('');
  // const [description, setDescription] = useState('');
  const [collectionNameErr, setCollectionNameErr] = useState('');
  const [selectedLlmType, setselectedLlmType] = useState('OpenAI');
  const [chunkSize, setChunkSize] = useState();
  const formValues = useSelector((state) => state.KnowlegdeAgent.formValues);
    console.log("form values", formValues);
  // const test = useSelector((state) => state.KnowlegdeAgent.test);
  // console.log("test", test);
  useEffect(() => {
    axios.post("https://5yguhudqn325lpvt6g2ekm22gy0qnfrj.lambda-url.ap-south-1.on.aws/max_chunk_size", {
      "model": "gpt-3.5-turbo-1106",
      "model_name": "text-embedding-ada-002"
    }, {
      headers: {
        "Content-Type": "text/plain",
      },
    }).then(response => {
      setChunkSize(response.data);
     //  console.log("response", response);
    }).catch(err => {
    });
  }, [])

  const steps = [
    'Step 1',
    'Step 2',
    'Step 3',
    'Step 4'
  ];


  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    // setFormValues({ ...formValues, ...newValues });
    setActiveStep(activeStep + 1);
  };
  

  function checkCollectionName(event){
    const collectionName = event.target.value;
    setCollection(collectionName);
    if(collectionName){
      axios.post("https://5yguhudqn325lpvt6g2ekm22gy0qnfrj.lambda-url.ap-south-1.on.aws/verify_collection", {
        "collection_name": collectionName
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
    
    axios.post("https://erj3tyfntew3xum2dh6icphrye0ktrco.lambda-url.ap-south-1.on.aws/create_collection", {
      "config": {
        "collection_name": formValues.collectionName,
        "description": formValues.description,
        "llm": {
            "llm_type": formValues.llmType,
            "llm_config": {
                "model": formValues.llmModel,
                 "openai_api_key": formValues.llmApiKey,
                 "temperature": 0.3,
                 "max_tokens": 512,
                "top_p": 1
            }
        },
        "vector_db": {
            "db_type": "ChromaDB",
            "db_config": {}
        },
        "embedding": {
             "embedding_type": "OpenAI",
            "embedding_config": {
                 "model_name": "text-embedding-ada-002",
                 "openai_api_key": formValues.embeddingApiKey
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
        dispatch(showCreatePageUI(false));
      }).catch(err => {
      });
  }
  return (
    <>
      <div className="configContainer" >
        <label className="heading">Add new Collection</label>
        <hr className="line"/>
        <div className="items">
          <label>Collection Name</label>
          <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ width: 300 }}
          onBlur={checkCollectionName} onChange={handleCollectionNameChange}
          />
        <div className="error">{collectionNameErr}</div>
        </div>
        <div className="items">
          <label>Description</label>
          <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ width: 450 }} onChange={handleDescChange}/>
        </div>
        <Button variant="outlined" sx={{ marginRight: 2 }}>Create Default </Button>
        <Button variant="contained">Create Custom</Button>
        <Stepper activeStep={activeStep} sx={{ marginTop: 4, marginBottom: 4 }} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel></StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className="kaBottom">
          {activeStep == 0 && <LLMConfigComponent handleLlmChange = {handleLlmChange} />}
          {activeStep == 1 && <EmbeddingConfigComponent/>}
          {activeStep == 2 && <VectorDBConfigComponent />}
          {activeStep == 3 && <ChunkConfigComponent chunkSize={chunkSize}/>}
        </div>
        <div className="bottomBtn">
          <Button variant="outlined" sx={{ marginRight: 2 }} onClick={handleSave}>Save </Button>
          <Button variant="contained" onClick={handleNext}>Next</Button>
        </div>
      </div>
    </>
  )
};

export default AddCustomKaCollection;
