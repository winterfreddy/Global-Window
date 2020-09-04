import React from 'react';
import GoogleMapsContainer from './google_maps_container';

class UploadMapsForms extends React.Component {
    render() {
        return (
            <div>
                <GoogleMapsContainer formType={this.props.formType}/>
            </div>
        );
    }
}

export default UploadMapsForms;