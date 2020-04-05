import React, { Component } from "react";
import { Nav, Navbar } from 'react-bootstrap';
import getWeb3 from '../getWeb3';


class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      account: null
    }
  }

  async componentDidMount() {
    await getWeb3();
    const response = await fetch("/api/account");
    const data = await response.json();
    this.setState({ account: data.response[0], loading: false }); 
  }

  render() {
    return(
      <Navbar bg="dark" expand="sm" variant="dark">
        <Navbar.Brand href="/">WiMe</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/marketplace">Marketplace</Nav.Link>
            <Nav.Link href="/exchange">ETH Exchange</Nav.Link>
          </Nav>
          <Navbar.Text id="account">
            Signed in as: { this.state.account }
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;