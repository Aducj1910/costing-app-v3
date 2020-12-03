import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { getCollars } from "../services/photoService";

const CollarDropDown = (props) => {
  const { onCollar } = props;
  const collarsArray = getCollars();
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Select Collar
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {collarsArray.map((collar, index) => (
          <Dropdown.Item onClick={() => onCollar(index)}>
            {collar.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CollarDropDown;
