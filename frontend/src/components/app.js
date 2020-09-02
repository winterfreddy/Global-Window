import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";
import MainPageContainer from "./main/main_page_container";
import Modal from './modal/modal';
import SplashContainer from './splash/splash_container';
import MapsFormContainer from './maps/maps_forms_container';
import EditImageFormContainer from './maps/edit_image_form_container';

const App = () => (
  <div>
    <Modal />
    <NavBarContainer />
    <Switch>
      <ProtectedRoute exact path="/home" component={MainPageContainer} />
      <ProtectedRoute exact path='/upload' component={MapsFormContainer} />
      <ProtectedRoute path='/edit/${id}' component={EditImageFormContainer}/>
    </Switch>
    <AuthRoute exact path="/" component={SplashContainer} />
  </div>
);

export default App;
