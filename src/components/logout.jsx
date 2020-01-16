import { Component } from "react";
import { removeJwt } from "../services/authService";

class Logout extends Component {
  componentDidMount() {
    removeJwt();
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default Logout;
