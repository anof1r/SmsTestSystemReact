import { useCallback } from 'react';
import { useMutation } from 'redux-query-react';

import {
  getArray,
  useISESelector,
} from '../selectors';
import {
  getServiceTypes as getServiceTypesApi,
} from '../queries/serviceTypes';

export default () => {
  const [
    {
      isPending: isPendingGetServiceTypes,
      lastUpdated: lastUpdatedGetServiceTypes,
    },
    getServiceTypes,
  ] = useMutation(getServiceTypesApi);

  const selector = useCallback(state => ({
    serviceTypes: getArray(state, 'serviceTypes'),
  }), []);
  const data = useISESelector(selector);

  return {
    getServiceTypes,
    isPendingGetServiceTypes,
    lastUpdatedGetServiceTypes,
    ...data,
  };
};
