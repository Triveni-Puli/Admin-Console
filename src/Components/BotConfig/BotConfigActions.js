export const SHOW_POPUP = "SHOW_POPUP";

export const HIDE_POPUP = "HIDE_POPUP";

export const ADD_NEW_ITEM = "ADD_NEW_ITEM";

export const DELETE_ITEM = "DELETE_ITEM";
export const SHOW_DEL_POPUP = "SHOW_DEL_POPUP";
export const HIDE_DEL_POPUP = "HIDE_DEL_POPUP";

export const ADD_INTENT_ENTITY = "ADD_INTENT_ENTITY";
export const REMOVE_INTENT_ENTITY = "REMOVE_INTENT_ENTITY";
export const CLEAR_LIST = "CLEAR_LIST";
export const SHOW_ADD_INTENT_PAGE_UI = "SHOW_ADD_INTENT_PAGE_UI";
export const SHOW_EDIT_INTENT_PAGE_UI = "SHOW_EDIT_INTENT_PAGE_UI";
export const SHOW_VIEW_INTENT_PAGE_UI = "SHOW_VIEW_INTENT_PAGE_UI";
export const SHOW_VIEW_INTENT_DETAILS = "SHOW_VIEW_INTENT_DETAILS";

export const showAddIntentPageUI = (val) => ({
  type: SHOW_ADD_INTENT_PAGE_UI,
  payload: val,
});

export const showEditIntentPageUI = (val) => ({
  type: SHOW_EDIT_INTENT_PAGE_UI,
  payload: val,
});

export const showViewIntentPageUI = (val) => ({
  type: SHOW_VIEW_INTENT_PAGE_UI,
  payload: val,
});

export const showIntentDetails = (obj) => ({
  type: SHOW_VIEW_INTENT_DETAILS,
  payload: obj,
});

export const clearList = () => ({ type: CLEAR_LIST });

export const addIntentEntity = (obj) => ({
  type: ADD_INTENT_ENTITY,
  payload: obj,
});

export const removeIntentEntity = (index) => ({
  type: REMOVE_INTENT_ENTITY,
  payload: index,
});

export const showPopup = () => ({ type: SHOW_POPUP });

export const hidePopup = () => ({ type: HIDE_POPUP });

export const addNewItem = (text) => ({ type: ADD_NEW_ITEM, payload: text });

export const deleteItem = (index) => ({ type: DELETE_ITEM, payload: index });

export const showDelPopup = () => ({ type: SHOW_DEL_POPUP });
export const hideDelPopup = () => ({ type: HIDE_DEL_POPUP });
