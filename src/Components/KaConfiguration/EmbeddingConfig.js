import React, { useEffect, useState } from "react";
import SelectComponent from "../Common/Select";
import TextField from '@mui/material/TextField';
// import "./KaConfiguration.css"

const EmbeddingConfigComponent = (props) => {
    const llmTypeList = ["OpenAI", "AzureOpenAI", "VertexAI", "Anthropic", "Cohere"];

    const modelList = [
      "gpt-3.5-turbo",
      "gpt-3.5-turbo-1106",
      "gpt-4",
      "gpt-4-0613",
      "gpt-4-32k"
    ];
  return (
    <>
      <div className="items">
            <label>Embedding Type</label>
            <SelectComponent list={llmTypeList} />
          </div>
          <span >Embedding Config</span>
          <hr className="line"/>
          <div className="kaConfig">
            <div className="rightSpace">
              <label>Model Name</label>
              <SelectComponent list={modelList} />
            </div>
            <div className="rightSpace">
              <label>API Key</label>
              <TextField id="outlined-basic" label="" variant="outlined" size="small" />
            </div>
          </div>
    </>
  )
};

export default EmbeddingConfigComponent;
