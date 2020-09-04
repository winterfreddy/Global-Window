import axios from 'axios';

export const fetchPhotoFavorites = id => (
    axios.get(`/api/photos/${id}/favorites`)
);

export const favorite = favoriteData => (
    axios.post('/api/favorites/', favoriteData)
);

export const unFavorite = id => (
    axios.delete(`/api/favorites/${id}`)
);