import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import delSmallImg from "../../assets/deleteSmall.svg";
import plusImg from "../../assets/plusIcon.svg";
import CustomGrid from '../Common/Grid';
import { showCreatePageUI, showEditPageUI, setCollectionDetails } from "./KaActions";
import "./KaConfiguration.css"

const ViewKaCollection = (props) => {
  const dispatch = useDispatch();
  const [KACollections, setKACollections] = useState([]);
  function getKACollections() {
    axios.get("https://lohbeuf4mgodcuhxj3q343z7o40brjhx.lambda-url.ap-south-1.on.aws/", {
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {
      setKACollections(response.data);
    }).catch(err => {
    });
  }

  useEffect(() => {
    getKACollections();
  }, [])


  function handleAddCollection() {
    dispatch(showCreatePageUI(true));
    // props.handleAddButton(true);
  }

  function handleDelete(collection) {
    axios.delete("https://erj3tyfntew3xum2dh6icphrye0ktrco.lambda-url.ap-south-1.on.aws/delete_collection", {
      params: {
        "collection_name": collection.id
      }
    }, {
    }).then(response => {
      setKACollections(KACollections.filter((row) => row.collection_name !== collection.id));
    }).catch(err => {
    });
  }

  function handleEdit(collection){
    console.log("in edit", collection.id);
    axios.post("https://erj3tyfntew3xum2dh6icphrye0ktrco.lambda-url.ap-south-1.on.aws/get_collection_config", {
      // params: {
        "collection_name": collection.id
      // }
    }, {
      headers: {
        "Content-Type": "text/plain",
      },
    }).then(response => {
      dispatch(setCollectionDetails(response.data));
      dispatch(showEditPageUI(true));

      // setKACollections(KACollections.filter((row) => row.collection_name !== collection.id));
    }).catch(err => {
    });
  }

  return (
    <>
      <div className="configContainer">
        <div className="grid">
          <div className="titleArea">
            <span>K A Collections</span>
            <span className="topRight">
              <button className="topBtn addBtn" onClick={handleAddCollection}>Add New Collection<img src={plusImg}></img></button>
              <button className="topBtn delBtn">Delete  Collection <img src={delSmallImg}></img></button>
            </span>
          </div>
          <div className="gridDetailsSection">
            {KACollections.length > 0 && <CustomGrid rows={KACollections} onEdit={handleEdit} onDelete={handleDelete} />}
          </div>
        </div>
      </div>
    </>
  )
};

export default ViewKaCollection;
