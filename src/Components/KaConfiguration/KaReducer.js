const initialState = {
    showCreateUI: false,
    showEditUI: false,
    showFileExplorerUI:false,
    collectionNameForFile:'',
    formValues: {},
    collectionDetails:{}
  };
const KaReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_CREATE_PAGE_UI":
            return { ...state, showCreateUI: action.payload };
        case "SHOW_EDIT_PAGE_UI":
            return { ...state, showEditUI: action.payload };
        case "SHOW_FILE_EXPLORER_PAGE_UI":
            return { ...state, showFileExplorerUI: action.payload };
        case "SET_COLLECTION_NAME_FOR_FILE":
            return {...state, collectionNameForFile: action.payload};
        case "SET_FIELD_VALUE":
            const fieldObj = {
                [action.payload.field]: action.payload.value
            }
            return {
                ...state,
                formValues: Object.assign(state.formValues, fieldObj),
                };
        case "SET_COLLECTION_DETAILS":
            return {
                ...state,
                collectionDetails: Object.assign(state.collectionDetails, action.payload),
                };
        case "SET_FORM_VALUES":
            return {
                ...state,
                formValues: Object.assign(state.formValues, action.payload),
              };
        default:
            return state;
    }
};
export default KaReducer;