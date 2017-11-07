/**
 * cache native fetch
 */
const fetch = window.fetch;

/**
 * response list
 */
const responseList: Array<Response> = [];

window.fetch = (): Promise<any> => {
  let response = responseList.shift();

  if (!response) {
    return Promise.reject('mush call mockFetch() first.');
  }

  return Promise.resolve(response);
};

/**
 * mock window.fetch
 */
export function mockFetch(mockData: any): void {
  let response = new Response(JSON.stringify(mockData));
  responseList.push(response);
};

/**
 * reset window.fetch
 */
function resetFetch(): void {
  window.fetch = fetch;
}
