import {
  SHOW_POPUP,
  HIDE_POPUP,
  ADD_NEW_ITEM,
  DELETE_ITEM,
  SHOW_DEL_POPUP,
  HIDE_DEL_POPUP,
} from "./actions";

const initialState = {
  isPopupVisible: false,
  items: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_POPUP:
      return { ...state, isPopupVisible: true };
    case SHOW_DEL_POPUP:
      return { ...state, isDelPopupVisible: true };
    case HIDE_POPUP:
      return { ...state, isPopupVisible: false };
    case HIDE_DEL_POPUP:
      return { ...state, isDelPopupVisible: false };
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
