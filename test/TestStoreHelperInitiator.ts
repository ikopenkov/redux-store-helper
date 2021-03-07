import { getStoreHelper } from '../src/index';

const STORE_HELPER_REDUCER_NAME = '$stores';

const { createStore, storeHelperReducer } = getStoreHelper({
  actionPrefix: '$STORES',
  reducerName: STORE_HELPER_REDUCER_NAME,
});

export { createStore, storeHelperReducer, STORE_HELPER_REDUCER_NAME };
