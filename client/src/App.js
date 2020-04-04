import React, { Component } from 'react';
import './App.css';
import getWeb3 from './getWeb3';
import Navbar from './components/Navbar/Navbar';
import CreateItem from './components/CreateItem/CreateItem';

class App extends Component {

  state = {
    loading: true,
    account: null
  }

  async componentDidMount() {
    await getWeb3();
    const response = await fetch("/api/item");
    const data = await response.json();
    this.setState({ account: data.response, loading: false });    
  }
  
  render() {
    return (
      <div className="App">
        <Navbar />
        <CreateItem/>
      </div>
    );
  }
}

export default App;
