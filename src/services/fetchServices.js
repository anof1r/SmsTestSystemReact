import axios from 'axios';

export const fetchServices = {
  getServiceFields(servType) {
    return axios.get(`${`http://10.210.0.21:8000/service_field/${servType}`}`);
  },

  getCheckTypes() {
    return axios.get('http://10.210.0.21:8000/check_type/');
  },
};
