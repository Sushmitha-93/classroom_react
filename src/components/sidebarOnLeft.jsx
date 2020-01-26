import React, { Component } from "react";

class LeftSideBar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="sidebar-header pl-3">
          <h3>LeftSidebar component</h3>
        </div>

        <div class="list-group-flush">
          <a href="#" class="list-group-item list-group-item-action active">
            Cras justo odio
          </a>
          <a href="#" class="list-group-item list-group-item-action">
            Dapibus ac facilisis in
          </a>
          <a href="#" class="list-group-item list-group-item-action">
            Morbi leo risus
          </a>
          <a href="#" class="list-group-item list-group-item-action">
            Porta ac consectetur ac
          </a>
          <a href="#" class="list-group-item list-group-item-action disabled">
            Vestibulum at eros
          </a>
        </div>
      </React.Fragment>
    );
  }
}

export default LeftSideBar;
