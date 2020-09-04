import { connect } from 'react-redux';
import MainPage from './main_page';
import { fetchPhotos, fetchPhotosInArea } from '../../actions/photo_actions';

const mapStateToProps = state => ({
   photos: Object.values(state.photos)
});

const mapDispatchToProps = dispatch =>  ({
    fetchPhotos: () => dispatch(fetchPhotos()),
    fetchPhotosInArea: (coorsUrlPath) => dispatch(fetchPhotosInArea(coorsUrlPath))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);