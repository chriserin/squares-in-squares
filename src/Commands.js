import React, { Component } from 'react';
import glam from 'glamorous';

const Label = glam.label({
  padding: '4px',
  display: 'block',
  width: '300px',
});

const LabelSpan = glam.span({
  width: '110px',
  display: 'inline-block'
});

const Input = glam.input({
  marginLeft: '8px',
});

const FieldSet = glam.fieldset({
  width: '300px',
  float: 'left',
});

const Number = ({label, type, number, min, max, value, onChange, step}) => (
  <Label>
    <LabelSpan>{ label }</LabelSpan>
    <Input type="number" type={type} number={number} min={min} max={max} value={value} onChange={onChange} step={ step || 1 } />
  </Label>
)

const Rotate = ({label, status, onRotate}) => (
  <Label>
    <LabelSpan>{label}</LabelSpan>
    <a href='#' onClick={onRotate} >{status}</a>
  </Label>
)

class Commands extends Component {

  render() {
    const Container = glam.div({
      overflow: 'auto',
      width: '100%',
      textAlign: 'left'
    });

    let rotateStatus = null;
    if (this.props.isRotated) {
      rotateStatus = "Rotated";
    } else {
      rotateStatus = "Not Rotated";
    }

    return (
      <Container>
        <FieldSet>
          <Number label="Sides" type='number' min='3' max='8' value={this.props.points} onChange={this.props.changePoints }/>
          <Rotate label="Rotate" status={rotateStatus} onRotate={this.props.onRotate} />
          <Number label="Hue" step="25" type='number' min='0' max='255' value={this.props.hue} onChange={this.props.changeHue }/>
        </FieldSet>
        <FieldSet>
          <Number label="Layers" type='number' min='2' max='8' value={this.props.layers} onChange={this.props.changeLayers }/>
        </FieldSet>
      </Container>
    );
  }
}

export default Commands;
