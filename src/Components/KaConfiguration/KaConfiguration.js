import React, { useEffect, useState } from "react";
import axios from 'axios';
import delSmallImg from "../../assets/deleteSmall.svg";
import plusImg from "../../assets/plusIcon.svg";
import CustomGrid from '../Common/Grid';
import ViewKaCollection from "./ViewKaCollection";
import AddCustomKaCollection from "./AddCustomKaCollection";
import "./KaConfiguration.css"

const KaConfiguration = () => {
  const [showCreateKaPage, setCreateKaPage] = useState(false);


function handleAddButton(val){
    setCreateKaPage(val);
};

  return (
    <>
      {!showCreateKaPage ? 
         <ViewKaCollection handleAddButton={handleAddButton}/> :
         <AddCustomKaCollection />
      }
    </>
  )
};

export default KaConfiguration;
