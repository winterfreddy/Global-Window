import React from 'react';
import axios from 'axios';
// import Dropzone from 'react-dropzone';

class ImageUploadForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...this.props };
    this.state["description"] = "";
    this.state["photoFile"] = null;
    this.state['photoUrl'] = null;
  }

  _onDrop(files) {
    var file = files[0];
  }

  //   handleSubmit(e) {
  //     e.preventDefault();
  //     const formData = new FormData();
  //     formData.append("photo[description]", this.state.description);
  //     if (this.state.photoFile) {
  //       formData.append("photo[photo]", this.state.photoFile);
  //     }
  //     $.ajax({
  //       url: "/api/photos/",
  //       method: "POST",
  //       data: formData,
  //       contentType: false,
  //       processData: false,
  //     });
  //     // .then((photo) => history.push(`/home');
  //   }

  singleFileChangedHandler = (event) => {
    // this.setState({
    //   photoFile: event.currentTarget.files[0],
    // });

    const reader = new FileReader();
    const file = event.currentTarget.files[0];
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
      // formData.append('description', this.state.description);
      formData.append('imageURL', this.state.photoFile);
      let coordinates = { lat: this.state.lat, lng: this.state.lng};
      formData.append('coordinates', coordinates);

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
    console.log(this.state.photoUrl);
    const preview = this.state.photoUrl ? (
      <img src={this.state.photoUrl} className="image-preview" />
    ) : null;
    return (
      <div
        className="card border-light mb-3 mt-5"
        style={{ boxShadow: "0 5px 10px 2px rgba(195,192,192,.5)" }}
      >
        <div className="card-header">
          <h3 style={{ color: "#555", marginLeft: "12px" }}>
            Single Image Upload
          </h3>
          <p className="text-muted" style={{ marginLeft: "12px" }}>
            Upload Size: 250px x 250px ( Max 2MB )
          </p>
        </div>
        <div className="card-body">
          <p className="card-text">Please upload an image</p>
          <input type="file" onChange={this.singleFileChangedHandler} />
          <div className="mt-5">
            <button
              className="btn btn-info"
              onClick={this.singleFileUploadHandler}
            >
              Upload
            </button>
          </div>
        </div>
        {preview}
      </div>
    );
  }
}

export default ImageUploadForm;