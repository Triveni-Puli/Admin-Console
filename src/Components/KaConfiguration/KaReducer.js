const initialState = {
    showCreateUI: false,
    showEditUI: false,
    formValues: {},
    collectionDetails:{}
  };
const KaReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_CREATE_PAGE_UI":
            return { ...state, showCreateUI: action.payload };
        case "SHOW_EDIT_PAGE_UI":
            return { ...state, showEditUI: action.payload };
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
            const formObj = {
                [action.payload.field]: action.payload.value
            }
            return {
                ...state,
                formValues: Object.assign(state.formValues, formObj),
              };
        default:
            return state;
    }
};
export default KaReducer;