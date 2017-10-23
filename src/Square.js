import React, { Component } from 'react';
import glamorous from 'glamorous';
import ColorScheme from 'color-scheme';

class Square extends Component {

  constructor(props) {
    super(props);

    this.state = {
      points: this.determinePoints((this.props.index % 2 > 0) ? this.props.points : this.props.points, this.props.isRotated),
      color: this.determineColor(this.props.hue),
    };
  }


  componentWillReceiveProps(nextProps) {
    const points = this.determinePoints((nextProps.index % 2 > 0) ? nextProps.points : nextProps.points, nextProps.isRotated);
    const color = this.determineColor(nextProps.hue);

    this.setState((prevState) => ({
      points: points,
      oldColor: prevState.color,
      color: color,
      oldPoints: prevState.points
    }))

  }

  determinePoints(pointsNumber, isRotated) {
    const increment = 360 / pointsNumber;
    const startAngle = increment - ((this.props.index % 2 === 0 || isRotated) ? (increment / 2) : 0);

    const cx = 150;
    const cy = 150;

    let coords = [];

    const radius = Math.sqrt(2) / 2 * 100;

    for (let i = 0; i < pointsNumber; i++)
    {
      const angle = startAngle + increment * i;
      const rads = angle * Math.PI / 180;

      const tx = cx + radius * Math.cos(rads);
      const ty = cy + radius * Math.sin(rads);

      coords.push([tx, ty]);
    }

    for (let i = 0; i < 8 - pointsNumber; i++) {
      coords.splice(i, 0, coords[i]);
    }

    return coords;
  }

  determineColor(hue) {
    const scheme = new ColorScheme();
    scheme.from_hue(hue)
      .scheme('analogic')
      .variation('pastel');

    const colors = scheme.colors();
    return `#${colors[(this.props.index) % 3]}`;
  }

  render() {

    const OuterDiv = glamorous.div({
      height: '100px',
      width: '100px',
      float: 'left',
    });

    const InnerDiv = glamorous.div({
      position: 'relative',
      top: '-100px',
      left: '-100px',
      height: '300px',
      width: '300px',
      zIndex: (this.props.index % this.props.layers),
    });

    const SVG = glamorous.svg({
      height: '300px',
      width: '300px',
    });

    const Poly = glamorous.polygon({
      fill: this.state.color,
      stroke: 'black',
    });


    const pointsString = this.state.points.map((p) => `${p[0]},${p[1]}`).join(' ');

    let beginFn = null;
    let oldPointsString = null;
    if (this.state.oldPoints) {
      beginFn = (animate) => { if (animate) animate.beginElement(); }
      oldPointsString = this.state.oldPoints.map( (xy) => xy.join(",")).join(" ")
    } else {
      oldPointsString = pointsString;
    }

    let inner = null;
    if (this.props.index % 1 === 0) {
      inner = (
        <InnerDiv>
          <SVG>
            <Poly points={ pointsString } >
              <animate
                ref={ beginFn }
                fill="freeze"
                begin="indefinite"
                attributeName="points"
                dur="1000ms"
                from={ oldPointsString }
                to={ pointsString }
              />
              <animate
                ref={ beginFn }
                fill="freeze"
                begin="indefinite"
                attributeName="fill"
                dur="1000ms"
                from={ this.state.oldColor }
                to={ this.state.color }
              />
            </Poly>
          </SVG>
        </InnerDiv>
      );
    } else {
      inner = null;
    }

    return (
      <OuterDiv>
        { inner }
      </OuterDiv>
    );
  }
}

export default Square;
