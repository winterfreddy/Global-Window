import React from 'react';
import { connect } from 'react-redux';
import UploadMapsForms from './upload_maps_form';

const mapStateToProps = state => ({
    formType: 'upload'
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(UploadMapsForms);