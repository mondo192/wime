import React, { Component } from 'react';
import axios from 'axios';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: ""
    }
  }

  componentDidMount = async () => {
    try {
      const accounts = await axios.get("/api/account");
      this.setState({ account: accounts.data.response[0] });
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    return (
      <div>
        <nav>
          WiMe
          <ul>
            <li>Create Product</li>
            <li>View Marketplace</li>
            <li>ETH Exchange</li>
            <li>Signed in as: { this.state.account }</li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navigation;