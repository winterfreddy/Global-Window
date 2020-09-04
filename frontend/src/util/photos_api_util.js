import axios from "axios";

export const fetchPhotos = () => (
    axios.get('/api/photos/')
)

export const fetchPhotosInArea = (coordsPath) => {
    console.log("photosAPI");
    return (
    axios.get(`/api/photos/${coordsPath}`)
    // /api/photos/?lat1= 37.980350&lng1=-122.769670&lat2= 37.980360&lng2=-122.76968
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