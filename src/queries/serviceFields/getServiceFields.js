import endpoints from '../../consts/endpoints';

export default ({
  id,
  successCallback = () => {},
  errorCallback = () => {},
} = {}) => ({
  url: endpoints.getServiceFields(id),
  options: {
    method: 'GET',
  },
  meta: {
    successCallback,
    errorCallback,
  },
  transform: response => ({
    serviceFields: response,
  }),
  update: {
    serviceFields: (oldValue, newValue) => newValue,
  },
});
