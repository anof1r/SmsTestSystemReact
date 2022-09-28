import endpoints from '../../consts/endpoints';

export default ({
  body,
  successCallback = () => {},
  errorCallback = () => {},
}) => ({
  body,
  url: endpoints.getRule(),
  options: {
    method: 'POST',
  },
  meta: {
    successCallback,
    errorCallback,
  },
});
