import endpoints from '../../consts/endpoints';

export default ({
  successCallback = () => {},
  errorCallback = () => {},
} = {}) => ({
  url: endpoints.getCheckTypes(),
  options: {
    method: 'GET',
  },
  meta: {
    successCallback,
    errorCallback,
  },
  transform: response => ({
    checkTypes: response,
  }),
  update: {
    checkTypes: (oldValue, newValue) => newValue,
  },
});
