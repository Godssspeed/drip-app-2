import React, { Component } from "react";
import Navbar from "./components/layouts/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import routes from "./components/routes";
import "./reset.css";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      display: false
    };
  }

  // handleDisplay = () => {
  //   this.setState({ display: !display });
  // };

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          {routes}
        </div>
      </Router>
    );
  }
}

export default App;

// displayFn={this.handleDisplay}
