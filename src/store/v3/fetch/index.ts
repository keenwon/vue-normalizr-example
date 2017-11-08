export * from './interfaces/IFetchConfig';
export * from './interfaces/IFetchInit';

export * from './requests/comment';
export * from './requests/news';
export * from './requests/user';

import fetch, { install, fetchParamParser } from './fetch';

export { install, fetch, fetchParamParser};

export default fetch;
