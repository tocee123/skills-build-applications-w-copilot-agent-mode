const apiBase = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

export { apiBase };

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    const candidates = [
      payload.results,
      payload.items,
      payload.data,
      payload.data?.results,
      payload.data?.items,
      payload.data?.data,
    ];
    const collection = candidates.find(Array.isArray);

    if (collection) {
      return collection;
    }
  }

  throw new Error('Expected an array or paginated collection response.');
}
