import { Provider, loadProviders } from './TestApi';
import { createStore } from './TestStoreHelperInitiator';

const INITIAL_STATE = {
  isLoading: false,
  error: undefined as Error | undefined,
  list: [] as Provider[],
};

type ProviderStoreState = typeof INITIAL_STATE;
export interface ProviderStoreInterface {
  providerStore: ProviderStoreState;
}

const store = createStore('providerStore', INITIAL_STATE);

async function loadList() {
  store.setState({ isLoading: true });
  try {
    store.setState({ list: await loadProviders() });
  } catch (error) {
    store.setState({ error: error });
    throw error;
  } finally {
    store.setState({ isLoading: false });
  }
}

export const ProviderStore = {
  loadList,
  getState: () => store.state,
  getList() {
    return store.state.list;
  },
  getError() {
    return store.state.error;
  },
  getIsLoading() {
    return store.state.isLoading;
  },
};
