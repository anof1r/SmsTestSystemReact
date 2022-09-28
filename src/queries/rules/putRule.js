import endpoints from '../../consts/endpoints';

export default ({
  id,
  body,
  successCallback = () => {},
  errorCallback = () => {},
}) => ({
  body,
  url: endpoints.putRule(id),
  options: {
    method: 'PUT',
  },
  meta: {
    successCallback,
    errorCallback,
  },
});
