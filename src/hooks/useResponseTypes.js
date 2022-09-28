import { useCallback } from 'react';
import { useMutation } from 'redux-query-react';

import {
  getArray,
  useISESelector,
} from '../selectors';
import {
  getResponseTypes as getResponseTypesApi,
} from '../queries/responseTypes';

export default () => {
  const [
    {
      isPending: isPendingGetResponseTypes,
      lastUpdated: lastUpdatedGetResponseTypes,
    },
    getResponseTypes,
  ] = useMutation(getResponseTypesApi);

  const selector = useCallback(state => ({
    responseTypes: getArray(state, 'responseTypes'),
  }), []);
  const data = useISESelector(selector);

  return {
    getResponseTypes,
    isPendingGetResponseTypes,
    lastUpdatedGetResponseTypes,
    ...data,
  };
};
