import { IFetchConfig, IFetchInit, fetchParamParser } from '@/store/v2/fetch'

const _map = {};

function getCacheKey(url: string, init?: IFetchInit) {
  return init
    ? url + JSON.stringify(init)
    : url;
}

/**
 * mock window.fetch
 */
window.fetch = (url: string, init?: IFetchInit) => {
  let key = getCacheKey(url, init);
  let data = _map[key] || {};
  let response = new Response(JSON.stringify(data));

  return Promise.resolve(response);
};

export function mockFetch(config: IFetchConfig, init: IFetchInit = {}, responseData: any = {}): void {
  let [ url, newInit] = fetchParamParser(config, init);
  let key = getCacheKey(url, newInit);

  _map[key] = responseData;
};
