import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <iframe
          className="App__frame"
          height="100%"
          src="https://projects.raspberrypi.org"
          width="100%"
        />
      </div>
    );
  }
}

export default App;
