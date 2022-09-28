import { useSelector } from 'react-redux';

import shallowEqual from './shallowEqual';

const useISESelector = selector => useSelector(selector, shallowEqual);

export default useISESelector;
