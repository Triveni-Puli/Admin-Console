import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import FilesGrid from "./FilesGrid";
import InputBox from "../../Common/InputBox";
import delIcon from "../../../assets/delWhite.svg"
// import "./KaConfiguration.css"
import { showFileExplorerPageUI } from "../KaActions";
import { setLoader } from "../../Loader/LoaderActions";

const DocumentUpload = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [docList, setDocList] = useState([]);
  const collectionName = useSelector((state) => state.KnowlegdeAgent.collectionNameForFile);

  useEffect(() => {
    axios.post("https://fioizgbxnpfd3gz4y4vjvw3vj40xesbf.lambda-url.ap-south-1.on.aws/get_files", {
      // "collection_name": "test_dummy"
      "collection_name": collectionName

    }, {
      headers: {
        "Content-Type": "text/plain",
      },
    }).then(response => {
      // console.log("response", response);
      setDocList(response.data);
    }).catch(err => {
      console.log("err", err);
    });
  }, []);

  function handleCancel() {
    dispatch(showFileExplorerPageUI(false));
  }

  function handleDeleteFile(item) {
    axios.post("https://le73rkx5apfix2323bbw3gd5te0dcvkb.lambda-url.ap-south-1.on.aws/delete_file", {
      "collection_name": collectionName,
      "file_name": item.id
    }, {
      headers: {
        "Content-Type": "text/plain",
      },
    }).then(response => {
      setDocList(docList.filter((row) => row.file_name !== item.id));
      console.log("response", response.data);
      // setUrlList(response.data);
    }).catch(err => {
      console.log("err", err);
    });
  }

  function handleAddFile() {
    dispatch(setLoader(true));
    inputRef.current.click();
    console.log("inside add");
    // dispatch(setLoader(false));

  }

  const handleFileChange = async (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    event.target.value = null;
    dispatch(setLoader(true));

    await axios.post("https://z7ub7ykp2fuotyeg2ke2ggjdli0oqxfq.lambda-url.ap-south-1.on.aws/", {
      "collection_name": collectionName,
      "file_name": fileObj.name
    }, {
      headers: {
        "Content-Type": "text/plain",
      },
    }).then(response => {
      const fields = response.data.presignedUrl.fields;
      var formData = new FormData();
      formData = Object.assign({}, fields);
      // formData.append('key', header.key);
      // formData.append('policy', header.policy);
      // formData.append('x-amz-algorithm', header['x-amz-algorithm']);
      // formData.append('x-amz-credential', header['x-amz-credential']);
      // formData.append('x-amz-date', header['x-amz-date']);
      // formData.append('x-amz-security-token', header['x-amz-security-token']);
      // formData.append('x-amz-signature', header['x-amz-signature']);
      formData = {...formData, 'file': fileObj};
      console.log("formdata", formData);
      return axios.post(response.data.presignedUrl.url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }).then(res => {
    dispatch(setLoader(false));

      console.log("inside chaining", res);
    }).catch(err => {
      console.log("err", err);
    });
  };

  return (
    <>
      <div className="items">
        <label className="inputLabel">Uploaded Queue</label>
        <div>
          <input className="searchInput" type="search" placeholder="Search here..." />
          <img className="delWhite" src={delIcon}></img>
        </div>
        {/* <InputBox className="inputBorder" /> */}
      </div>
      <FilesGrid rows={docList} isDocument={true} onDelete={handleDeleteFile} />
      <input
        style={{ display: 'none' }}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
      />
      <div className="uploadBtn">
        <button className="btn btnPrev btnFile" variant="outlined" sx={{ marginRight: 2 }} onClick={handleCancel} > Cancel </button>
        <button className="btn btnSave btnFile" variant="contained" onClick={handleAddFile} >Add file</button>
      </div>
    </>
  )
};

export default DocumentUpload;