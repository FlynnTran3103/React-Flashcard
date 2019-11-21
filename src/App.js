import React, { Component } from "react";
import "./App.css";
import "./Card/Card";
import "./DrawButton/DrawButton";
import firebase, { app } from "firebase/app";
import "firebase/database";
import { DB_CONFIG } from "./Config/Firebase/db_config";
export class App extends Component {
  constructor(props) {
    super(props);
    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app
      .database()
      .ref()
      .child("card");
    this.updateCard = this.updateCard.bind(this);
    this.state = {
      card: [],
      currentCard: {}
    };
  }
  componentWillMount() {
    console.log(
      this.app
        .database()
        .ref()
        .child("card")
    );
    const currentCard = this.state.card;
    this.database.on("child_added", snap => {
      currentCard.push({
        id: snap.key,
        eng: snap.val().end,
        han: snap.val().han,
        pin: snap.val().pin
      });
    });
  }
  render() {
    return <div></div>;
  }
}

export default App;
