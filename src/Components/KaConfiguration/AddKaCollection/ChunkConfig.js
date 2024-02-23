import React, { useEffect, useState } from "react";
import axios from 'axios';
import SelectComponent from "../../Common/Select";
import TextField from '@mui/material/TextField';
import RangeSliderComponent from '../../Common/RangeSlider';
// import "./KaConfiguration.css"

const ChunkConfigComponent = (props) => {
  const [chunkSize, setChunkSize] = useState();
// const chunkSize = props.chunkSize;
    useEffect(()=> {
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
    });
   
    return (
        <>
            <div className="kaConfig">
                <div className="items rightSpace">
                    <label className="inputLabel">Chunk Size</label>
                    <RangeSliderComponent min={100} max={chunkSize} step={1400} />
                </div>
                <div className="items">
                    <label className="inputLabel">Chunk Overlap</label>
                    <RangeSliderComponent min={0} max={500} step={50}  />
                </div>
            </div>
        </>
    )
};

export default ChunkConfigComponent;
