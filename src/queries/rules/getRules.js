import endpoints from '../../consts/endpoints';

export default ({
  successCallback = () => {},
  errorCallback = () => {},
} = {}) => ({
  url: endpoints.getRule(),
  options: {
    method: 'GET',
  },
  meta: {
    successCallback,
    errorCallback,
  },
  transform: response => ({
    rule: response,
  }),
  update: {
    rule: (oldValue, newValue) => newValue,
  },
});
