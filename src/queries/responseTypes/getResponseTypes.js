import endpoints from '../../consts/endpoints';

export default ({
  id,
  successCallback = () => {},
  errorCallback = () => {},
} = {}) => ({
  url: endpoints.getResponseTypes(id),
  options: {
    method: 'GET',
  },
  meta: {
    successCallback,
    errorCallback,
  },
  transform: response => ({
    responseTypes: response,
  }),
  update: {
    responseTypes: (oldValue, newValue) => newValue,
  },
});
