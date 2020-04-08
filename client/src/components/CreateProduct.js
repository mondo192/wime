import React, { Component } from 'react';
import axios from 'axios';

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      productPrice: ""
    }
  }

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(this.state);
    try {
      const response = await axios.post("/api/product", this.state);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  }
  
  render() {
    const { productName, productPrice } = this.state;
    return (
      <div>
        <h3>Create New Product</h3>
        <form onSubmit={ this.onSubmitHandler }>
          <div>
            <input 
              type="text" 
              name="productName" 
              value={ productName } 
              onChange={ this.onChangeHandler }
            />
          </div>
          <div>
            <input 
              type="number" 
              name="productPrice" 
              value={ productPrice } 
              onChange={ this.onChangeHandler }
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    );
  }
}

export default CreateProduct;