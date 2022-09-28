// import isFunction from 'lodash/isFunction';
import { actionTypes } from 'redux-query';

// import toastRef from 'helpers/toast';

export default () => next => (action) => {
  if (action.type === actionTypes.REQUEST_FAILURE
      || action.type === actionTypes.MUTATE_FAILURE) {
    if (action.status === 401 && window.location.pathname !== '/auth') {
      // window.location.reload();
    } else {
      // const errorCallback = action?.meta?.errorCallback;

      // if (errorCallback && isFunction(errorCallback)) {
      //   errorCallback(action.responseBody, action.status);
      // }
    }
    // if (!action?.meta?.hideToast) {
    //   toastRef?.current?.show({ message: 'An error occurred while executing the request.' });
    // }
  }

  return next(action);
};
