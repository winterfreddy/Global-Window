import { connect } from 'react-redux';
import PhotoForm from './photo_form';

const mapStateToProps = state => ({
    formType: 'upload photo'
});

const mapDispatchToProps = dispatch => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoForm);