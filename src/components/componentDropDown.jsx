import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";

const ComponentDropDown = (props) => {
  const { finalComponentArray, onComponent } = props;
  console.log(finalComponentArray);
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Select Component
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {finalComponentArray.map((comp, index) => (
          <Dropdown.Item key={comp.name} onClick={() => onComponent(index)}>
            {comp.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ComponentDropDown;
