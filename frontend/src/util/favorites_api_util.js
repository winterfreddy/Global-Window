import axios from 'axios';

export const favorite = favoriteData => (
    axios.post('/api/favorites/', favoriteData)
);

export const unFavorite = id => (
    axios.delete(`/api/favorites/${id}`)
);