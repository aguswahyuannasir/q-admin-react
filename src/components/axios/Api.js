import axios from 'axios';

// `${window.location.origin}/api_dummy/`
const ENDPOINT = `${window.location.origin}/`; // api/ | public/

const Api = axios.create({
  baseURL:ENDPOINT,

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  // timeout:900, // default is `0` (no timeout)

  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  // xsrfCookieName: 'XSRF-TOKEN', // DEFAULT

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  // xsrfHeaderName: 'X-XSRF-TOKEN', // DEFAULT

  // `responseType` indicates the type of data that the server will respond with
  // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  // responseType: 'json', // 'json', // default
});

function Get(url){
  return Api.get(url);
}

function Post(url, data){
  return Api.post(url, data);
}

export {Api, Get, Post};
