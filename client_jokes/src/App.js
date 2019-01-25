import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import Jokes from "./jokes/Jokes.js";
import Login from "./auth/Login.js";
import Signup from "./auth/Signup";
import "./App.css";

const Home = () => {
  return (
    <div>
      <h1>Home Component</h1>
      <h2>Login or Sign Up</h2>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav className="navBar">
            <NavLink to="/" exact>
              Home
            </NavLink>
            <NavLink to="/jokes">Jokes</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
            <NavLink to="/signin">Login In</NavLink>
            <NavLink to="/" exact onClick={this.signout}>Sign Out</NavLink>
          </nav>
        </header>
        <main>
          <Route path="/" component={Home} exact />
          <Route path="/jokes" component={Jokes} />
          <Route path="/signin" component={Login} />
          <Route path="/signup" component={Signup} />
        </main>
      </div>
    );
  }

  signout = () => {
    localStorage.removeItem("jwt");
  };
}

export default App;
