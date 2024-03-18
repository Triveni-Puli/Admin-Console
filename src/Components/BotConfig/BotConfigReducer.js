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
  UPDATE_INTENT_ENTITIES,
  UPDATE_INTENT_EXAMPLES,
  REMOVE_INTENT_ENTITY_EDIT,
  DELETE_EXAMPLE_EDIT,
  ADD_INTENT_ENTITY_EDIT,
  ADD_INTENT_EXAMPLE_EDIT,
} from "./BotConfigActions";

const initialState = {
  showAddIntentUI: false,
  showEditIntentUI: false,
  isPopupVisible: false,
  intentExamples: [],
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
        intentExamples: [...state.intentExamples, action.payload],
        isPopupVisible: false,
      };
    case DELETE_ITEM:
      return {
        ...state,
        intentExamples: state.intentExamples.filter(
          (index, i) => i !== action.payload
        ),
      };
    case DELETE_EXAMPLE_EDIT:
      const updatedIntentExample = state.intentExamples.filter(
        (index, i) => i !== action.payload
      );
      const updatedIntentData = {
        ...state.intentDetails,
        examples: state.intentDetails.examples.filter(
          (index, i) => i !== action.payload
        ),
      };
      return {
        ...state,
        intentEntities: updatedIntentExample,
        intentDetails: updatedIntentData,
      };
    case ADD_INTENT_ENTITY:
      return {
        ...state.intentDetails,
        intentEntities: [...state.intentEntities, action.payload],
      };
    case ADD_INTENT_ENTITY_EDIT:
      const addedIntentEntity = action.payload;
      const updatedEntities = [
        ...state.intentDetails.entities,
        addedIntentEntity,
      ];
      const intentDetailsAfterAddEntity = {
        ...state.intentDetails,
        entities: updatedEntities,
      };
      return {
        ...state,
        intentDetails: intentDetailsAfterAddEntity,
      };

    case ADD_INTENT_EXAMPLE_EDIT:
      const addedIntentExample = action.payload;
      const updatedExamples = [
        ...state.intentDetails.examples,
        addedIntentExample,
      ];
      const intentDetailsAfterAddExample = {
        ...state.intentDetails,
        examples: updatedExamples,
      };
      return {
        ...state,
        intentDetails: intentDetailsAfterAddExample,
      };

    case REMOVE_INTENT_ENTITY:
      return {
        ...state,
        intentEntities: state.intentEntities.filter(
          (index, i) => i !== action.payload
        ),
      };
    case REMOVE_INTENT_ENTITY_EDIT:
      const updatedIntentEntites = state.intentEntities.filter(
        (index, i) => i !== action.payload
      );
      const updatedIntentDetails = {
        ...state.intentDetails,
        entities: state.intentDetails.entities.filter(
          (index, i) => i !== action.payload
        ),
      };
      return {
        ...state,
        intentEntities: updatedIntentEntites,
        intentDetails: updatedIntentDetails,
      };

    case CLEAR_LIST:
      return {
        ...state,
        intentExamples: [],
        intentEntities: [],
      };
    case SHOW_VIEW_INTENT_DETAILS:
      return {
        ...state,
        intentDetails: Object.assign(state.intentDetails, action.payload),
      };

    case UPDATE_INTENT_ENTITIES:
      return {
        ...state,
        intentEntities: [...state.intentDetails.entities],
      };
    case UPDATE_INTENT_EXAMPLES:
      return {
        ...state,
        intentExamples: [...state.intentDetails.examples],
      };
    default:
      return state;
  }
};

export default botConfigreducer;
