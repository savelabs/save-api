import axios from 'axios';

const SuapApi = axios.create({
  baseURL: 'https://suap.ifrn.edu.br/api/v2',
});

export default SuapApi;
