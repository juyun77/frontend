import React, { Component } from "react";

export default class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div>
              <a href="https://www.1jo10000jo.link" className="navbar-brand">
                To-do-list
              </a>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}
