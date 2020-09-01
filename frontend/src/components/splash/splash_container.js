import React from "react";
import { connect } from "react-redux";
import { openModal } from '../../actions/modal_actions';
import Splash from './splash';

const mDTP = (dispatch) => ({
  openModal: () => dispatch(openModal("signup")),
  otherForm: (
    <button onClick={() => dispatch(openModal("login"))}>Login</button>
  ),
});

export default connect(null, mDTP)(Splash);
