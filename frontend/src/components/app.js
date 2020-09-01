import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";
import MainPage from "./main/main_page";
import Modal from './modal/modal';
import GoogleMaps from './maps/google_maps_container';

const App = () => (
  <div>
    <Modal />
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/home" component={MainPage} />
    </Switch>
  </div>
);

export default App;
