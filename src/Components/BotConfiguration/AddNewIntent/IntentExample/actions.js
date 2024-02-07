export const SHOW_POPUP = "SHOW_POPUP";

export const HIDE_POPUP = "HIDE_POPUP";

export const ADD_NEW_ITEM = "ADD_NEW_ITEM";

export const DELETE_ITEM = "DELETE_ITEM";
export const SHOW_DEL_POPUP = "SHOW_DEL_POPUP";
export const HIDE_DEL_POPUP = "HIDE_DEL_POPUP";

export const showPopup = () => ({ type: SHOW_POPUP });

export const hidePopup = () => ({ type: HIDE_POPUP });

export const addNewItem = (text) => ({ type: ADD_NEW_ITEM, payload: text });

export const deleteItem = (index) => ({ type: DELETE_ITEM, payload: index });

export const showDelPopup = () => ({ type: SHOW_DEL_POPUP });
export const hideDelPopup = () => ({ type: HIDE_DEL_POPUP });