import axios from 'axios';

export const SuapApi = axios.create({
  baseURL: 'https://suap.ifrn.edu.br/api/v2',
});

export const SendNotification = axios.create({
  baseURL: 'https://exp.host/--/api/v2/push',
});

export default SuapApi;
