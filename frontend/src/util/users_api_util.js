import axios from 'axios';

export const fetchUsers = () => (
    axios.get('/api/users/')
);