import { useCallback } from 'react';
import { useMutation } from 'redux-query-react';

import {
  getArray,
  useISESelector,
} from '../selectors';
import {
  getRule as getRuleApi,
  postRule as postRuleApi,
  putRule as putRuleAPi,
} from '../queries/rules';

export default () => {
  const [
    {
      isPending: isPendingGetRule,
      lastUpdated: lastUpdatedGetRule,
    },
    getRule,
  ] = useMutation(getRuleApi);
  const [
    {
      isPending: isPendingPostRule,
    },
    postRule,
  ] = useMutation(postRuleApi);
  const [
    {
      isPending: isPendingPutRule,
    },
    putRule,
  ] = useMutation(putRuleAPi);

  const selector = useCallback(state => ({
    rule: getArray(state, 'rule'),
  }), []);
  const data = useISESelector(selector);

  return {
    getRule,
    postRule,
    putRule,
    isPendingGetRule,
    lastUpdatedGetRule,
    isPendingPostRule,
    isPendingPutRule,
    ...data,
  };
};
