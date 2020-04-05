import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import getWeb3 from './getWeb3';
import Navigation from './components/Navigation';
import CreateItem from './components/CreateItem';
import Marketplace from './components/Marketplace';


class App extends Component {

  state = {
    accounts: [],
    loading: true,
    account: null
  }

  componentDidMount = async () => {
    await getWeb3();
    const response = await fetch("/api/account");
    const data = await response.json();
    this.setState({ accounts: data.response[0], loading: false });    
  }
  
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
        <Navigation/>
            <Switch>
              <Redirect from="/" to="/" exact />
              <Route path="/marketplace" component={ Marketplace } />
              <Route path="/exchange" component={ CreateItem } />
            </Switch>
        </React.Fragment>
      </BrowserRouter>
     
    );
  }
}

export default App;
