import axios from 'axios';

export const favorite = favoriteData => (
    axios.post('/api/favorites/', favoriteData)
);

export const unfavorite = id => (
    axios.delete(`/api/favorites/${id}`)
);