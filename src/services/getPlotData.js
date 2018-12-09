import axios from 'axios';

var instance = axios.create({
    auth: {
        username: 'maf',
        password: '25st0rest'
    },
    baseURL: 'https://staging.imagination-maf.com/api/',
    timeout: 5000
});

export default instance;
