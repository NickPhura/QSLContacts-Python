import {
  INCREASE_DISPLAY_LIMIT,
  RESET_DISPLAY_LIMIT
} from '../constants/ActionTypes';

const initialState = {
  increment: 10,
  displayLimit: 20
};

/**
 * Reducer for the load more button.
 * @param {*} [state=initialState]
 * @param {*} action
 * @returns a new state object with possible changes, or the original state if no changes were applied.
 */
const loadMoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE_DISPLAY_LIMIT:
      return {
        ...state,
        displayLimit: state.displayLimit + state.increment
      };
    case RESET_DISPLAY_LIMIT:
      return {
        ...state,
        displayLimit: 20
      };
    default:
      return state;
  }
};
export default loadMoreReducer;
