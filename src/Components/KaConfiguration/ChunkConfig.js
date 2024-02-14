import React, { useEffect, useState } from "react";
import SelectComponent from "../Common/Select";
import TextField from '@mui/material/TextField';
import RangeSliderComponent from '../Common/RangeSlider';
// import "./KaConfiguration.css"

const ChunkConfigComponent = (props) => {
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
            <div className="kaConfig">
                <div>
                    <label>Chunk Size</label>
                    <RangeSliderComponent />
                </div>
                <div>
                    <label>Chunk Overlap</label>
                    <RangeSliderComponent />
                </div>
            </div>
        </>
    )
};

export default ChunkConfigComponent;
