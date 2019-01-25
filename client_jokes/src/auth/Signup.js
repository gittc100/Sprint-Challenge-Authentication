import React, { Component } from "react";
import axios from "axios";

class Signup extends Component {
  state = {
    username: "",
    password: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const endpoint = "http://localhost:3300/api/register";
    axios
      .post(endpoint, this.state)
      .then(res => {
        console.log(res);
      })
      .then(() => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log({ Error: err });
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <div className="inputContainer">
          <label htmlFor="username">Username:</label>
          <input
            name="username"
            type="text"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            type="text"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </div>
        <button type="submit" className="formBTN">
          Sign Up
        </button>
      </form>
    );
  }
}

export default Signup;