import React, { Component } from "react";
import { render } from "react-dom";
import Tsparticles from 'react-tsparticles'
import SignIn from "./SignIn";
import "./style.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }

  render() {
    return (
      <div>
        <SignIn/>
        <ParticlesBg type="random" bg={true}/>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
