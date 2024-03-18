export const SHOW_POPUP = "SHOW_POPUP";

export const HIDE_POPUP = "HIDE_POPUP";

export const ADD_NEW_ITEM = "ADD_NEW_ITEM";

export const DELETE_ITEM = "DELETE_ITEM";
export const DELETE_EXAMPLE_EDIT = "DELETE_EXAMPLE_EDIT";
export const SHOW_DEL_POPUP = "SHOW_DEL_POPUP";
export const HIDE_DEL_POPUP = "HIDE_DEL_POPUP";

export const ADD_INTENT_ENTITY = "ADD_INTENT_ENTITY";
export const ADD_INTENT_ENTITY_EDIT = "ADD_INTENT_ENTITY_EDIT";
export const ADD_INTENT_EXAMPLE_EDIT = "ADD_INTENT_EXAMPLE_EDIT";
export const REMOVE_INTENT_ENTITY_EDIT = "REMOVE_INTENT_ENTITY_EDIT";
export const REMOVE_INTENT_ENTITY = "REMOVE_INTENT_ENTITY";
export const SHOW_ADD_INTENT_PAGE_UI = "SHOW_ADD_INTENT_PAGE_UI";
export const SHOW_EDIT_INTENT_PAGE_UI = "SHOW_EDIT_INTENT_PAGE_UI";
export const SHOW_VIEW_INTENT_PAGE_UI = "SHOW_VIEW_INTENT_PAGE_UI";
export const SHOW_VIEW_INTENT_DETAILS = "SHOW_VIEW_INTENT_DETAILS";
export const UPDATE_INTENT_ENTITIES = "UPDATE_INTENT_ENTITIES";
export const UPDATE_INTENT_EXAMPLES = "UPDATE_INTENT_EXAMPLES";
export const CLEAR_LIST = "CLEAR_LIST";

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

export const addIntentEntityEdit = (obj) => ({
  type: ADD_INTENT_ENTITY_EDIT,
  payload: obj,
});

export const addNewExampleEdit = (text) => ({
  type: ADD_INTENT_EXAMPLE_EDIT,
  payload: text,
});

export const removeIntentEntity = (index) => ({
  type: REMOVE_INTENT_ENTITY,
  payload: index,
});

export const removeIntentEntityEdit = (index) => ({
  type: REMOVE_INTENT_ENTITY_EDIT,
  payload: index,
});

export const removeIntentExampleEdit = (index) => ({
  type: DELETE_EXAMPLE_EDIT,
  payload: index,
});

export const showPopup = () => ({ type: SHOW_POPUP });

export const hidePopup = () => ({ type: HIDE_POPUP });

export const addNewItem = (text) => ({ type: ADD_NEW_ITEM, payload: text });

export const deleteItem = (index) => ({ type: DELETE_ITEM, payload: index });

export const showDelPopup = () => ({ type: SHOW_DEL_POPUP });
export const hideDelPopup = () => ({ type: HIDE_DEL_POPUP });

export const setEditIntentEntities = () => {
  return {
    type: UPDATE_INTENT_ENTITIES,
  };
};

export const setEditIntentExamples = () => {
  return {
    type: UPDATE_INTENT_EXAMPLES,
  };
};
