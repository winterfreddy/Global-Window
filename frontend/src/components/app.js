import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";
import MainPage from "./main/main_page";
import Modal from './modal/modal';
import SplashContainer from './splash/splash_container';
import MapsFormContainer from './maps/maps_forms_container';

const App = () => (
  <div>
    <Modal />
    <NavBarContainer />
    <Switch>
      <ProtectedRoute exact path="/home" component={MainPage} />
      <ProtectedRoute exact path='/upload' component={MapsFormContainer} />
    </Switch>
    <AuthRoute exact path="/" component={SplashContainer} />
  </div>
);

export default App;
