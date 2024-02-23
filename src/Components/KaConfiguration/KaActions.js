export const SHOW_CREATE_PAGE_UI = "SHOW_CREATE_PAGE_UI";
export const SET_FORM_VALUES = "SET_FORM_VALUES";
export const SHOW_EDIT_PAGE_UI ="SHOW_EDIT_PAGE_UI";

export const showCreatePageUI = (val) => ({
    type: SHOW_CREATE_PAGE_UI,
    payload: val
})

export const showEditPageUI = (val) => ({
    type: SHOW_EDIT_PAGE_UI,
    payload: val
})

export const setFormValues = (field, value) => ({
    type: SET_FORM_VALUES,
    payload: {
        field : field,
        value : value
    }
})