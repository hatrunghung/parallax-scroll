import React, { Component } from 'react';
import './App.css';
import Parallax from './parallax'

class App extends Component {
  state = {
    reduceHeight: 1/4,
    imageSrc: '',
    valid: true
  }

  onReduceHeightChange = (event) => {
    const value = parseFloat(event.target.value);
    if (value > 0 && value < 1) {
      this.setState({
        reduceHeight: value,
        valid: true
      });
      return;
    }

    this.setState({
      reduceHeight: value,
      valid: false
    })
  }

  onImageLoad = (event) => {
    this.setState({
      imageSrc: event.target.value
    })
  }

  render() {
    const {valid, imageSrc, reduceHeight} = this.state;
    return (
      <div className="container">
        <div className="scroll-down">
          <Parallax
            src={imageSrc}
            reduceHeight={reduceHeight}
          />
        </div>
        <div className="inputField">
          <h3>Scroll down</h3>
          <h1>Height ratio</h1>
          <input
            type="number"
            value={reduceHeight}
            onChange={this.onReduceHeightChange}
          />
          <br/>
          <h1>src:</h1>
          <input valid value={imageSrc} onChange={this.onImageLoad}/>
        </div>
      </div>
    );
  }
}

export default App;
