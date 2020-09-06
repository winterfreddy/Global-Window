import { connect } from 'react-redux';
import Sidebar from './sidebar';
import { fetchPhotos, fetchPhoto, deletePhoto } from '../../actions/photo_actions';
import { fetchPhotoFavorites, makeFavorite, unFavorite, fetchUserFaves } from '../../actions/favorite_actions';
import { fetchUsers } from '../../actions/user_actions';
const mapStateToProps = state => ({
    photos: Object.values(state.photos),
    currentUserId: state.session.user.id,
    favorites: state.favorites,
    users: state.users
});

const mapDispatchToProps = dispatch => ({
    fetchPhotos: () => dispatch(fetchPhotos()),
    fetchPhoto: photoId => dispatch(fetchPhoto(photoId)),
    deletePhoto: id => dispatch(deletePhoto(id)),
    fetchPhotoFavorites: id => dispatch(fetchPhotoFavorites(id)),
    makeFavorite: favorite => dispatch(makeFavorite(favorite)),
    unFavorite: id => dispatch(unFavorite(id)),
    fetchUserFaves: id => dispatch(fetchUserFaves(id)),
    fetchUsers: () => dispatch(fetchUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);