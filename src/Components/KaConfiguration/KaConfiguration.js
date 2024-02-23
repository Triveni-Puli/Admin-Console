import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ViewKaCollection from "./ViewKaCollection";
import AddCustomKaCollection from "./AddKaCollection/AddCustomKaCollection";
import EditCustomKaCollection from "./EditKaCollection/EditCustomKaCollection";
import "./KaConfiguration.css"

const KaConfiguration = () => {
  // const [showCreateKaPage, setCreateKaPage] = useState(false);
  const showCreateUI = useSelector((state) => state.KnowlegdeAgent.showCreateUI);
  const showEditUI   = useSelector((state) => state.KnowlegdeAgent.showEditUI);

// function handleAddButton(val){
//     // setCreateKaPage(val);
//     // dispatch(setKaReducer());
// };

// function handleSaveButton(){

// }

  return (
    <>
      {showCreateUI ? <AddCustomKaCollection /> :
         showEditUI ? <EditCustomKaCollection/> :
         <ViewKaCollection/>
        //  <ViewKaCollection handleAddButton={handleAddButton}/>
        //  <AddCustomKaCollection handleSaveButton={handleSaveButton} />

      }
    </>
  )
};

export default KaConfiguration;
