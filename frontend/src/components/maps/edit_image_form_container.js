import { connect } from 'react-redux';
import EditImageForm from './edit_image_form';
import { getPhoto } from '../../actions/photo_actions';

const mapStateToProps = (state, ownProps) => ({
    wholeState: state,
    ownProps: ownProps
});

const mapDispatchToProps = dispatch => ({
    fetchPhoto: (id) => dispatch(getPhoto(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditImageForm);