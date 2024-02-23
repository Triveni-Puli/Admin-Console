export const SHOW_CREATE_PAGE_UI = "SHOW_CREATE_PAGE_UI";
export const SET_FORM_VALUES = "SET_FORM_VALUES";
export const SHOW_EDIT_PAGE_UI ="SHOW_EDIT_PAGE_UI";
export const SET_FIELD_VALUE = "SET_FIELD_VALUE";
export const SET_COLLECTION_DETAILS = "SET_COLLECTION_DETAILS";

export const showCreatePageUI = (val) => ({
    type: SHOW_CREATE_PAGE_UI,
    payload: val
})

export const showEditPageUI = (val) => ({
    type: SHOW_EDIT_PAGE_UI,
    payload: val
})
export const setFieldValue = (field, value) => ({
    type: SET_FIELD_VALUE,
    payload: {
        field : field,
        value : value
    }
})

export const setCollectionDetails = (obj) => ({
    type: SET_COLLECTION_DETAILS,
    payload: obj
})

export const setFormValues = (obj) => ({
    type: SET_FORM_VALUES,
    payload: obj
})

