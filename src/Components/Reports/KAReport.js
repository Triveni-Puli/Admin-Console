import React, { useEffect, useState } from "react";
import axios from 'axios';
import KAReportGrid from "./KAReportGrid";

const KAReport = () => {
    const [reportRows, setReportRows] = useState([]);

    useEffect(() => {
        axios.get("https://ikjmsct2glzxax3wdpgdo63swa0vqtnu.lambda-url.ap-south-1.on.aws/", {
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            setReportRows(response.data);
            //   console.log("response", response.data);
        }).catch(err => {
            console.log("err", err);
        });
    }, []);
    return (
        <>
            <KAReportGrid rows={reportRows} />
        </>
    )
};

export default KAReport;
