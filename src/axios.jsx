import { URL } from './utlis/constant';

const axios = require('axios');


const instance = axios.create({
     baseURL: URL
});

export default instance;