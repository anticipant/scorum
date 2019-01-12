import { combineReducers } from 'redux';
import listReducer from './list';
import pageReducer from './page';

const rootReducer = combineReducers({
  // названия свойств сделать более релавантными
  breedsList: listReducer,
  breedPage: pageReducer,
});

export default rootReducer;
