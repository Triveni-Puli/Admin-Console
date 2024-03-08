import {
  SHOW_POPUP,
  HIDE_POPUP,
  ADD_NEW_ITEM,
  DELETE_ITEM,
  SHOW_DEL_POPUP,
  HIDE_DEL_POPUP,
  ADD_INTENT_ENTITY,
  REMOVE_INTENT_ENTITY,
  CLEAR_LIST,
  SHOW_ADD_INTENT_PAGE_UI,
  SHOW_EDIT_INTENT_PAGE_UI,
  SHOW_VIEW_INTENT_PAGE_UI,
  SHOW_VIEW_INTENT_DETAILS,
} from "./BotConfigActions";

const initialState = {
  showAddIntentUI: false,
  showEditIntentUI: false,
  isPopupVisible: false,
  items: [],
  intentEntities: [],
  intentDetails: {},
};

const botConfigreducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ADD_INTENT_PAGE_UI:
      return { ...state, showAddIntentUI: action.payload };
    case SHOW_EDIT_INTENT_PAGE_UI:
      return { ...state, showEditIntentUI: action.payload };
    case SHOW_VIEW_INTENT_PAGE_UI:
      return { ...state, showViewIntentUI: action.payload };
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
        items: [...state.items, action.payload],
        isPopupVisible: false,
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((index, i) => i !== action.payload),
      };
    case ADD_INTENT_ENTITY:
      return {
        ...state,
        intentEntities: [...state.intentEntities, action.payload],
      };
    case REMOVE_INTENT_ENTITY:
      return {
        ...state,
        intentEntities: state.intentEntities.filter(
          (index, i) => i !== action.payload
        ),
      };
    case CLEAR_LIST:
      return {
        ...state,
        items: [],
        intentEntities: [],
      };
    case SHOW_VIEW_INTENT_DETAILS:
      return {
        ...state,
        intentDetails: Object.assign(state.intentDetails, action.payload),
      };
    default:
      return state;
  }
};

export default botConfigreducer;
