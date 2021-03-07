export type Provider = { id: string; name: string };

export function loadProviders() {
  return new Promise<Provider[]>((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', name: 'Provider 1' },
        { id: '2', name: 'Provider 2' },
      ]);
    }, 1500);
  });
}
