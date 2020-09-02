import React from 'react';
import ImageUploadForm from './image_upload_form';

class EditImageForm extends React.Component {
    constructor(props){
        super(props);

        // this.state = this.props.photo;
    }

    render() {
        return(
            <div>
                Edit Image Form here todo!
                <ImageUploadForm
                    description = {}
                />
            </div>
        )
    }
}

export default EditImageForm;