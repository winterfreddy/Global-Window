export const uploadPhoto = photoData => (
    axios.post('/api/photos/', photoData)
)

// export const signup = (userData) => {
//   console.log('signup session_api_util');
//   return axios.post("/api/users/register", userData);
// };