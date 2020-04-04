import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <a className="navbar-brand" href="http://localhost:3000">WiMe Marketplace</a>
        <ul className="navbar-nav">
          <li className="nav-item">ETH Exchange</li>
          <li className="nav-item">{this.props.account}</li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;