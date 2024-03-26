import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectComponent from "../../Common/Select";
import { showFileExplorerPageUI, setFieldValue, setFormValues } from "../KaActions";
import DocumentUpload from "./DocumentUpload";
import UrlUpload from "./UrlUpload";

const FileExplorer = () => {
    const dispatch = useDispatch();
    const collectionName = useSelector((state) => state.KnowlegdeAgent.collectionNameForFile);
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
                <span className="kaTopText"><a href="" style={{ textDecoration: "none" }} onClick={handleKALink}>K A Collections</a> {"> " + collectionName}  </span>
                <div className="heading">File Explorer Options</div>
                <hr className="line" />
                <div className="items">
                    <label className="inputLabel">Existing Collections</label>
                    <SelectComponent list={["Documents", "URL"]} handleChange={handleCollectionChange} value={type} />
                </div>
                {type == "Documents" && <DocumentUpload />}
                {type == "URL" && <UrlUpload />}
            </div>
        </>
    )
};

export default FileExplorer;
