import {
  STORE_HELPER_REDUCER_NAME,
  storeHelperReducer,
} from './TestStoreHelperInitiator';
import { setGlobalStore } from '../src/index';
import { ProviderStoreInterface } from './TestStore';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

type StoreHelperState = ProviderStoreInterface;

const rootReducer = combineReducers({
  // store helper
  [STORE_HELPER_REDUCER_NAME]: storeHelperReducer as () => StoreHelperState,
});

export const globalStore = createStore(rootReducer, applyMiddleware(thunk));

setGlobalStore(globalStore);

export type AppDispatch = typeof globalStore.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
