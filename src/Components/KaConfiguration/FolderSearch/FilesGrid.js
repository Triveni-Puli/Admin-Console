//import * as React from "react";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { createSvgIcon } from "@mui/material/utils";
import documentIcon from "../../../assets/documentIcon.svg"

function EditToolbar(props) {
    // const { setRows, setRowModesModel } = props;
    return <GridToolbarContainer></GridToolbarContainer>;
}

export default function FilesGrid(props) {
    const dataRows = props.rows;
    // const gridGetRowId = (row) => row.file_name;
    // const gridGetRowId = props.getRowId || defaultGetRowId;
    // const [rows, setRows] = useState(dataRows);
    const [rowModesModel, setRowModesModel] = useState({});
    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
    /* Checkbox Selection  to delete the records */
     const [selectedRowIds,setSelectedRowIds]=useState([]);

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleDeleteClick = async (item) => {
        props.onDelete(item.id);
    };

    const handleGroupSelection = async (items) => {
        props.onGroupSelection(items);
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const DocumentIcon = createSvgIcon(
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 14.0163C20.9544 13.0244 20.2766 13 19.3571 13C17.9407 13 17.7059 13.3384 17.7059 14.6667V16.3333C17.7059 17.6616 17.9407 18 19.3571 18C20.2766 18 20.9544 17.9756 21 16.9837M10.2949 15.5C10.2949 16.8807 9.18876 18 7.82429 18C7.51642 18 7.36248 18 7.24782 17.933C6.9733 17.7726 7.00076 17.448 7.00076 17.1667V13.8333C7.00076 13.552 6.9733 13.2274 7.24782 13.067C7.36248 13 7.51642 13 7.82429 13C9.18876 13 10.2949 14.1193 10.2949 15.5ZM14 18C13.2236 18 12.8354 18 12.5941 17.7559C12.3529 17.5118 12.3529 17.119 12.3529 16.3333V14.6667C12.3529 13.881 12.3529 13.4882 12.5941 13.2441C12.8354 13 13.2236 13 14 13C14.7764 13 15.1646 13 15.4059 13.2441C15.6471 13.4882 15.6471 13.881 15.6471 14.6667V16.3333C15.6471 17.119 15.6471 17.5118 15.4059 17.7559C15.1646 18 14.7764 18 14 18Z" stroke="#373737" stroke-width="1.5" stroke-linecap="round" />
            <path d="M15 22H10.7273C7.46607 22 5.83546 22 4.70307 21.2022C4.37862 20.9736 4.09058 20.7025 3.8477 20.3971C3 19.3313 3 17.7966 3 14.7273V12.1818C3 9.21865 3 7.73706 3.46894 6.55375C4.22281 4.65142 5.81714 3.15088 7.83836 2.44135C9.09563 2 10.6698 2 13.8182 2C15.6173 2 16.5168 2 17.2352 2.2522C18.3902 2.65765 19.3012 3.5151 19.732 4.60214C20 5.27832 20 6.12494 20 7.81818V10" stroke="#373737" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M3 12C3 10.1591 4.49238 8.66667 6.33333 8.66667C6.99912 8.66667 7.78404 8.78333 8.43137 8.60988C9.00652 8.45576 9.45576 8.00652 9.60988 7.43136C9.78333 6.78404 9.66667 5.99912 9.66667 5.33333C9.66667 3.49238 11.1591 2 13 2" stroke="#373737" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>,
        "DocIcon"
    )

    const DeleteIcon = createSvgIcon(
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M11.6673 8.33333V14.1667M8.33398 8.33333V14.1667M5.00065 5V14.8333C5.00065 15.7668 5.00065 16.2331 5.18231 16.5897C5.3421 16.9033 5.59688 17.1587 5.91048 17.3185C6.26665 17.5 6.73315 17.5 7.66474 17.5H12.3366C13.2682 17.5 13.734 17.5 14.0901 17.3185C14.4037 17.1587 14.6594 16.9033 14.8192 16.5897C15.0007 16.2335 15.0007 15.7675 15.0007 14.8359V5M5.00065 5H6.66732M5.00065 5H3.33398M6.66732 5H13.334M6.66732 5C6.66732 4.22343 6.66732 3.83534 6.79418 3.52905C6.96334 3.12067 7.28758 2.79602 7.69596 2.62687C8.00225 2.5 8.39075 2.5 9.16732 2.5H10.834C11.6106 2.5 11.9988 2.5 12.3051 2.62687C12.7135 2.79602 13.0379 3.12067 13.207 3.52905C13.3339 3.83534 13.334 4.22343 13.334 5M13.334 5H15.0007M15.0007 5H16.6673"
                stroke="#C3325F"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>,
        "Delete"
    );

    let docColumns = [
        props.isDocument && {
            renderCell: () => (
                <img src={documentIcon}></img>
            ),
            width: 50,
        },
        props.isDocument && {
            field: "file_name",
            headerName: "Document Name",
            renderCell: (params) => (
                <span style={{ fontWeight: 500 }}>{params.value}</span>
            ),
            headerClassName: "mui-custom-header",
            width: 270,
            editable: true,
        },]

    let urlColumns = [

        !props.isDocument && {
            field: "url",
            headerName: "URL",
            renderCell: (params) => (
                <span style={{ fontWeight: 500 }}>{params.value}</span>
            ),
            headerClassName: "mui-custom-header",
            width: 320,
            editable: true,
        }]

    let commonColumns = [
        {
        field: "timestamp",
        headerName: "Upload Date & Time",
        headerClassName: "mui-custom-header",
        type: "number",
        width: 320,
        align: "left",
        headerAlign: "left",
        // editable: true,
    },
    // {
    //     field: "254 KB",
    //     headerName: "File Size",
    //     headerClassName: "mui-custom-header",
    //     type: "number",
    //     width: 320,
    //     align: "left",
    //     headerAlign: "left",
    //     // editable: true,
    // },

    {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        headerClassName: "mui-custom-header",
        width: 150,
        align: "left",
        headerAlign: "left",
        cellClassName: "actions",
        getActions: ({ id, field }) => {
            // const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
            return [
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => handleDeleteClick({ id })}
                    color="inherit"
                />,
            ];
        },
    },];

    let columns = props.isDocument ? docColumns.concat(commonColumns) : urlColumns.concat(commonColumns);
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
                getRowId={(row) => row.file_name ? row.file_name : row.url}
                rows={dataRows}
                columns={columns}
                rowsPerPageOptions={[]}
                hideFooterPagination
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    handleGroupSelection(newRowSelectionModel);
                    setRowSelectionModel(newRowSelectionModel);
                  }}
                  rowSelectionModel={rowSelectionModel}
                checkboxSelection
            />
        </Box>
    );
}

FilesGrid.defaultProps = {
    onEdit: () => { },
    onDelete: () => { },
    onFileSearch: () => { },
    onView: () => { },
    isDocument: false
}
