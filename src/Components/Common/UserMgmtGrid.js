import * as React from "react";
import Box from "@mui/material/Box";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  return <GridToolbarContainer></GridToolbarContainer>;
}

export default function CustomUserManagementGrid(props) {
  const dataRows = props.rows;
  const [rows, setRows] = React.useState(dataRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "collection_name",
      headerName: "Name",
      width: 200,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      type: "dropdown",
      width: 150,
      editable: true,
    },
    { field: "date_added", headerName: "Date Added", width: 140 },
    { field: "last_active", headerName: "Last Active", width: 140 },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        return [
          ,
          /*  <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="View"
            onClick=""
            // color="inherit"
          /> */ <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

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
      }}>
      <DataGrid
        getRowId={(row) => row.collection_name}
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[]}
        hideFooterPagination
        checkboxSelection
      />
    </Box>
  );
}