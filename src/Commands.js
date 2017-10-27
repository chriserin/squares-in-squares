import React, { Component } from "react";
import glam from "glamorous";

const FieldSet = glam.div({
  border: "none",
  boxSizing: "border-box",
  display: "flex",
  flexWrap: "wrap",
  padding: "1rem",
  width: "100%"
});

const Label = glam.label({
  boxSizing: "border-box",
  display: "block",
  padding: "4px",
  whiteSpace: "nowrap",
  minWidth: "50%"
});

const LabelSpan = glam.strong({
  display: "inline-block",
  width: "110px"
});

const Input = glam.input({
  border: "solid 0.1rem #CCC",
  borderRadius: "0.2rem",
  boxShadow: "none",
  minWidth: "10rem",
  padding: "0.7rem 1rem"
});

const Number = ({ label, type, number, min, max, value, onChange, step }) => (
  <Label>
    <LabelSpan>{label}</LabelSpan>
    <Input
      type="number"
      type={type}
      number={number}
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      step={step || 1}
    />
  </Label>
);

const Rotate = ({ label, status, onRotate }) => (
  <Label>
    <LabelSpan>{label}</LabelSpan>
    <a href="#" onClick={onRotate}>
      {status}
    </a>
  </Label>
);

class Commands extends Component {
  render() {
    const Container = glam.div({
      overflow: "auto",
      width: "100%",
      textAlign: "left"
    });

    let rotateStatus = null;
    if (this.props.isRotated) {
      rotateStatus = "Rotated";
    } else {
      rotateStatus = "Not Rotated";
    }

    return (
      <Container>
        <FieldSet className="fieldset">
          <Number
            label="Sides"
            type="number"
            min="3"
            max="8"
            value={this.props.points}
            onChange={this.props.changePoints}
          />
          <Rotate
            label="Rotate"
            status={rotateStatus}
            onRotate={this.props.onRotate}
          />
          <Number
            label="Hue"
            step="25"
            type="number"
            min="0"
            max="255"
            value={this.props.hue}
            onChange={this.props.changeHue}
          />
          <Number
            label="Layers"
            type="number"
            min="2"
            max="8"
            value={this.props.layers}
            onChange={this.props.changeLayers}
          />
        </FieldSet>
      </Container>
    );
  }
}

export default Commands;
