const initialState = {
    showLoader: false,
  };
const loaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_LOADER":
            return { ...state, showLoader: action.payload };
        default:
            return state;
    }
};
export default loaderReducer;