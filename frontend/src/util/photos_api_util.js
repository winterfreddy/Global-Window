import axios from "axios";

export const fetchPhotos = () => (
    axios.get('/api/photos/')
)

export const fetchPhotosInArea = (coordsPath) => {
    return (
    axios.get(`/api/photos/${coordsPath}`)
)}

export const fetchPhoto = (id) => (
    axios.get(`/api/photos/${id}`)
);

export const uploadPhoto = photoData => (
    axios.post('/api/photos/', photoData)
);

export const editPhoto = photoData => (
    axios.patch(`/api/photos/${photoData.id}`, photoData)
);

export const deletePhoto = id => (
    axios.delete(`/api/photos/${id}`)
)