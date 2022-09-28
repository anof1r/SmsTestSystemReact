// import isFunction from 'lodash/isFunction';
import { actionTypes } from 'redux-query';

export default () => next => (action) => {
  if (action.type === actionTypes.REQUEST_SUCCESS
      || action.type === actionTypes.MUTATE_SUCCESS) {
    // const successCallback = action?.meta?.successCallback;

    // if (successCallback && isFunction(successCallback)) {
    //   successCallback(action.responseBody);
    // }
  }

  return next(action);
};
