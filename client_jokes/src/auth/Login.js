import React, { Component } from "react";
import axios from "axios";
import "../App.css";

class Login extends Component {
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
    const endpoint = "http://localhost:3300/api/login";
    axios
      .post(endpoint, this.state)
      .then(res => {
        localStorage.setItem("jwt", res.data.token);
      })
      .then(() => {
        this.props.history.push("/jokes");
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
          Login
        </button>
      </form>
    );
  }
}

export default Login;