import { connect } from 'react-redux';
import MainPage from './main_page';
import { fetchPhotos } from '../../actions/photo_actions';

const mapStateToProps = state => ({
   photos: Object.values(state.photos)
});

const mapDispatchToProps = dispatch =>  ({
    fetchPhotos: () => dispatch(fetchPhotos())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);