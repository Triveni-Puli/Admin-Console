//import * as React from "react";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { createSvgIcon } from "@mui/material/utils";
// import edit from "../../assets/edit.svg";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  return <GridToolbarContainer></GridToolbarContainer>;
}

export default function CustomGrid(props) {
  const dataRows = props.rows;
  const dataIdentifier = props.dataIdentifier;

  const defaultGetRowId = (row) => row.collection_name;
  const gridGetRowId = props.getRowId || defaultGetRowId;
  const [rows, setRows] = React.useState(dataRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  /* Checkbox Selection  to delete the records */
  /* const [selectedRowIds,setSelectedRowIds]=useState([]);*/

  // const handleSelectionChange = (selection) => {
  //   props.onSelectionModelChange(selection);
  // };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  // const handleEditClick = (id) => () => {
  //   setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  // };
  const handleViewClick = (id) => {
    props.onView(id);
  };

  const handleEditClick = (id) => {
    props.onEdit(id);
  };

  const handleFolderSearch =(id) =>{
    props.onFileSearch(id);
  }

  /*   const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  }; */

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

  const VisibilityIcon = createSvgIcon(
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 9C11.206 9.00524 10.4459 9.32299 9.88447 9.88447C9.32299 10.4459 9.00524 11.206 9 12C9 13.642 10.358 15 12 15C13.641 15 15 13.642 15 12C15 10.359 13.641 9 12 9Z"
        fill="#323232"
      />
      <path
        d="M11.9993 5C4.36631 5 2.07231 11.617 2.05131 11.684L1.94531 12L2.05031 12.316C2.07231 12.383 4.36631 19 11.9993 19C19.6323 19 21.9263 12.383 21.9473 12.316L22.0533 12L21.9483 11.684C21.9263 11.617 19.6323 5 11.9993 5ZM11.9993 17C6.64831 17 4.57531 13.154 4.07331 12C4.57731 10.842 6.65131 7 11.9993 7C17.3503 7 19.4233 10.846 19.9253 12C19.4213 13.158 17.3473 17 11.9993 17Z"
        fill="#323232"
      />
    </svg>,
    "Plus"
  );

  const EditIcon = createSvgIcon(
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.18404 3.43597L5.63803 4.32698L5.63803 4.32698L5.18404 3.43597ZM3.43597 5.18404L2.54497 4.73005L2.54497 4.73005L3.43597 5.18404ZM18.816 20.564L19.27 21.455L18.816 20.564ZM20.564 18.816L19.673 18.362V18.362L20.564 18.816ZM5.18404 20.564L5.63803 19.673H5.63803L5.18404 20.564ZM3.43597 18.816L4.32698 18.362L3.43597 18.816ZM22 12C22 11.4477 21.5523 11 21 11C20.4477 11 20 11.4477 20 12H22ZM12 4C12.5523 4 13 3.55228 13 3C13 2.44772 12.5523 2 12 2V4ZM12.2532 10.4966L13.2019 10.8128L13.2019 10.8128L12.2532 10.4966ZM12.716 9.10821L11.7673 8.79198L11.7673 8.79198L12.716 9.10821ZM13.1935 8.33555L13.9007 9.04266L13.9007 9.04266L13.1935 8.33555ZM17.8054 3.72371L17.0983 3.0166L17.0983 3.0166L17.8054 3.72371ZM20.2763 6.19461L20.9834 6.90172V6.90172L20.2763 6.19461ZM15.6644 10.8065L14.9573 10.0993L14.9573 10.0993L15.6644 10.8065ZM14.8918 11.284L15.208 12.2327H15.208L14.8918 11.284ZM13.5034 11.7468L13.8196 12.6955L13.8196 12.6955L13.5034 11.7468ZM15.4112 11.0429L16.0134 11.8412H16.0134L15.4112 11.0429ZM15.2165 11.1632L14.7718 10.2675L14.7718 10.2675L15.2165 11.1632ZM20.2763 3.72371L19.5692 4.43082V4.43082L20.2763 3.72371ZM20.8715 4.4106L21.7676 3.96659V3.96659L20.8715 4.4106ZM20.8715 5.50772L21.7676 5.95174V5.95174L20.8715 5.50772ZM18.4923 3.12846L18.9363 4.02448L18.9363 4.02448L18.4923 3.12846ZM19.5894 3.12846L19.1454 4.02448V4.02448L19.5894 3.12846ZM12.8368 8.78347L13.7325 9.22818L13.7325 9.22818L12.8368 8.78347ZM12.9571 8.58885L12.1588 7.98661V7.98661L12.9571 8.58885ZM12.023 11.6026L12.9649 11.2668L12.023 11.6026ZM12.3974 11.977L12.0615 12.9189L12.3974 11.977ZM9.4 22H14.6V20H9.4V22ZM2 9.4V14.6H4V9.4H2ZM9.4 2C8.2964 2 7.40855 1.99922 6.69138 2.05782C5.96253 2.11737 5.32234 2.24318 4.73005 2.54497L5.63803 4.32698C5.90138 4.19279 6.24907 4.10062 6.85424 4.05118C7.47108 4.00078 8.26339 4 9.4 4V2ZM4 9.4C4 8.26339 4.00078 7.47108 4.05118 6.85424C4.10062 6.24907 4.19279 5.90138 4.32698 5.63803L2.54497 4.73005C2.24318 5.32234 2.11737 5.96253 2.05782 6.69138C1.99922 7.40855 2 8.2964 2 9.4H4ZM4.73005 2.54497C3.78924 3.02433 3.02433 3.78924 2.54497 4.73005L4.32698 5.63803C4.6146 5.07354 5.07354 4.6146 5.63803 4.32698L4.73005 2.54497ZM14.6 22C15.7036 22 16.5914 22.0008 17.3086 21.9422C18.0375 21.8826 18.6777 21.7568 19.27 21.455L18.362 19.673C18.0986 19.8072 17.7509 19.8994 17.1458 19.9488C16.5289 19.9992 15.7366 20 14.6 20V22ZM20 14.6C20 15.7366 19.9992 16.5289 19.9488 17.1458C19.8994 17.7509 19.8072 18.0986 19.673 18.362L21.455 19.27C21.7568 18.6777 21.8826 18.0375 21.9422 17.3086C22.0008 16.5914 22 15.7036 22 14.6H20ZM19.27 21.455C20.2108 20.9757 20.9757 20.2108 21.455 19.27L19.673 18.362C19.3854 18.9265 18.9265 19.3854 18.362 19.673L19.27 21.455ZM9.4 20C8.26339 20 7.47108 19.9992 6.85424 19.9488C6.24907 19.8994 5.90138 19.8072 5.63803 19.673L4.73005 21.455C5.32234 21.7568 5.96253 21.8826 6.69138 21.9422C7.40855 22.0008 8.2964 22 9.4 22V20ZM2 14.6C2 15.7036 1.99922 16.5914 2.05782 17.3086C2.11737 18.0375 2.24318 18.6777 2.54497 19.27L4.32698 18.362C4.19279 18.0986 4.10062 17.7509 4.05118 17.1458C4.00078 16.5289 4 15.7366 4 14.6H2ZM5.63803 19.673C5.07354 19.3854 4.6146 18.9265 4.32698 18.362L2.54497 19.27C3.02433 20.2108 3.78924 20.9757 4.73005 21.455L5.63803 19.673ZM22 14.6V12H20V14.6H22ZM9.4 4H12V2H9.4V4ZM13.2019 10.8128L13.6647 9.42444L11.7673 8.79198L11.3045 10.1804L13.2019 10.8128ZM13.9007 9.04266L18.5125 4.43082L17.0983 3.0166L12.4864 7.62845L13.9007 9.04266ZM19.5692 5.48751L14.9573 10.0993L16.3716 11.5136L20.9834 6.90172L19.5692 5.48751ZM14.5756 10.3353L13.1872 10.7981L13.8196 12.6955L15.208 12.2327L14.5756 10.3353ZM14.9573 10.0993C14.8922 10.1645 14.8571 10.1994 14.83 10.2251C14.8071 10.2468 14.8038 10.2484 14.8089 10.2446L16.0134 11.8412C16.1504 11.7378 16.2674 11.6177 16.3716 11.5136L14.9573 10.0993ZM15.208 12.2327C15.3478 12.1861 15.5075 12.1352 15.6612 12.0588L14.7718 10.2675C14.7775 10.2646 14.7746 10.2668 14.7449 10.2777C14.7099 10.2904 14.663 10.3061 14.5756 10.3353L15.208 12.2327ZM14.8089 10.2446C14.7973 10.2533 14.7849 10.261 14.7718 10.2675L15.6612 12.0588C15.7851 11.9973 15.903 11.9245 16.0134 11.8412L14.8089 10.2446ZM19.5692 4.43082C19.7456 4.60721 19.8483 4.71045 19.9205 4.79135C19.9881 4.86702 19.9871 4.87802 19.9755 4.85462L21.7676 3.96659C21.5863 3.6008 21.2631 3.29633 20.9834 3.0166L19.5692 4.43082ZM20.9834 6.90172C21.2631 6.622 21.5863 6.31752 21.7676 5.95174L19.9755 5.06371C19.9871 5.04031 19.9881 5.05131 19.9205 5.12697C19.8483 5.20788 19.7456 5.31111 19.5692 5.48751L20.9834 6.90172ZM19.9755 4.85462C20.0082 4.92049 20.0082 4.99783 19.9755 5.06371L21.7676 5.95174C22.0775 5.32631 22.0775 4.59201 21.7676 3.96659L19.9755 4.85462ZM18.5125 4.43082C18.6889 4.25443 18.7921 4.15172 18.873 4.07948C18.9487 4.01192 18.9597 4.01288 18.9363 4.02448L18.0483 2.23244C17.6825 2.4137 17.378 2.73689 17.0983 3.0166L18.5125 4.43082ZM20.9834 3.0166C20.7037 2.73689 20.3992 2.4137 20.0334 2.23244L19.1454 4.02448C19.122 4.01289 19.133 4.01192 19.2087 4.07948C19.2896 4.15172 19.3928 4.25443 19.5692 4.43082L20.9834 3.0166ZM18.9363 4.02448C19.0022 3.99184 19.0795 3.99184 19.1454 4.02448L20.0334 2.23244C19.408 1.92252 18.6737 1.92252 18.0483 2.23244L18.9363 4.02448ZM13.6647 9.42444C13.6938 9.33698 13.7096 9.2901 13.7223 9.25506C13.7332 9.22535 13.7354 9.22246 13.7325 9.22818L11.9412 8.33877C11.8648 8.49251 11.8139 8.65221 11.7673 8.79198L13.6647 9.42444ZM12.4864 7.62844C12.3823 7.73263 12.2622 7.84957 12.1588 7.98661L13.7554 9.19109C13.7516 9.19618 13.7532 9.19292 13.7749 9.16996C13.8006 9.14288 13.8355 9.10785 13.9007 9.04266L12.4864 7.62844ZM13.7325 9.22818C13.739 9.21513 13.7467 9.20271 13.7554 9.19109L12.1588 7.98661C12.0755 8.09701 12.0027 8.2149 11.9412 8.33877L13.7325 9.22818ZM11.3045 10.1804C11.2102 10.4632 11.1166 10.7409 11.0623 10.9719C11.0115 11.1881 10.9439 11.5537 11.0811 11.9385L12.9649 11.2668C12.9998 11.3647 13.0008 11.4408 12.9998 11.4681C12.9989 11.4906 12.9965 11.4839 13.0093 11.4295C13.0217 11.3768 13.0424 11.3033 13.0762 11.196C13.1097 11.0894 13.1508 10.9661 13.2019 10.8128L11.3045 10.1804ZM13.1872 10.7981C13.0339 10.8492 12.9106 10.8903 12.804 10.9238C12.6967 10.9576 12.6232 10.9783 12.5705 10.9907C12.5161 11.0035 12.5094 11.0011 12.5319 11.0002C12.5592 10.9992 12.6353 11.0002 12.7332 11.0351L12.0615 12.9189C12.4463 13.0561 12.8119 12.9884 13.0281 12.9377C13.2591 12.8834 13.5368 12.7898 13.8196 12.6955L13.1872 10.7981ZM11.0811 11.9385C11.2442 12.3959 11.6041 12.7558 12.0615 12.9189L12.7332 11.0351C12.8413 11.0736 12.9264 11.1587 12.9649 11.2668L11.0811 11.9385Z"
        fill="#323232"
      />
    </svg>,
    "Edit"
  );

  const FolderSearchIcon = createSvgIcon(
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7 6.5H16.75C18.8567 6.5 19.91 6.5 20.6667 7.00559C20.9943 7.22447 21.2755 7.50572 21.4944 7.83329C22 8.58996 22 9.39331 22 11.5M12 6.5L11.3666 5.23313C10.8418 4.18358 10.3622 3.12712 9.19926 2.69101C8.6899 2.5 8.10802 2.5 6.94427 2.5C5.1278 2.5 4.21956 2.5 3.53806 2.88032C3.05227 3.15142 2.65142 3.55227 2.38032 4.03806C2 4.71956 2 5.6278 2 7.44427V10.5C2 15.214 2 17.5711 3.46447 19.0355C4.8215 20.3926 6.94493 20.4921 11 20.4994H12"
        stroke="#323232"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M22 21.5L19.8529 19.3529M19.8529 19.3529C19.9675 19.2384 20.0739 19.1158 20.1714 18.986C20.602 18.413 20.8571 17.7006 20.8571 16.9286C20.8571 15.035 19.3221 13.5 17.4286 13.5C15.535 13.5 14 15.035 14 16.9286C14 18.8221 15.535 20.3571 17.4286 20.3571C18.3753 20.3571 19.2325 19.9734 19.8529 19.3529Z"
        stroke="#323232"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );

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

  let defaultColumns;
  if (dataIdentifier === "userManagement") {
    defaultColumns = [
      {
        field: "User_Name",
        headerName: "Name",
        width: 220,
        renderCell: (params) => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: 500 }}>{params.row.User_Name}</span>
            <div style={{ fontSize: 400, color: "#8291A0", fontSize: "12px" }}>
              {params.row.Email_id}
            </div>{" "}
          </div>
        ),
      },
      {
        field: "Role Type",
        headerName: "Role",
        type: "dropdown",
        width: 180,
        editable: true,
      },
      { field: "Creation_Date", headerName: "Date Added", width: 150 },
      { field: "last_active", headerName: "Last Active", width: 150 },

      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 180,
        cellClassName: "actions",
        align: "left",
        headerAlign: "left",
        getActions: ({ id }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
          return [
            <GridActionsCellItem
              icon={<VisibilityIcon />}
              label="View"
              onClick={() => handleViewClick({ id })}
              // color="inherit"
            />,
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={""}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={() => handleDeleteClick({ id })}
              color="inherit"
            />,
          ];
        },
      },
    ];
  } else {
    defaultColumns = [
      {
        field: "collection_name",
        headerName: "Name",
        renderCell: (params) => (
          <span style={{ fontWeight: 500 }}>{params.value}</span>
        ),
        headerClassName: "mui-custom-header",
        width: 180,
        editable: true,
      },
      {
        field: "description",
        headerName: "Description",
        headerClassName: "mui-custom-header",
        type: "number",
        width: 520,
        align: "left",
        headerAlign: "left",
        // editable: true,
      },

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
          if (dataIdentifier === "KAConfig") {
            return [
              <GridActionsCellItem
                icon={<VisibilityIcon />}
                label="View"
                onClick={() => handleViewClick({ id })}
                // color="inherit"
              />,
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                onClick={() => handleEditClick({ id })}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<FolderSearchIcon />}
                label="Folder Search"
                className="textPrimary"
                onClick={() => handleFolderSearch({ id })}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => handleDeleteClick({ id })}
                color="inherit"
              />,
            ];
          } else {
            return [
              <GridActionsCellItem
                icon={<VisibilityIcon />}
                label="View"
                onClick={() => handleViewClick({ id })}
                // color="inherit"
              />,
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                onClick={() => handleEditClick({ id })}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => handleDeleteClick({ id })}
                color="inherit"
              />,
            ];
          }
        },
      },
    ];
  }

  const columns = defaultColumns.map((col) => {
    if (col.field === "collection_name" && dataIdentifier === "botConfig") {
      return { ...col, field: "intent" };
    }
    return col;
  });

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
        // getRowId={(row) => row.collection_name}
        getRowId={gridGetRowId}
        rows={dataRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        pageSizeOptions={[8]}
        // editMode="row"
        // rowModesModel={rowModesModel}
        // onRowModesModelChange={handleRowModesModelChange}
        // onRowEditStop={handleRowEditStop}
        // processRowUpdate={processRowUpdate}
        // slots={{
        //   toolbar: EditToolbar,
        // }}
        // slotProps={{
        // //   toolbar: { setRows, setRowModesModel },
        // // }}
        checkboxSelection
        // selectionModel={selectedRowIds}
        //onSelectionModelChange={(itm) => console.log(itm)}
      />
    </Box>
  );
}

CustomGrid.defaultProps = {
  onEdit: ()=>{},
  onDelete:()=>{},
  onFileSearch:()=>{},
  onView: () =>{}
}
