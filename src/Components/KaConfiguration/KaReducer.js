const initialState = {
    showCreateUI: false,
    formValues: {}
  };
const KaReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_CREATE_PAGE_UI":
            return { ...state, showCreateUI: action.payload };
        case "SET_FORM_VALUES":
            const fieldObj = {
                [action.payload.field]: action.payload.value
            }
            return {
                ...state,
                formValues: Object.assign(state.formValues, fieldObj),
              };
        default:
            return state;
    }
};
export default KaReducer;