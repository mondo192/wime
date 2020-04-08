import React, { Component } from 'react';
import axios from 'axios';

class TokenExchange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      etherTokens: "",
      wimeTokens: ""
    }
  }

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(this.state);
    
    try {
      const response = await axios.post("/api/exchange", this.state.etherTokens);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  }
  
  render() {
    const { etherTokens, wimeTokens } = this.state;
    return (
      <div>
        <h3>Token Exchange</h3>
        <form onSubmit={ this.onSubmitHandler }>
          <label>Balance: {this.props.balance}</label>
          <div>
            <label>
              Ether Tokens:
              <input 
                type="number" 
                name="etherTokens"
                value={ etherTokens } 
                onChange={ this.onChangeHandler }
              />
            </label>
          </div>
          <div>
            <label>
              WiMe Tokens:
              <input 
                type="number" 
                name="wimeTokens"
                value={ wimeTokens } 
                onChange={ this.onChangeHandler }
              />
            </label>
          </div>
          <button type="submit">Exchange</button>
        </form>
      </div>
    );
  }
}

export default TokenExchange;