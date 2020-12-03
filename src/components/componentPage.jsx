import React, { Component } from "react";
import NavBar from "./navBar";
import { db, auth } from "../services/firebase";

class ComponentPage extends Component {
  state = { compPatternArray: [] };
  componentDidMount = () => {
    db.collection("patterns")
      .get()
      .then((snapshot) => {
        let patArray = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          patArray.push(data);
        });
        this.setState({ compPatternArray: patArray });
      })
      .catch((error) => console.log(error));
  };
  render() {
    return (
      <div>
        <header>
          <NavBar />
        </header>
        {this.state.compPatternArray.map((pat) => (
          <h1>{pat.name}</h1>
        ))}
      </div>
    );
  }
}

export default ComponentPage;
