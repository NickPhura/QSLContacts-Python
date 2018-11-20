import { combineReducers } from 'redux';
import contactsReducer from './contactsReducer';
import loadMoreReducer from './loadMoreReducer';

const rootReducer = combineReducers({
  contactsReducer,
  loadMoreReducer
});

export default rootReducer;
