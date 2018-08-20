import React, { Component } from "react";
import { render, findDOMNode } from "react-dom";
import "./App.css";
import _ from "underscore";
//import { Alert, Panel, FormControl } from "react-bootstrap";
import DrawButton from "./DrawButton/DrawButton";
import AnswerButton from "./AnswerButton/AnswerButton";

class App extends Component {
  constructor(props) {
    super(props);
    this.updateCard = this.updateCard.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.switchPage = this.switchPage.bind(this);
    this.updateInputValueTerm = this.updateInputValueTerm.bind(this);
    this.addToFlashCards = this.addToFlashCards.bind(this);
    this.deleteCards = this.deleteCards.bind(this);
    this.checkSetSize = this.checkSetSize.bind(this);
    this.slots = [];
    this.responseList = [];
    this.answers = [];
    var newList = this.repeat(["button"], 5);


    this.state = {
      cards: [],
      currentCard: {},
      randomAnswers: [],
      responseToAnswer: "Waiting",
      alert: "warning",
      buttonClassList: newList,
      FlashCardAdd: true,
      inputValueTerm: "",
      inputValueDef: "",
      interactionFeedback: " ",
      setSizeFeedback: " ",
      tableName: "Default Set",
      addlayoutClass:"layout",
      studylayoutClass: "layout1"
    };
    this.dict = [
      {
        term: "How did the griots perform?",
        definition: "music, dance, and drama"
      },
      {
        term: "What did griots do for their people?",
        definition:
          "Kept records and history through oral tradition, passed on through generations"
      },
      {
        term:
          "What is a popular or wise saying that teaches morals and values?",
        definition: "Proverb"
      },
      {
        term: "Who was Sundjata Keita?",
        definition: "The king who founded the Mali empire"
      },
      {
        term:
          "What is a story about clever animals or humans who outsmart others?",
        definition: "Trickster tale"
      },
      {
        term: "How did rulers rely on griots?",
        definition: "As a trusted advisor to keep their records"
      },
      {
        term:
          "What ways did West Africans adopted Islamic religious practices?",
        definition:
          "They learned the Five Pillars of Islam,They fasted, worshipped in mosques, and went on pilgrimages."
      },
      {
        term:
          "What are three ways that Islamic value for education influenced West Africa?",
        definition:
          "Timbuktu became a center of learning with many universities, Local schools were set up where children could learn the Qur'an, Muslims' love of books led to the development of large libraries."
      }
    ];
    this.userDict = [];
  }

  repeat(arr, n) {
    var a = [];
    for (var i = 0; i < n; [i++].push.apply(a, arr));
    return a;
  }

  

  componentWillMount() {
    const currentCards = this.state.cards;
    var i;
    for (i = 0; i < this.dict.length; i++) {
      currentCards.push(this.dict[i]);
    }
    var newList = this.repeat(["button"], 5);
    this.setState({
      cards: currentCards,
      currentCard: this.getRandomCard(currentCards),
      randomAnswers: this.slots,
      buttonClassList: newList
    });
  }

  updateCard() {
    this.responseList = [];
    this.slots = [];
    this.answers = [];
    const currentCards = this.state.cards;
    var checked = "Waiting";
    var myAlert = "warning";

    this.setState(prevState => ({
      buttonClassList: this.repeat(["button"], 5),
      currentCard: this.getRandomCard(currentCards),
      randomAnswers: this.slots,
      responseToAnswer: checked,
      alert: myAlert
    }));
  }

  checkAnswer(response, index) {
    var newList = this.state.buttonClassList;
    newList[index] = "button primary";

    this.setState(prevState => ({
      buttonClassList: newList
    }));

    this.responseList.push(response);

    if (this.responseList.length === this.answers.length) {
      var rightAnswerList = false;
      this.responseList.sort();
      this.answers.sort();
      rightAnswerList = _.isEqual(this.responseList, this.answers);
      this.answerFeedBackDisplay(rightAnswerList);
    }
  }

  answerFeedBackDisplay(rightAnswerList) {
    var checked = "Wrong!";
    var myAlert = "danger";
    if (rightAnswerList) {
      checked = "Correct!";
      myAlert = "success";
    }
    this.setState(prevState => ({
      responseToAnswer: checked,
      alert: myAlert
    }));
  }
  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  getRandomCard(currentCards) {
    var card = currentCards[Math.floor(Math.random() * currentCards.length)];
    var answers = card.definition;
    var cards = currentCards;
    if (answers) {
      this.answers = answers.split(",");
      this.slots = [];
      this.slots = this.slots.concat(this.answers);

      while (this.slots.length < 5) {
        var newCard = cards[Math.floor(Math.random() * cards.length)];
        var newCardAnswers = newCard.definition;
        var newCardAnswerList = newCardAnswers.split(",");

        this.slots.push(newCardAnswerList[0]);
      }
    this.slots =this.shuffle(this.slots);

    }
    return card;
  }

  switchPage() {
    if (this.state.FlashCardAdd) {
      if (this.userDict.length > 4) {
        var myList = this.userDict;
        this.setState({ cards: myList, }, () => {
          
          this.updateCard();
           
          this.setState(prevState =>({ 
            
            FlashCardAdd: false, }));
        });
      } else {
        this.setState({ cards: this.dict }, () => {
          this.updateCard();
          console.log(this.state.studylayoutClass);
          this.setState(prevState =>({
            FlashCardAdd: false,
          
            
          }));
        });
      }
    } else {
      this.setState(prevState => ({
        interactionFeedback: " ",
        setSizeFeedback: " ",
        FlashCardAdd: true,
      }));
    }
  }

  renderButtonList(myHandler, colorList) {
    return (
      <div>
        {this.state.randomAnswers.map(function(name, index) {
          return (
            <AnswerButton
              className={colorList[index]}
              color={colorList[index]}
              key={index}
              index={index}
              potentialAnswer={name}
              check={myHandler}
            />
          );
        })}
      </div>
    );
  }

  updateInputValueTerm(evt) {
    this.setState({
      inputValueTerm: evt.target.value
    });
  }

  handleKeyDown(event) {
    if (event.keyCode === 9) {
      // tab was pressed
      event.preventDefault();
      var val = this.state.inputValueTerm,
        start = event.target.selectionStart,
        end = event.target.selectionEnd;
      this.setState({
        inputValueTerm: val.substring(0, start) + "\t" + val.substring(end)
      });
    }
  }

  addToFlashCards() {
    var rawText = this.state.inputValueTerm;
    if (rawText.length < 1) {
      this.setState({
        interactionFeedback: "No terms to add"
      });
      return;
    }

    var listOfTerms = rawText.split("\n");

    var i;
    for (i = 0; i < listOfTerms.length; i++) {
      var flashcard = listOfTerms[i];
      if (flashcard === "") {
        continue;
      }
      var cardTuple = flashcard.split("\t");

      if (cardTuple.length !== 2) {
        continue;
      }
      this.userDict.push({
        term: cardTuple[0],
        definition: cardTuple[1]
      });
    }

    var response = this.checkSetSize(this.userDict.length);
    this.setState({
      cards: this.userDict,
      inputValueTerm: "",
      inputValueDef: "",
      interactionFeedback: "Terms have been Added to Set!",
      tableName: "Your Set",
      setSizeFeedback: response
    });
  }
  checkSetSize(setlength) {
    var termsNeeded = 5 - setlength;
    if (termsNeeded > 0) {
      return "You need " + termsNeeded.toString() + " more to use your own set";
    }
    return "You have enough to Study your set!";
  }
  deleteCards() {
    if (this.userDict.length > 0) {
      this.userDict.length = 0;
    }
    this.setState({
      tableName: "Default Set",
      cards: this.userDict,
      interactionFeedback: "Set has been deleted.",
      setSizeFeedback: " "
    });
  }

  createTable(myCards) {
    let table = [];

    let children = [];
    children.push(<th>{"Term"}</th>);
    children.push(<th>{"Definition"}</th>);
    table.push(<tr>{children}</tr>);

    for (let i = 0; i < myCards.length; i++) {
      let children = [];
      children.push(<td>{myCards[i].term}</td>);
      children.push(<td>{myCards[i].definition}</td>);
      table.push(<tr>{children}</tr>);
    }
    return table;
  }


  renderFlashCardAdd() {
    return (
      <div className="content">
        <div className="layout">
          <h1>Eidi.ty</h1>
          <p>
            Welcome! You can add as many terms as you want,
            <br />
            Or click the <strong>Study Questions </strong> button to use the
            default flashcard set!
            <br />
            Your set size must be at least five to user your own set.
          </p>
          <strong>{this.state.interactionFeedback}</strong>
          <br />
          <strong>{this.state.setSizeFeedback}</strong>
          <textarea
            className="textInput"
            type="text"
            value={this.state.inputValueTerm}
            placeholder="
             How did the griots perform? (press tab) music, dance, and drama"
            onChange={this.updateInputValueTerm}
            onKeyDown={this.handleKeyDown.bind(this)}
          />
          <br />
          <br />
          <div className="addButton">
            <button onClick={this.addToFlashCards} className="button">
              Add to Set
            </button>
          </div>
          <br />
          <div className="addButton">
            <button onClick={this.deleteCards} className="button primary">
              Delete Set
            </button>
          </div>
          <br />
          <div className="switchButton">
            <button className="button navigation" onClick={this.switchPage}>
              Study Questions
            </button>
          </div>

          <br />
        </div>
        <br />
        <br />
        <div id="customers">
          <h2 className="tableTitle">{this.state.tableName}</h2>
          <table><tbody>{this.createTable(this.state.cards)}</tbody></table>
        </div>
      </div>
    );
  }

  renderMainPage() {
    return (
      <div className="content">
        <div className="layout1">
          <h1> {this.state.responseToAnswer} </h1>
          <p>{this.state.currentCard.term}</p>

          <div className="bRow">
            {this.renderButtonList(
              this.checkAnswer,
              this.state.buttonClassList
            )}
          </div>
          <div className="buttonRow">
            <DrawButton className="button primary" drawCard={this.updateCard} />
          </div>
          <br />

          <div className="switchButton">
            <button className="button navigation " onClick={this.switchPage}>
              Add More Questions
            </button>
          </div>
        </div>
   
      </div>
    );
  }

  render() {
    if (this.state.FlashCardAdd) {
      return <div className="App">{this.renderFlashCardAdd()}</div>;
    } else {
      return <div className="App">{this.renderMainPage()}</div>;
    }
  }
}

export default App;
