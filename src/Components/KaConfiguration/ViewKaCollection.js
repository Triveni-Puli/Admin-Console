import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import delSmallImg from "../../assets/deleteSmall.svg";
import plusImg from "../../assets/plusIcon.svg";
import CustomGrid from '../Common/Grid';
import {
  showCreatePageUI, showEditPageUI, setCollectionDetails,
  setFormValues, showFileExplorerPageUI, setCollectionNameforFile
} from "./KaActions";
import { setLoader } from "../Loader/LoaderActions";
import "./KaConfiguration.css"
import DeletePopup from "../Common/DeletePopup";

const ViewKaCollection = (props) => {
  const dispatch = useDispatch();
  const [KACollections, setKACollections] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [delPopupOpen, setDelPopupOpen] = useState(false);
  const delPopupMsg = "Are you sure you want to delete the collection?";
  function getKACollections() {
    dispatch(setLoader(true));
    axios
      .get(
        "https://lohbeuf4mgodcuhxj3q343z7o40brjhx.lambda-url.ap-south-1.on.aws/",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setKACollections(response.data);
        dispatch(setLoader(false));

      })
      .catch((err) => {
        dispatch(setLoader(false));

      });
  }

  useEffect(() => {
    getKACollections();
  }, []);

  function handleAddCollection() {
    dispatch(showCreatePageUI(true));
    // props.handleAddButton(true);
  }

  function handleDelete(collection) {
    dispatch(setLoader(true));

    axios
      .delete(
        "https://erj3tyfntew3xum2dh6icphrye0ktrco.lambda-url.ap-south-1.on.aws/delete_collection",
        {
          params: {
            collection_name: collection.id,
          },
        },
        {}
      )
      .then((response) => {
    dispatch(setLoader(false));

        setKACollections(
          KACollections.filter((row) => row.collection_name !== collection.id)
        );
        setDelPopupOpen(false);
      })
      .catch((err) => { 
    dispatch(setLoader(false));
        
      });
  }

  const handleFileSearch = (item) => {
    dispatch(showFileExplorerPageUI(true));
    dispatch(setCollectionNameforFile(item.id));
  }

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setDelPopupOpen(true);
  };
  // "https://erj3tyfntew3xum2dh6icphrye0ktrco.lambda-url.ap-south-1.on.aws/get_collection_config",

  function handleEdit(collection) {
    dispatch(setLoader(true));
    axios
      .post(
        "https://5yguhudqn325lpvt6g2ekm22gy0qnfrj.lambda-url.ap-south-1.on.aws/get_collection_config",
        {
          // params: {
          collection_name: collection.id,
          // }
        },
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      )
      .then((response) => {
        dispatch(setCollectionDetails(response.data));
        // dispatch(setFormValues(response.data));
        dispatch(setLoader(false));

        dispatch(showEditPageUI(true));

        // setKACollections(KACollections.filter((row) => row.collection_name !== collection.id));
      })
      .catch((err) => { });
  }

  return (
    <>
      <div className="configContainer">
        <div className="grid">
          <div className="titleArea">
            <span>K A Collections</span>
            <span className="topRight">
              <button className="topBtn addBtn" onClick={handleAddCollection}>
                Add New Collection<img src={plusImg}></img>
              </button>
              <button className="topBtn delBtn">
                Delete Collection <img src={delSmallImg}></img>
              </button>
            </span>
          </div>
          <div className="gridDetailsSection">
            {KACollections.length > 0 &&
              <CustomGrid rows={KACollections} onEdit={handleEdit} onDelete={handleDeleteClick} onFileSearch={handleFileSearch} dataIdentifier="KAConfig" />
            }
            {delPopupOpen && (
              <DeletePopup
                delPopupOpen={delPopupOpen}
                onClose={() => setDelPopupOpen(false)}
                onDelete={() => handleDelete(selectedRow)}
                popupMsg={delPopupMsg}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewKaCollection;
