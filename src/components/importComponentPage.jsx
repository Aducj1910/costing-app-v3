import React, { Component } from "react";
import { Button } from "react-bootstrap";
import NavBar from "./navBar";
import SetupCanvas from "./setupCanvas";

class ImportComponentPage extends Component {
  state = {};

  render() {
    return (
      <div>
        <header>
          <NavBar />
        </header>
        <div className="row">
          <div className="col m-2">
            <SetupCanvas
              componentURL={this.props.componentURL}
              componentComp={this.props.componentComp}
              maskComp={this.props.maskComp}
              patternComp={this.props.patternComp}
              clearScreenSwitch={this.props.clearScreenSwitch}
              removeBgSwitch={this.props.removeBgSwitch}
              componentSaveSwitch={this.props.componentSaveSwitch}
            />
          </div>
          <div className="col m-1">
            <input
              type="file"
              onChange={this.props.onHandleComponentFiles}
            ></input>
            <input
              className="m-2"
              type="text"
              onChange={this.props.onComponentName}
            ></input>
            <Button
              className="btn-success"
              onClick={() => this.props.onCompileComponents("MainComponent")}
            >
              Component Upload Done
            </Button>
          </div>
        </div>
        {/* placeholder */}
        <div className="row m-2">
          <input
            type="file"
            onChange={this.props.onHandleComponentMaskFiles}
          ></input>
          <input
            className="m-2"
            type="text"
            onChange={this.props.onComponentName}
          ></input>
          <Button
            className="btn-success"
            onClick={() => this.props.onCompileComponents("MaskComponent")}
          >
            Mask Upload Done
          </Button>
          <Button className="btn-danger m-1" onClick={this.props.onClearScreen}>
            Clear Screen
          </Button>
          <Button className="btn-warning m-1" onClick={this.props.onBgRemove}>
            Clear mask
          </Button>
          <Button
            className="btn-primary m-1"
            onClick={this.props.onComponentSave}
          >
            Save
          </Button>
        </div>
        <div className="row m-2">
          <input
            type="file"
            onChange={this.props.onHandleComponentPatternFiles}
          ></input>
          <input
            className="m-2"
            type="text"
            onChange={this.props.onComponentName}
          ></input>
          <Button
            className="btn-success"
            onClick={() => this.props.onCompileComponents("PatternComponent")}
          >
            Pattern Upload Done
          </Button>
        </div>
      </div>
    );
  }
}

export default ImportComponentPage;
