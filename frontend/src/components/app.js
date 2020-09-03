import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";
import MainPageContainer from "./main/main_page_container";
import Modal from './modal/modal';
import SplashContainer from './splash/splash_container';
// import UploadImageFormContainer from './maps/upload_image_form_container';
import UploadMapsFormContainer from './maps/upload_maps_forms_container';
import EditImageFormContainer from './maps/edit_image_form_container';

const App = () => (
  <div>
    <Modal />
    <NavBarContainer />
    <Switch>
      <ProtectedRoute exact path="/home" component={MainPageContainer} />
      <ProtectedRoute exact path='/upload' component={UploadMapsFormContainer} />
      <ProtectedRoute exact path='/edit/:id' component={EditImageFormContainer} google={window.google} />
    </Switch>
    <AuthRoute exact path="/" component={SplashContainer} />
  </div>
);

export default App;
