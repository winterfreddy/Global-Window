import axios from "axios";

export const uploadPhoto = photoData => (
    axios.post('/api/photos/', photoData)
);

export const fetchPhoto = (id) => (
    axios.get(`/api/photos/${id}`)
);