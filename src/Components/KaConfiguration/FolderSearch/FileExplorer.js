import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
// import { useSelector } from "react-redux";
import SelectComponent from "../../Common/Select";
// import CustomGrid from "../../Common/Grid";
import FilesGrid from "./FilesGrid";
import InputBox from "../../Common/InputBox";
import delIcon from "../../../assets/delWhite.svg"
// import "./KaConfiguration.css"
import { showFileExplorerPageUI, setFieldValue, setFormValues } from "../KaActions";
import DocumentUpload from "./DocumentUpload";
import UrlUpload from "./UrlUpload";

const FileExplorer = () => {
    const dispatch = useDispatch();
    const [type, setType] = useState('Documents');

    function handleKALink() {
        dispatch(showFileExplorerPageUI(false));
    }

    function handleCollectionChange(value) {
        setType(value);
    }
    return (
        <>
            <div className="configContainer" >
                <span className="kaTopText"><a href="" style={{ textDecoration: "none" }} onClick={handleKALink}>K A Collections</a> {">"} File Explorer Options </span>
                <div className="heading">File Explorer Options</div>
                <hr className="line" />
                <div className="items">
                    <label className="inputLabel">Existing Collections</label>
                    <SelectComponent list={["Documents", "URL"]} handleChange={handleCollectionChange} value={type} />
                    {/* <InputBox value={collectionDetails.collection_name} width={370} onChange="" disabled /> */}
                </div>
                {type == "Documents" && <DocumentUpload />}
                {type == "URL" && <UrlUpload />}
                {/* <div className="bottomBtn">
                    <button className="btn btnPrev" variant="outlined" sx={{ marginRight: 2 }} onClick={handleKALink}> Cancel </button>
                    {type === "Documents" && <button className="btn btnSave" variant="contained" >Add file</button>}
                </div> */}
            </div>
        </>
    )
};

export default FileExplorer;
