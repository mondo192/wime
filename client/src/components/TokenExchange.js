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

  // onChangeHandler = event => {
  //   this.setState({ [event.target.name]: event.target.value });
  // }

  onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/exchange", this.state);
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
          <div>
            <input 
              type="text" 
              name="Input" 
              // value={ etherTokens } 
              // onChange={ this.onChangeHandler }
            />
          </div>
          <div>
            <input 
              type="text" 
              name="Output" 
              // value={ wimeTokens } 
              // onChange={ this.onChangeHandler }
            />
          </div>
          <button type="submit">Exchange</button>
        </form>
      </div>
    );
  }
}

export default TokenExchange;