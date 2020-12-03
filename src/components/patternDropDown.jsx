import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";

const PatternDropdownComp = (props) => {
  const { onPattern, patternArray } = props;
  // const patternsArray = getPatterns();

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Select Pattern
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {patternArray.map((pattern, index) => (
          <Dropdown.Item onClick={() => onPattern(index)}>
            {pattern.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PatternDropdownComp;
