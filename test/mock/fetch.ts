const fetch = window.fetch;

/**
 * mock window.fetch
 */
export function mockFetch(responseData: any): void {
  let response = new Response(JSON.stringify(responseData));

  window.fetch = () => Promise.resolve(response);
};

/**
 * reset window.fetch
 */
export function resetFetch(): void {
  window.fetch = fetch;
}
