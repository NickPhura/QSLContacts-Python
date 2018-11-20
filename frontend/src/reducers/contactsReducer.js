import {
  SET_FILTER_TEXT,
  RESET_FILTER_TEXT,
  UPDATE_CONTACTS
} from '../constants/ActionTypes';

const initialState = {
  contacts: [],
  filterText: ''
};

/**
 * Reducer for the contacts list.
 * @param {*} [state=initialState]
 * @param {*} action
 * @returns a new state object with possible changes, or the original state if no changes were applied.
 */
const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER_TEXT:
      return {
        ...state,
        filterText: action.filterText
      };
    case RESET_FILTER_TEXT:
      return {
        ...state,
        filterText: ''
      };
    case UPDATE_CONTACTS:
      console.log(action.contacts);
      return {
        ...state,
        contacts: action.contacts.map(item => JSON.parse(item))
      };
    default:
      return state;
  }
};
export default contactsReducer;
