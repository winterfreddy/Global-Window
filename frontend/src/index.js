import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';
import './stylesheets/reset.scss';

// Testing imports:
// import { fetchPhotos, fetchPhoto } from './util/photos_api_util';
import { fetchPhotos, fetchPhoto, editPhoto, deletePhoto } from './actions/photo_actions';

document.addEventListener('DOMContentLoaded', () => {
  let store;

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decodedUser = jwt_decode(localStorage.jwtToken);
    const preloadedState = { session: { isAuthenticated: true, user: decodedUser }};

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;

    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/';
    }
  } else {
    store = configureStore({});
  } 
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);

  // testing:
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.fetchPhotos = fetchPhotos;
  window.fetchPhoto = fetchPhoto;
  window.editPhoto = editPhoto;
  window.deletePhoto = deletePhoto;
});