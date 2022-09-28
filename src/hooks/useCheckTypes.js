import { useCallback } from 'react';
import { useMutation } from 'redux-query-react';

import {
  getArray,
  useISESelector,
} from '../selectors';
import {
  getCheckTypes as getCheckTypesApi,
} from '../queries/checkTypes';

export default () => {
  const [
    {
      isPending: isPendingGetCheckTypes,
      lastUpdated: lastUpdatedGetCheckTypes,
    },
    getCheckTypes,
  ] = useMutation(getCheckTypesApi);

  const selector = useCallback(state => ({
    checkTypes: getArray(state, 'checkTypes'),
  }), []);
  const data = useISESelector(selector);

  return {
    getCheckTypes,
    isPendingGetCheckTypes,
    lastUpdatedGetCheckTypes,
    ...data,
  };
};
