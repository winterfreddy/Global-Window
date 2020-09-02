import React from 'react';
import axios from 'axios';
import '../../stylesheets/image_form.scss'
// import Dropzone from 'react-dropzone';

class ImageUploadForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { };
    this.state["description"] = "";
    this.state["tags"] =  "";
    this.state["photoFile"] = null;
    this.state['photoUrl'] = null;

    this.singleFileChangedHandler = this.singleFileChangedHandler.bind(this);
    this.singleFileUploadHandler = this.singleFileUploadHandler.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  singleFileChangedHandler = (event) => {
    // this.setState({
    //   photoFile: event.currentTarget.files[0],
    // });

    const reader = new FileReader();
    const file = event.currentTarget.files[0];
    console.log(file);
    reader.onloadend = () =>
      this.setState({ photoUrl: reader.result, photoFile: file });
    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ photoUrl: "", photoFile: null });
    }
  };

  singleFileUploadHandler = () => {
    const formData = new FormData();
    if (this.state.photoFile) {
      formData.append('description', this.state.description);
      formData.append('file', this.state.photoFile);
      let coordinates = { lat: this.props.lat, lng: this.props.lng};
      formData.append('coordinates', JSON.stringify(coordinates));
      let tagsArray = this.state.tags.split(' ');
      formData.append('tags', tagsArray);
      axios.post("/api/photos/", formData, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            if (response.data.error) {
              console.log(response.data);
            } else {
              console.log("successful upload");
            }
          }
        });
    }

    // // If file selected
    // if (this.state.photoFile) {
    //   data.append(
    //     "description",
    //     this.state.lat,
    //     this.state.lng,
    //     this.state.photoFile,
    //     this.state.photoFile.name
    //   );
    //   axios
    //     .post("/api/photos/", data, {
    //       headers: {
    //         accept: "application/json",
    //         "Accept-Language": "en-US,en;q=0.8",
    //         "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
    //       },
    //     })
    //     .then((response) => {
    //       if (200 === response.status) {
    //         // If file size is larger than expected.
    //         if (response.data.error) {
    //           if ("LIMIT_FILE_SIZE" === response.data.error.code) {
    //           } else {
    //             console.log(response.data);
    //           }
    //         } else {
    //           // Success
    //           let fileName = response.data;
    //           console.log("fileName", fileName);
    //         }
    //       }
    //     });
    // } 
  };

  render() {
    const preview = this.state.photoUrl ? (
      <img src={this.state.photoUrl} className="image-preview" />
    ) : null;
    return (
      <div className="image-upload-form-box">
        <label className="image-upload-title">Image Upload Form</label>
        <label className="image-upload-reminder">Don't forget to place a marker on the map!</label>
        <div className="image-description">
          <label>Image Description:</label>
          <br/>
          <input 
            type="text" 
            className='description-field' 
            value={this.state.description}
            onChange={this.update('description')} />
        </div>
        <div className="image-tags">
          <label>Tags (separate by space for multiple tags):</label>
          <br/>
          <input
            type="text"
            id='tags-field'
            className='tags-field' 
            value={this.state.tags} 
            onChange={this.update('tags')} />
        </div>
        <div>
          <input type="file" onChange={this.singleFileChangedHandler} />
          <div>
            <button className="btn btn-info" onClick={this.singleFileUploadHandler}>Upload</button>
          </div>
        </div>
        <div className="image-preview">
          {preview}
        </div>
      </div>
    );
  }
}

export default ImageUploadForm;