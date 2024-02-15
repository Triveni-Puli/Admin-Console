import React, { useEffect, useState } from "react";
import SelectComponent from "../../Common/Select";
import TextField from '@mui/material/TextField';
import RangeSliderComponent from '../../Common/RangeSlider';
// import "./KaConfiguration.css"

const ChunkConfigComponent = (props) => {
const chunkSize = props.chunkSize;
    useEffect(()=> {
      
    });
   
    return (
        <>
            <div className="kaConfig">
                <div className="items rightSpace">
                    <label>Chunk Size</label>
                    <RangeSliderComponent min={100} max={chunkSize} />
                </div>
                <div className="items">
                    <label>Chunk Overlap</label>
                    <RangeSliderComponent min={0} max={500} />
                </div>
            </div>
        </>
    )
};

export default ChunkConfigComponent;
