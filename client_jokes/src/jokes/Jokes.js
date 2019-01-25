import React, { Component, Fragment } from "react";
import axios from "axios";

class Jokes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: []
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    const endpoint = "http://localhost:3300/api/jokes";
    const options = {
      headers: {
        Authorization: token
      }
    };
    axios
      .get(endpoint, options)
      .then(res => {
        console.log('data',res.data);
        this.setState({
          jokes: res.data
        });
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  }

  render() {
    console.log(this.props.history);
    if (this.state.jokes.length === 0) {
      console.log("jokes length true");
      return (
        <div className="jokesMainContainer">
          <h2>List of Jokes:</h2>
          <div className="errContainer">
            <h3>You are not Signed In, click bellow to Sign In:</h3>
            <button
              onClick={() => {
                this.props.history.push("/signin");
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="jokesMainContainer">
          <h2>List of Jokes:</h2>
          <div className="jokesContainer">
            {this.state.jokes.map(item => {
              return (
                <div key={item.id} className="jokes">
                  <h3>ID: {item.id}</h3>
                  <p>{item.joke}</p>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }
}

export default Jokes;