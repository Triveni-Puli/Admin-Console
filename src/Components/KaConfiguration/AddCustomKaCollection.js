import React, { useEffect, useState } from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import SelectComponent from "../Common/Select";
import TextField from '@mui/material/TextField';
import RangeSliderComponent from '../Common/RangeSlider';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import LLMConfigComponent from "./LLMConfig";
import EmbeddingConfigComponent from "./EmbeddingConfig";
import VectorDBConfigComponent from "./VectorDBConfig";
import ChunkConfigComponent from "./ChunkConfig";
import "./KaConfiguration.css"



const AddCustomKaCollection = () => {
  useEffect(() => {

    axios.post("https://5yguhudqn325lpvt6g2ekm22gy0qnfrj.lambda-url.ap-south-1.on.aws/llm_model", {
      "llm_type": "OpenAI"
    }, {
      headers: {
        "Content-Type": "text/plain",
      },
    }).then(response => {
      console.log("response", response);
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
  return (
    <>
      <div className="configContainer" >
        <label className="heading">Add new Collection</label>
        <hr className="line"/>
        <div className="items">
          <label>Collection Name</label>
          <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ width: 300 }} />
        </div>
        <div className="items">
          <label>Description</label>
          <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ width: 450 }}/>
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
          {activeStep == 0 &&<LLMConfigComponent />}
          {activeStep == 1 && <EmbeddingConfigComponent/>}
          {activeStep == 2 && <VectorDBConfigComponent />}
          {activeStep == 3 && <ChunkConfigComponent />}
        </div>
        <div className="bottomBtn">
          <Button variant="outlined" sx={{ marginRight: 2 }}>Save </Button>
          <Button variant="contained" onClick={handleNext}>Next</Button>
        </div>
      </div>
    </>
  )
};

export default AddCustomKaCollection;
