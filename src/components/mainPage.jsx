import React, { Component, useRef } from "react";
import Canvas from "./canvas";
import PatternDropdownComp from "./patternDropDown";
import NavBar from "./navBar";
import PocketDropDown from "./pocketDropDown";
import CollarDropDown from "./collarDropDown";
import { ChromePicker } from "react-color";
import { Button } from "react-bootstrap";

class MainPage extends Component {
  state = { background: "#ffffff" };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };

  render() {
    return (
      <div>
        <header>
          <NavBar />
        </header>
        <div className="row">
          <Button
            className="btn-danger ml-4 mt-2"
            onClick={this.props.onImport}
          >
            Import
          </Button>
          <Button className="btn-success ml-2" onClick={this.props.onAddNew}>
            Add New
          </Button>
        </div>
        <div className="row">
          <div className="col-xl m-2">
            <div className="row m-2">
              <PatternDropdownComp
                onPattern={this.props.onPattern}
                patternArray={this.props.patternArray}
              />
            </div>
            <div className="row m-2">
              <input onChange={this.props.onHandleInput}></input>
            </div>
            <div className="row m-2">
              <PocketDropDown onPocket={this.props.onPocket} />
            </div>
            <div className="row m-2">
              <CollarDropDown onCollar={this.props.onCollar} />
            </div>
            <div className="row ml-2">
              <h4>
                Aprox. Cost: <br></br> ₹{" " + this.props.cost}
              </h4>
            </div>
          </div>
          <div className="col-xl m-2">
            <div>
              <ChromePicker
                color={this.state.background}
                onChangeComplete={this.handleChangeComplete}
              />
              <Button
                className="btn-success"
                onClick={() => this.props.onPattern("blank")}
              >
                Switch to Coloring
              </Button>
            </div>
          </div>
          <div className="col-xl m-2">
            <Canvas
              xPattern={this.props.xPattern}
              xShirt={this.props.xShirt}
              xShirtMask={this.props.xShirtMask}
              xPocket={this.props.xPocket}
              xCollar={this.props.xCollar}
              pickedColor={this.state.background}
              patternURL={this.props.patternURL}
              patternArray={this.props.patternArray}
            ></Canvas>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
