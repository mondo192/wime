import React, { Component } from 'react';

class Navigation extends Component {
  render() {
    return (
      <div>
        <nav>
          WiMe
          <ul>
            <li>Create Product</li>
            <li>View Marketplace</li>
            <li>ETH Exchange</li>
            <li>Signed in as: { this.props.account }</li>
            <li>{ this.props.balance} ETH </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navigation;