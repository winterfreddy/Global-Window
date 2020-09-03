import React from 'react';
import { connect } from 'react-redux';
import PhotoForm from './photo_form';
import { fetchPhoto } from '../../actions/photo_actions';


class EditImageForm extends React.Component {
    componentDidMount() {
        this.props.fetchPhoto(this.props.match.params.id)
    }

    render() {
        const { photo, formType, fetchPhoto } = this.props;
        if (!photo) {
            return null;
        } else {
            return (
                <PhotoForm 
                photo={photo}
                formType={formType}
                fetchPhoto={fetchPhoto} />
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => ({
    wholeState: state,
    ownProps: ownProps,
    photo: state.photos.data.filter(photo => photo._id === ownProps.match.params.id),
    formType: 'edit photo'
});

const mapDispatchToProps = dispatch => ({
    fetchPhoto: (id) => dispatch(fetchPhoto(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditImageForm);