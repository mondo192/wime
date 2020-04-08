import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import getWeb3 from './getWeb3';
import Navigation from './components/Navigation';
import Marketplace from './components/Marketplace';
import Home from './components/Home';
import TokenExchange from './components/TokenExchange';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      balance: 0
    }
  }

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      this.setState({ account: accounts[0] });
      const balance = await web3.eth.getBalance(this.state.account);
      this.setState({ balance });
    } catch (error) {
      console.log(error.message);
    }
  }
  
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
        <Navigation account={ this.state.account }/>
            <Switch>
              <Redirect from="/" to="/home" exact />
              <Route path="/home" component={ Home } />
              <Route path="/marketplace" component={ Marketplace } />
              <Route path="/exchange" component={ TokenExchange }/>
            </Switch>
        </React.Fragment>
      </BrowserRouter>
     
    );
  }
}

export default App;
