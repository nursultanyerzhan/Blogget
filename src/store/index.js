import {createStore, combineReducers} from 'redux';
import {composeWithDevTools} from '@redux-devtools/extension';
import {tokenReducer} from './tokenReducer';
import {commentReducer} from './commentReducer';

const rootReducer = combineReducers({
  tokenReducer,
  commentReducer
});

export const store = createStore(rootReducer, composeWithDevTools());
