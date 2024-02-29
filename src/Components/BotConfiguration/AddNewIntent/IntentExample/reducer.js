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
} from "./actions";

const initialState = {
  isPopupVisible: false,
  items: [],
  intentEntities: [],
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
        items: [...state.items, action.payload],
        isPopupVisible: false,
      };
    case DELETE_ITEM:
      /*    const { index, itemType } = action.payload;
      if (itemType === "entity") {
        const newEntities = [...state.intentEntities];
        newEntities.splice(index, 1);
        return { ...state, intentEntities: newEntities };
      } else if (itemType === "example") {
        const newExamples = [...state.items];
        newExamples.splice(index, 1);
        return { ...state, items: newExamples };
      } */
      return {
        ...state,
        items: state.items.filter((_, index) => index !== action.payload),
      };
    case ADD_INTENT_ENTITY:
      return {
        ...state,
        intentEntities: [...state.intentEntities, action.payload],
      };
    case REMOVE_INTENT_ENTITY:
      /*   const newIntentEntites = state.intentEntities.filter(
        (item, index) => item !== action.payload
      ); */
      return {
        ...state,
        intentEntities: state.intentEntities.filter(
          (intentEntity) => intentEntity.id != action.payload
        ),
      };
    case CLEAR_LIST:
      return {
        ...state,
        items: [],
        intentEntities: [],
      };
    default:
      return state;
  }
};

export default reducer;
