import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { getPockets } from "../services/photoService";

const PocketDropDown = (props) => {
  const { onPocket } = props;
  const pocketsArray = getPockets();
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Select Pocket
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {pocketsArray.map((pocket, index) => (
          <Dropdown.Item onClick={() => onPocket(index)}>
            {pocket.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PocketDropDown;
