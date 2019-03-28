import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Parallax from './parallax'

const Container = styled.div`
  display: flex;
`;

const Box = styled.div`
  margin-top: 100vh;
  width: 50vw;
  height: 200vh;
`;

const RightBox = styled.div`
  position: fixed;
  left: 50vw;
  padding: 30px;
`;

const Input = styled.input`
  border: 4px solid black;
  padding: 10px;
  font-size: 30px;
  ${({ valid }) => valid ? css `
    background-color: #a5ffd6;
  ` : css `
    background-color: #ff686b;
  `}
`;

class App extends Component {
  state = {
    reduceHeight: 1/4,
    imageSrc: 'put your image here',
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
      <Container>
        <Box>
          <Parallax
            reduceHeight={reduceHeight}
            src={imageSrc}/>
        </Box>
        <RightBox>
          <p>(Scroll down)</p>
          <h1>
            Reduce Height(<small>0 &lt; </small>reduceHeight: <small>&lt; 1</small>):
          </h1>
          <Input
            valid={valid}
            type="number"
            value={reduceHeight}
            onChange={this.onReduceHeightChange}/>
          <br/>
          <br/>
          <h1>src:</h1>
          <Input valid value={imageSrc} onChange={this.onImageLoad}/>
        </RightBox>
      </Container>
    );
  }
}

export default App;
