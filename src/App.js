import React, { Component } from "react";
import "./App.css";
import Card from "./Card/Card";
import DrawButton from "./DrawButton/DrawButton";
import firebase from "firebase/app";
import "firebase/database";

var config = {
  apiKey: "AIzaSyAgq059-7ef1fqQmq8TkDKUJ5BBF15sSsQ",
  authDomain: "csprojec-78c08.firebaseapp.com",
  databaseURL: "https://csprojec-78c08.firebaseio.com",
  projectId: "csprojec-78c08",
  storageBucket: "csprojec-78c08.appspot.com",
  messagingSenderId: "443560699016"
};

class App extends Component {
  constructor(props) {
    super(props);

    this.app = firebase.initializeApp(config);
    this.database = this.app
      .database()
      .ref()
      .child("cards");
    this.updateCard = this.updateCard.bind(this);

    this.state = {
      cards: [],
      currentCard: {}
    };
  }

  componentWillMount() {
    console.log(
      this.app
        .database()
        .ref()
        .child("cards")
    );
    const currentCards = this.state.cards;
    this.database.on("child_added", snap => {
      currentCards.push({
        id: snap.key,
        eng: snap.val().eng,
        han: snap.val().han,
        pin: snap.val().pin
      });

      this.setState({
        cards: currentCards,
        currentCard: this.getRandomCard(currentCards)
      });
    });
  }

  getRandomCard(currentCards) {
    var randomIndex = Math.floor(Math.random() * currentCards.length);
    var card = currentCards[randomIndex];
    if (card === this.state.currentCard) {
      this.getRandomCard(currentCards);
    }

    return card;
  }

  updateCard() {
    const currentCards = this.state.cards;
    this.setState({
      cards: currentCards,
      currentCard: this.getRandomCard(currentCards)
    });
  }

  render() {
    return (
      <div className="App">
        <div className="cardRow">
          <Card
            eng={this.state.currentCard.eng}
            han={this.state.currentCard.han}
            pin={this.state.currentCard.pin}
          />
        </div>
        <div className="buttonRow">
          <DrawButton drawCard={this.updateCard} />
        </div>
      </div>
    );
  }
}

export default App;
