import axios from "axios";

export const uploadPhoto = photoData => (
    axios.post('/api/photos/', photoData)
);