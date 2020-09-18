import { connect } from 'react-redux';
import MainPage from './main_page';
import { fetchPhotos, fetchPhotosInArea } from '../../actions/photo_actions';
import { fetchUserFaves } from '../../actions/favorite_actions';

const mapStateToProps = state => ({
   photos: Object.values(state.photos),
   favorites: Object.values(state.favorites)
});

const mapDispatchToProps = dispatch =>  ({
    fetchPhotos: () => dispatch(fetchPhotos()),
    fetchPhotosInArea: (coorsUrlPath) => dispatch(fetchPhotosInArea(coorsUrlPath))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);