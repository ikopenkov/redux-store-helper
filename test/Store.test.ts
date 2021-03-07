import { globalStore } from './TestGlobalStore';
import { ProviderStore } from './TestStore';

test('intitialization', async () => {
  let globalStoreData = globalStore.getState().$stores.providerStore;
  expect(globalStoreData).toBeFalsy;
  expect(ProviderStore.getIsLoading()).toBeFalsy();
  expect(ProviderStore.getList()).toHaveLength(0);
  expect(ProviderStore.getError()).toBeFalsy();

  const promise = ProviderStore.loadList();

  globalStoreData = globalStore.getState().$stores.providerStore;
  expect(globalStoreData).toMatchObject({
    isLoading: true,
  });
  expect(ProviderStore.getIsLoading()).toBeTruthy();

  await promise;

  globalStoreData = globalStore.getState().$stores.providerStore;
  expect(globalStoreData).toMatchObject({
    isLoading: false,
  });
  expect(globalStoreData.list).toHaveLength(2);
  expect(ProviderStore.getList()).toHaveLength(2);
  expect(ProviderStore.getIsLoading()).toBeFalsy();
  expect(ProviderStore.getError()).toBeFalsy();
});
