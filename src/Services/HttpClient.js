import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:50974';
//44320


const request = {
    get : (url) => axios.get(url),
    post: (url, body) => axios.post(url, body),
    put : (url, body) => axios.put(url, body),
    delete: (url) => axios.delete(url)
};
 
export default request;