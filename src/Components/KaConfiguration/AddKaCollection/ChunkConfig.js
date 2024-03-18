import React, { useEffect, useState } from "react";
import axios from 'axios';
import RangeSliderComponent from '../../Common/RangeSlider';
import { useDispatch, useSelector } from "react-redux";
import { setFieldValue } from "../KaActions";

const ChunkConfigComponent = (props) => {
  const dispatch = useDispatch();
  const [chunkSize, setChunkSize] = useState(14400);
  const formValues = useSelector((state) => state.KnowlegdeAgent.formValues);
  const collectionDetails = useSelector((state) => state.KnowlegdeAgent.collectionDetails);
  const chunkDetails = collectionDetails && collectionDetails.splitter_config;

// const chunkSize = props.chunkSize;
    useEffect(()=> {
        axios.post("https://5yguhudqn325lpvt6g2ekm22gy0qnfrj.lambda-url.ap-south-1.on.aws/max_chunk_size", {
            // "model": "gpt-3.5-turbo-1106",
            "model": formValues.llmModel,
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
         
      dispatch(setFieldValue("chunkSize", (100+chunkSize)/2));
      dispatch(setFieldValue("chunkOverlap", (0+500)/2));

    });

    function handleSizeChange(size){
      dispatch(setFieldValue("chunkSize", size));
    }

    function handleOverlapChange(overlap){
      dispatch(setFieldValue("chunkOverlap", overlap));
    }
   
    return (
        <>
            <div className="kaConfig">
                <div className="chunkCol">
                    <label className="inputLabel">Chunk Size</label>
                    <RangeSliderComponent min={100} max={chunkSize} step={100} handleChange = {handleSizeChange} />
                </div>
                <div className="chunkCol">
                    <label className="inputLabel">Chunk Overlap</label>
                    <RangeSliderComponent min={0} max={500} step={50} handleChange = {handleOverlapChange}  />
                </div>
            </div>
        </>
    )
};

export default ChunkConfigComponent;
