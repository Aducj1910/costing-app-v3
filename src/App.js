import React, { Component } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import MainPage from "./components/mainPage";
import {
  getShirtMasks,
  getShirts,
  getPatterns,
  getPockets,
  getCollars,
} from "./services/photoService";
import { db, auth } from "./services/firebase";
import { Route, Switch } from "react-router-dom";
import ComponentPage from "./components/componentPage";
import ImportComponentPage from "./components/importComponentPage";
import FormImpl from "react-bootstrap/esm/Form";

class App extends Component {
  state = {
    xPattern: "blank",
    xShirt: 0,
    xShirtMask: 0,
    xPocket: 0,
    xCollar: 0,
    xComponent: 0,
    patternURL: null,
    cost: 0,
    dataPassed: false,
    clearScreenSwitch: false,
    dataPassedConst: 0,
    patternNames: null,
    componentFiles: null,
    componentMaskFiles: null,
    componentPatternFiles: null,
    componentName: null,
    componentURL: null,
    patternArray: [],
    patternImgData: null,
    componentArray: [],
    componentComp: null,
    maskComp: null,
    maskArray: [],
    patternComp: null,
    removeBgSwitch: false,
    componentSaveSwitch: false,
    finalComponentArray: [],
    finalComponentName: null,
    componentRenderSwitch: false,
  };

  // componentDidMount() {
  //   db.collection("patterns")
  //     .get()
  //     .then((snapshot) => {
  //       let students = [];
  //       snapshot.forEach((doc) => {
  //         const data = doc.data();
  //         students.push(data);
  //       });
  //       this.setState({ students });
  //       console.log(this.state.students);
  //     })
  //     .catch((error) => console.log(error));
  // }

  handleImport = () => {
    db.collection("patterns")
      .get()
      .then((snapshot) => {
        let patArray = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          patArray.push(data);
        });
        this.setState({ patternArray: patArray });
      })
      .catch((error) => console.log(error));
  };

  handleComponentImport = () => {
    db.collection("componentsFinal")
      .get()
      .then((snapshot) => {
        let pvtCompArray = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          pvtCompArray.push(data);
        });
        this.setState({ finalComponentArray: pvtCompArray });
      })
      .catch((error) => console.lof(error));
  };

  // addNewPattern = () => {
  //   db.collection("patterns").add({
  //     comp:
  //       "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png",
  //     cost: 200,
  //     name: "YellowDragon",
  //   });
  // };

  handlePattern = (pattern) => {
    let xPattern = pattern;
    this.setState({ xPattern });
    this.getCost();
  };

  handleComponent = (component) => {
    let xComponent = component;
    this.setState({ xComponent, componentRenderSwitch: true });
    this.getCost();
  };

  handleAddNew = () => {
    this.setState({ dataPassed: false });
  };

  handlePocket = (pocket) => {
    let xPocket = pocket;
    this.setState({ xPocket });
    this.getCost();
  };

  handleCollar = (collar) => {
    let xCollar = collar;
    this.setState({ xCollar });
    this.getCost();
  };

  handleInput = (event) => {
    console.log(event.target.value);
    this.setState({ patternURL: event.target.value, xPattern: "custom" });
    this.getCost();
  };

  getCost = () => {
    let patternCost = 0;
    let patternArray = getPatterns();
    if (Number.isInteger(this.state.xPattern)) {
      patternCost = patternArray[this.state.xPattern].cost;
    } else if (this.state.xPattern === "blank") {
      patternCost = 85;
    } else if (this.state.xPattern === "custom") {
      patternCost = 250;
    }

    let componentCost = this.state.finalComponentArray[this.state.xComponent]
      .cost;

    let shirtArray = getShirts();
    let shirtCost = shirtArray[this.state.xShirt].cost;
    let pocketArray = getPockets();
    let pocketCost = pocketArray[this.state.xPocket].cost;
    let collarArray = getCollars();
    let collarCost = collarArray[this.state.xCollar].cost;

    let totalCost =
      patternCost + shirtCost + pocketCost + collarCost + componentCost;
    this.setState({ cost: totalCost });
  };

  //Initial input functions

  handlePatternNames = (event) => {
    this.setState({ patternNames: event.target.value });
  };

  handlePatternFiles = (event) => {
    this.setState({ patternFiles: event.target.files });
  };

  handleComponentFiles = (event) => {
    this.setState({ componentFiles: event.target.files });
  };

  handleComponentMaskFiles = (event) => {
    this.setState({ componentMaskFiles: event.target.files });
  };

  handleComponentPatternFiles = (event) => {
    this.setState({ componentPatternFiles: event.target.files });
  };

  handleComponentName = (event) => {
    this.setState({ componentName: event.target.value });
  };

  handleFinalComponentName = (event) => {
    this.setState({ finalComponentName: event.target.value });
  };

  handleClearScreen = () => {
    this.setState({ clearScreenSwitch: true });
  };

  handleBgRemove = () => {
    this.setState({ removeBgSwitch: true });
  };

  handleComponentSave = () => {
    this.setState({ componentSaveSwitch: true });
  };

  compileComponents = (fileTypeSwitch) => {
    let localComponentArray = this.state.componentArray;
    let componentFiles = [];
    if (
      fileTypeSwitch == "MainComponent" &&
      this.state.componentFiles !== null
    ) {
      componentFiles = Array.from(this.state.componentFiles);
    } else if (
      fileTypeSwitch == "MaskComponent" &&
      this.state.componentMaskFiles !== null
    ) {
      componentFiles = Array.from(this.state.componentMaskFiles);
    } else if (
      fileTypeSwitch == "PatternComponent" &&
      this.state.componentPatternFiles !== null
    ) {
      componentFiles = Array.from(this.state.componentPatternFiles);
    }

    console.log(componentFiles);
    componentFiles.forEach(
      function (item, index) {
        let imageFile = item;
        var reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onloadend = function (e) {
          var myImage = new Image();
          myImage.src = e.target.result;
          db.collection("componentsRaw").add({
            comp: e.target.result,
            cost: 40,
            name: this.state.componentName,
          });
          myImage.onload = function (ev) {
            let myNewObj = {
              comp: myImage,
              cost: 40,
              name: this.state.componentName,
            };
            localComponentArray.push(myNewObj);
            if (fileTypeSwitch == "MainComponent") {
              console.log(e.target.result);
              this.setState({
                componentArray: [localComponentArray],
                componentComp: e.target.result,
                clearScreenSwitch: false,
                componentFiles: null,
                removeBgSwitch: false,
                componentSaveSwitch: false,
              });
            } else if (fileTypeSwitch == "MaskComponent") {
              this.setState({
                maskArray: [localComponentArray],
                maskComp: e.target.result,
                clearScreenSwitch: false,
                componentMaskFiles: null,
                removeBgSwitch: false,
                componentSaveSwitch: false,
              });
            } else if (fileTypeSwitch == "PatternComponent") {
              this.setState({
                patternComp: e.target.result,
                clearScreenSwitch: false,
                componentPatternFiles: null,
                removeBgSwitch: false,
                componentSaveSwitch: false,
              });
            }
          }.bind(this);
        }.bind(this);
      }.bind(this)
    );
  };

  compilePattern = () => {
    let localPatternNamesArray = this.state.patternNames.split(" ");
    let patternFiles = this.state.patternFiles;
    let localPatternArray = this.state.patternArray;

    patternFiles = Array.from(patternFiles);
    if (patternFiles.length === localPatternNamesArray.length) {
      patternFiles.forEach(
        function (item, index) {
          let imageFile = item;
          var reader = new FileReader();
          reader.readAsDataURL(imageFile);
          reader.onloadend = function (e) {
            var myImage = new Image();
            myImage.src = e.target.result;
            //Upload src, cost, name to Firestore and then import it in canvas.jsx and paste the
            //below code to the canvas.jsx
            console.log(e.target.result);
            db.collection("patterns").add({
              comp: e.target.result,
              cost: 100,
              name: localPatternNamesArray[index],
            });
            myImage.onload = function (ev) {
              let myNewObj = {
                comp: myImage,
                cost: 100,
                name: localPatternNamesArray[index],
              };
              localPatternArray.push(myNewObj);
              this.setState({
                patternArray: localPatternArray,
                dataPassed: true,
              });
            }.bind(this);
          }.bind(this);
        }.bind(this)
      );
    }
  };

  onSkip = () => {
    this.setState({ dataPassed: true });
  };

  render() {
    if (this.state.dataPassed) {
      return (
        <div>
          <Switch>
            <Route path="/" exact>
              <MainPage
                xPattern={this.state.xPattern}
                xShirt={this.state.xShirt}
                xShirtMask={this.state.xShirtMask}
                xPocket={this.state.xPocket}
                xCollar={this.state.xCollar}
                onPattern={this.handlePattern}
                onPocket={this.handlePocket}
                onCollar={this.handleCollar}
                onHandleInput={this.handleInput}
                patternURL={this.state.patternURL}
                cost={this.state.cost}
                patternArray={this.state.patternArray}
                onImport={this.handleImport}
                onAddNew={this.handleAddNew}
                onComponentImport={this.handleComponentImport}
                finalComponentArray={this.state.finalComponentArray}
                xComponent={this.state.xComponent}
                onComponent={this.handleComponent}
                componentRenderSwitch={this.state.componentRenderSwitch}
              />
            </Route>
            <Route path="/components" exact>
              <ComponentPage />
            </Route>
            <Route path="/importcomponent" exact>
              <ImportComponentPage
                onHandleComponentFiles={this.handleComponentFiles}
                onHandleComponentMaskFiles={this.handleComponentMaskFiles}
                onHandleComponentPatternFiles={this.handleComponentPatternFiles}
                onCompileComponents={this.compileComponents}
                onComponentName={this.handleComponentName}
                componentURL={this.state.componentURL}
                componentComp={this.state.componentComp}
                maskComp={this.state.maskComp}
                patternComp={this.state.patternComp}
                onClearScreen={this.handleClearScreen}
                clearScreenSwitch={this.state.clearScreenSwitch}
                onBgRemove={this.handleBgRemove}
                removeBgSwitch={this.state.removeBgSwitch}
                onComponentSave={this.handleComponentSave}
                componentSaveSwitch={this.state.componentSaveSwitch}
                finalComponentName={this.state.finalComponentName}
                onFinalComponentName={this.handleFinalComponentName}
              />
            </Route>
          </Switch>
        </div>
      );
    } else {
      return (
        <div>
          <div className="row">
            <div className="col-xl m-2">
              <h1 className="m-2">Pattern</h1>
              <br></br>
              <form>
                <label className="m-2">Name</label>
                <input type="text" onChange={this.handlePatternNames}></input>
                <br></br>
                <label className="m-2">Upload File</label>
                <input
                  type="file"
                  onChange={this.handlePatternFiles}
                  multiple
                ></input>
              </form>
              <br></br>
              <Button className="btn-success" onClick={this.compilePattern}>
                Done
              </Button>
              <br></br>
              <Button className="btn-success" onClick={this.onSkip}>
                Skip
              </Button>
            </div>
            <div className="col-xl m-2">
              <h1>Collar</h1>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
