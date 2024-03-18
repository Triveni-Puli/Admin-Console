import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from "@mui/x-data-grid";

function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;
    return <GridToolbarContainer></GridToolbarContainer>;
}

export default function KAReportGrid(props) {
    const dataRows = props.rows;
    const [rows, setRows] = useState(dataRows);
    const [rowModesModel, setRowModesModel] = useState({});

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleDeleteClick = async (item) => {
        props.onDelete(item);
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        console.log(newRowModesModel);
        setRowModesModel(newRowModesModel);
    };

    let columns = [
        {
        field: "id",
        headerName: "ID",
        headerClassName: "mui-custom-header",
        type: "string",
        width: 320,
        align: "left",
        headerAlign: "left",
        // editable: true,
    }, {
        field: "collection_name",
        headerName: "Name",
        headerClassName: "mui-custom-header",
        type: "string",
        width: 150,
        align: "left",
        headerAlign: "left",
    },
    {
        field: "total_cost($)",
        headerName: "Total Cost($)",
        headerClassName: "mui-custom-header",
        type: "string",
        width: 200,
        align: "left",
        headerAlign: "left",
    },
    {
        field: "query",
        headerName: "Query",
        headerClassName: "mui-custom-header",
        type: "number",
        width: 320,
        align: "left",
        headerAlign: "left",
    },
    {
        field: "response",
        headerName: "Response",
        headerClassName: "mui-custom-header",
        type: "number",
        width: 320,
        align: "left",
        headerAlign: "left",
    },
    {
        field: "timestamp",
        headerName: "Creation Date & Time",
        headerClassName: "mui-custom-header",
        type: "number",
        width: 250,
        align: "left",
        headerAlign: "left",
    },
    ]

    return (
        <Box
            sx={{
                height: 500,
                width: "100%",
                "& .actions": {
                    color: "text.secondary",
                },
                "& .textPrimary": {
                    color: "text.primary",
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#D6D6D6",
                },
            }}>
            <DataGrid
                sx={{
                    borderRadius: "20px",
                }}
                getRowId={(row) => row.id}
                rows={dataRows}
                columns={columns}
                rowsPerPageOptions={[]}
                hideFooterPagination
                checkboxSelection
            />
        </Box>
    );
}

KAReportGrid.defaultProps = {
   
}
