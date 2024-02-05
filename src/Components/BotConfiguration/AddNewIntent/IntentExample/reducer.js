import { SHOW_POPUP, HIDE_POPUP, ADD_NEW_ITEM, DELETE_ITEM } from "./actions";

const initialState = {
  isPopupVisible: false,
  items: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_POPUP:
      return { ...state, isPopupVisible: true };
    case HIDE_POPUP:
      return { ...state, isPopupVisible: false };
    case ADD_NEW_ITEM:
      return {
        ...state,
        items: [...state.items, { text: action.payload }],
        isPopupVisible: false,
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((_, index) => index !== action.payload),
      };

    default:
      return state;
  }
};

export default reducer;
