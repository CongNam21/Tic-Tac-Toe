import React, { Component } from 'react';
import "./App.css"
import ReactDOM from "react-dom";
import Game from "./components/Game"

class App extends Component {
  
  render() {
    return (
     <Game/>
    );
  }
}
ReactDOM.render(<Game />, document.getElementById("root"));

export default App;