import { useCallback } from 'react';
import { useMutation } from 'redux-query-react';

import {
  getArray,
  useISESelector,
} from '../selectors';
import {
  getServiceFields as getServiceFieldsApi,
} from '../queries/serviceFields';

export default () => {
  const [
    {
      isPending: isPendingGetServiceFields,
      lastUpdated: lastUpdatedGetServiceFields,
    },
    getServiceFields,
  ] = useMutation(getServiceFieldsApi);

  const selector = useCallback(state => ({
    serviceFields: getArray(state, 'serviceFields'),
  }), []);
  const data = useISESelector(selector);

  return {
    getServiceFields,
    isPendingGetServiceFields,
    lastUpdatedGetServiceFields,
    ...data,
  };
};
