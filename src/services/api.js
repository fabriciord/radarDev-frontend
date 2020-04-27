import axios from 'axios';
const api = axios.create({
    baseURL: 'https://young-spire-06641.herokuapp.com',
});
export default api;