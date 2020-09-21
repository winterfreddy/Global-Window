import React from 'react';
import { connect } from 'react-redux';
import UploadMapsForms from './upload_maps_form';

const mapStateToProps = state => ({
    formType: 'upload'
});

export default connect(mapStateToProps, null)(UploadMapsForms);