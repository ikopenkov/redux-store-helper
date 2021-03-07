import { AnyAction, Store as ReduxStore } from 'redux';
type StringMap = Record<string, any>;

let globalStore: AnyStore;
export function setGlobalStore(store: AnyStore) {
  globalStore = store;
}

interface Action {
  type: string;
  payload: {
    moduleName: string;
    moduleState: any;
  };
}

const createReducer = <StoreGeneric extends StringMap>(
  actionPrefix: string
) => {
  return (state: StoreGeneric, action: Action) => {
    const resultState = { ...(state || {}) } as StoreGeneric;

    if (action && action.type.indexOf(actionPrefix) === 0) {
      const {
        payload: { moduleName, moduleState },
      } = action;

      resultState[moduleName as keyof StoreGeneric] = { ...moduleState };
    }

    return resultState;
  };
};

interface ConstructorParams<StoreGeneric extends StringMap>
  extends HelperCreatorParams {
  name: string;
  initialState: StoreGeneric;
}

class Store<StoreGeneric extends StringMap> {
  private _moduleName: string;
  private _initialState: StoreGeneric;
  private _reducerName: string;
  private _actionPrefix: string;

  constructor({
    name,
    initialState,
    reducerName,
    actionPrefix,
  }: ConstructorParams<StoreGeneric>) {
    this._moduleName = name;
    this._initialState = initialState;
    this._reducerName = reducerName;
    this._actionPrefix = actionPrefix;
  }

  setState(state: Partial<StoreGeneric>) {
    globalStore.dispatch({
      type: `${this._actionPrefix}_${this._moduleName}`,
      payload: {
        moduleName: this._moduleName,
        moduleState: { ...this.state, ...state },
      },
    });
  }

  get state(): StoreGeneric {
    const currentState =
      globalStore.getState()[this._reducerName]?.[this._moduleName] || {};
    return { ...this._initialState, ...currentState };
  }
}

type AnyStore = ReduxStore<any, AnyAction>;
interface HelperCreatorParams {
  actionPrefix: string;
  reducerName: string;
}

export const getStoreHelper = ({
  actionPrefix,
  reducerName,
}: HelperCreatorParams) => ({
  createStore<StoreGeneric>(name: string, initialState: StoreGeneric) {
    return new Store({ name, initialState, reducerName, actionPrefix });
  },

  storeHelperReducer: createReducer(actionPrefix),
});
