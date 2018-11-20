import * as types from '../constants/ActionTypes';

import { getContacts } from '../http/api';

/**
 * Store an updated list of contacts
 * @param {[]} contacts an array of contacts objects
 */
export const updateContacts = contacts => ({
  type: types.UPDATE_CONTACTS,
  contacts
});

/**
 * Sets the filter text
 * @param {string} filterText filter text string
 */
export const setFilterText = filterText => ({
  type: types.SET_FILTER_TEXT,
  filterText
});

/**
 * Filters the contacts list
 */
export const applyFilterText = () => ({ type: types.APPLY_FILTER_TEXT });

/**
 * Increase display limit
 */
export const increaseDisplayLimit = () => ({
  type: types.INCREASE_DISPLAY_LIMIT
});

/**
 * Reset display limit to default value
 */
export const resetDisplayLimit = () => ({ type: types.RESET_DISPLAY_LIMIT });

/**
 * Get Thunk function that dispatches an HTTP promise to fetch a list of contacts. Should be loaded and called like a normal action.
 * @returns a Thunk function that dispatches an http promise and resolves with the response, which could contain a an HTTP failure code.
 * @throws an Error if an exception occurs.  Does not throw an Error for HTTP failure codes.
 */
export const loadContacts = () => {
  return function(dispatch) {
    return getContacts().then(
      response => {
        dispatch(updateContacts(response));
      },
      error => {
        throw new Error(error);
      }
    );
  };
};