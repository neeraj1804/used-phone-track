import axios from 'axios';
import * as actionTypes from '../../constants/actionTypes';


const ajaxCreator = (url, method, { data, params, timeout, responseType } = {}) => {
  const options = {
    url,
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (data !== undefined) {
    options.data = data;
  }
  if (params !== undefined) {
    options.params = params;
  }
  if (timeout) {
    options.timeout = typeof timeout === 'boolean' ? actionTypes.AJAX_TIMEOUT : timeout;
  }
  if (responseType) {
    options.responseType = responseType;
  }
  return axios(options);
};

export default ajaxCreator;
