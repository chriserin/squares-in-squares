import React, { Component } from 'react';
import Square from 'Square.js';
import Commands from 'Commands.js';
import glamorous from 'glamorous';

const ContainerDiv = glamorous.div({
  width: '110%',
  background: 'LInear-gradient(green, yellow)',
  position: 'absolute',
  overflow: 'hidden',
});

class SquaresContainer extends Component {
  constructor() {
    super();

    this.changePoints = this.changePoints.bind(this);
    this.changeLayers = this.changeLayers.bind(this);
    this.changeHue = this.changeHue.bind(this);
    this.onRotate = this.onRotate.bind(this);

    this.state = {
      points: 4,
      layers: 4,
      hue: 25,
      isRotated: true,
    };
  }

  changePoints(event) {
    this.setState({ points: event.target.value });
  }

  changeLayers(event) {
    this.setState({ layers: event.target.value });
  }

  changeHue(event) {
    this.setState({ hue: event.target.value });
  }

  onRotate() {
    console.log('changing rotation state', this.state.isRotated);
    this.setState(prevState => ({ isRotated: !prevState.isRotated }));
  }

  render() {
    const squares = Array(100)
      .fill(0)
      .map((_, i) => (
        <Square
          key={i}
          hue={this.state.hue}
          index={i}
          points={this.state.points}
          layers={this.state.layers}
          isRotated={this.state.isRotated}
        />
      ));

    return (
      <div>
        <Commands
          points={this.state.points}
          layers={this.state.layers}
          hue={this.state.hue}
          isRotated={this.state.isRotated}
          changeHue={this.changeHue}
          changePoints={this.changePoints}
          changeLayers={this.changeLayers}
          onRotate={this.onRotate}
        />
        <ContainerDiv>{squares}</ContainerDiv>
      </div>
    );
  }
}

export default SquaresContainer;
