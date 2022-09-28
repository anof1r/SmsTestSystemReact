import endpoints from '../../consts/endpoints';

export default ({
  successCallback = () => {},
  errorCallback = () => {},
} = {}) => ({
  url: endpoints.getServiceType(),
  options: {
    method: 'GET',
  },
  meta: {
    successCallback,
    errorCallback,
  },
  transform: response => ({
    serviceTypes: response,
  }),
  update: {
    serviceTypes: (oldValue, newValue) => newValue,
  },
});
