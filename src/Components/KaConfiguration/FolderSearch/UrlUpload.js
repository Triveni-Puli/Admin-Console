import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import FilesGrid from "./FilesGrid";
import InputBox from "../../Common/InputBox";
import delIcon from "../../../assets/delWhite.svg";
import plusIcon from "../../../assets/greenPlus.svg";
import refreshIcon from "../../../assets/refresh.svg";
import { showFileExplorerPageUI} from "../KaActions";

const UrlUpload = () => {
  const dispatch = useDispatch();
  const [newUrl, setNewUrl] = useState();
  const [urlList, setUrlList] = useState([]);
  const collectionName = useSelector((state) => state.KnowlegdeAgent.collectionNameForFile);
  function handleChange(event) {
    setNewUrl(event.target.value);
  }
  function getUrlList() {
    axios.post("https://fioizgbxnpfd3gz4y4vjvw3vj40xesbf.lambda-url.ap-south-1.on.aws/get_urls", {
      "collection_name": collectionName
    }, {
      headers: {
        "Content-Type": "text/plain",
      },
    }).then(response => {
      console.log("response", response);
      setUrlList(response.data);
    }).catch(err => {
      console.log("err", err);
    });
  }

  function handleAddUrl() {
    axios.post("https://5rz4yqs5bs3jk22l7jzvkvvst40clzvx.lambda-url.ap-south-1.on.aws/add_url", {
      "collection_name": collectionName,
      "url": newUrl
    }, {
      headers: {
        "Content-Type": "text/plain",
      },
    }).then(response => {
      setNewUrl('');
      getUrlList();
      console.log("response", response.data);
      // setUrlList(response.data);
    }).catch(err => {
      console.log("err", err);
    });
  }
  function handleCancel() {
    dispatch(showFileExplorerPageUI(false));
}
  function handleDeleteUrl(item) {
    axios.post("https://5rz4yqs5bs3jk22l7jzvkvvst40clzvx.lambda-url.ap-south-1.on.aws/delete_url", {
      "collection_name": collectionName,
      "url": item.id
    }, {
      headers: {
        "Content-Type": "text/plain",
      },
    }).then(response => {
      setUrlList(urlList.filter((row) => row.url !== item.id));

      console.log("response", response.data);
      // setUrlList(response.data);
    }).catch(err => {
      console.log("err", err);
    });
  }

  useEffect(() => {
    getUrlList();
  }, []);

  return (
    <>
      <div className="items">
        <div><input className="addUrlInput" placeholder="Add URL" onChange={handleChange} />
          <img className="urlImgs" src={plusIcon} onClick={handleAddUrl}></img></div>
        <label className="inputLabel">Uploaded Queue</label>
        <div className="searchDiv">
          <input className="searchInput" type="search" placeholder="Search here..." />
          <img className="urlImgs" src={refreshIcon}></img>
          <img className="urlImgs" src={delIcon} ></img>
        </div>
        {/* <InputBox className="inputBorder" /> */}
      </div>
      <FilesGrid rows={urlList} onDelete={handleDeleteUrl} />
      <div className="uploadBtn">
        <button className="btn btnPrev btnFile" variant="outlined" sx={{ marginRight: 2 }} onClick={handleCancel} > Cancel </button>
      </div>
    </>
  )
};

export default UrlUpload;
