import React, { Component } from 'react';
import './App.css';
import Card from './Card/Card';
import DrawButton from './DrawButton/DrawButton';

class App extends Component {
  constructor(props) {
    super(props);

    this.updateCard = this.updateCard.bind(this)


    this.state = {
      cards: [
        {id:1 , term:"Term", definition: "definition"},
        {id:2 , term:"Term2", definition: "definition2"},
        {id:3 , term:"Term3", definition: "definition3"},
        {id:4 , term:"Term4", definition: "definition4"},
        {id:5 , term:"Term5", definition: "definition5"}
      ],
      currentCard: {}
    }
  }

  componentWillMount(){
    const currentCards = this.state.cards;

    this.setState({
      cards: currentCards,
      currentCard: this.getRandomCard(currentCards)
    })
  }

  getRandomCard(currentCards) {
    var card = currentCards[Math.floor(Math.random()*currentCards.length)]
    return(card);
  }

  updateCard(){
    const currentCards = this.state.cards;
    this.setState({
      currentCard: this.getRandomCard(currentCards)
    })
  }















  render() {
    return (
      <div className="App">
        <div className="cardRow">
          <Card term={this.state.currentCard.term}
                definition={this.state.currentCard.definition}
            />

        </div>
        <div className="buttonRow">
          <DrawButton drawCard= {this.updateCard}  />

        </div>



      </div>
    );
  }
}









export default App;
