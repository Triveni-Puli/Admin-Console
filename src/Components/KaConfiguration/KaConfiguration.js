import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import delSmallImg from "../../assets/deleteSmall.svg";
import plusImg from "../../assets/plusIcon.svg";
import CustomGrid from '../Common/Grid';
import ViewKaCollection from "./ViewKaCollection";
import AddCustomKaCollection from "./AddKaCollection/AddCustomKaCollection";
// import {  } from "./KaActions";
import "./KaConfiguration.css"

const KaConfiguration = () => {
  // const [showCreateKaPage, setCreateKaPage] = useState(false);
  const dispatch = useDispatch();
  const showCreateUI = useSelector((state) => state.KnowlegdeAgent.showCreateUI);

function handleAddButton(val){
    // setCreateKaPage(val);
    // dispatch(setKaReducer());
};

function handleSaveButton(){

}

  return (
    <>
      {!showCreateUI ? 
         <ViewKaCollection handleAddButton={handleAddButton}/> :
         <AddCustomKaCollection handleSaveButton={handleSaveButton} />
      }

    </>
  )
};

export default KaConfiguration;
