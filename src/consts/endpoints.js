const rootHost = 'http://10.210.0.21:8000';
const rule = '/rule';
const serviceType = '/service_type';
const checkTypes = '/check_type';
const serviceFields = '/service_field';
const responseTypes = '/response_type';

export default {
  rootHost,
  getRule: () => `${rule}`,
  putRule: id => `${rule}/${id}`,
  getServiceType: () => `${serviceType}`,
  getCheckTypes: () => `${checkTypes}`,
  getServiceFields: id => `${serviceFields}/${id}`,
  getResponseTypes: id => `${responseTypes}/${id}`,
};
