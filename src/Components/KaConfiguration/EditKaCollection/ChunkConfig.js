import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';
import SelectComponent from "../../Common/Select";
import TextField from '@mui/material/TextField';
import RangeSliderComponent from '../../Common/RangeSlider';
// import "./KaConfiguration.css"

const ChunkConfigComponent = (props) => {
  const [chunkSize, setChunkSize] = useState(14400);
  const collectionDetails = useSelector((state) => state.KnowlegdeAgent.collectionDetails);
  const chunkDetails = collectionDetails && collectionDetails.splitter_config;
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
  });

  return (
    <>
      <div className="kaConfig">
        <div className="chunkCol">
          <label className="inputLabel">Chunk Size</label>
          <RangeSliderComponent min={100} max={chunkSize} step={100} isEdit={true} defaultValue={chunkDetails.chunk_size} />
        </div>
        <div className="chunkCol">
          <label className="inputLabel">Chunk Overlap</label>
          <RangeSliderComponent min={0} max={500} step={50} isEdit={true} defaultValue={chunkDetails.chunk_overlap} />
        </div>
      </div>
    </>
  )
};

export default ChunkConfigComponent;
