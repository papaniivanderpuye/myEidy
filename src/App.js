import React, { Component } from 'react';
import './App.css';
import _ from 'underscore'
import {Alert,Panel } from 'react-bootstrap';
import DrawButton from './DrawButton/DrawButton';
import AnswerButton from './AnswerButton/AnswerButton';
import firebase from 'firebase/app';
import 'firebase/database';

import {DB_CONFIG} from './Config/Firebase/db_config';

class App extends Component {
  constructor(props) {
    super(props);
    //this.app = firebase.initializeApp(DB_CONFIG);
    this.app =  !firebase.apps.length ? firebase.initializeApp(DB_CONFIG) : firebase.app();
    this.database= this.app.database().ref().child('cards');
    this.updateCard = this.updateCard.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);

    this.slots =[];
    this.responseList =[];
    this.answers =[];
    var newList = this.repeat(["primary"],5);
    this.state = {
      cards: [],
      currentCard: {},
      randomAnswers: [],
      responseToAnswer: "waiting",
      alert: "warning",
      buttonColorList: newList

    };
  };

  repeat(arr, n){
  var a = [];
  for (var i=0;i<n;[i++].push.apply(a,arr));
  return a;
  }

  handleSubmit() {
   this.database.push({
      term: 'username',
      definition: 'definition'
   });
   //this.setState({text: ""});
  }

  componentWillMount(){
    const currentCards = this.state.cards;
    this.database.on('child_added', snap => {
     currentCards.push({
       id: snap.key,
       term: snap.val().term,
       definition: snap.val().definition,
     })
     if(currentCards.length>1){
       var newList = this.repeat(["primary"],5);
       this.setState({
         cards: currentCards,
         currentCard: this.getRandomCard(currentCards),
         randomAnswers:this.slots,
         buttonColorList:newList
       })
     }
   })

 };

 updateCard(){
   this.responseList=[];
   this.slots=[];
   this.answers=[];
   const currentCards = this.state.cards;
   var checked="Waiting";
   var myAlert = "warning";

   this.setState(prevState => ({
     buttonColorList: this.repeat(["primary"],5),
     currentCard: this.getRandomCard(currentCards),
     randomAnswers:this.slots,
     responseToAnswer:checked,
     alert: myAlert,
   }));

 };

 checkAnswer(response,index){
   var newList = this.state.buttonColorList;
   newList[index]= "success";

   this.setState(prevState => ({
     buttonColorList: newList
   }))

   this.responseList.push(response);


   if (this.responseList.length=== this.answers.length )
   {
     var rightAnswerList=false;
     this.responseList.sort();
     this.answers.sort();
     rightAnswerList=  _.isEqual(this.responseList, this.answers);
     this.answerFeedBackDisplay(rightAnswerList);
   }



 };

 answerFeedBackDisplay(rightAnswerList) {
   var checked="Wrong!";
   var myAlert = "danger";
   if(rightAnswerList){
     checked="Correct!";
     myAlert = "success";
   }
   this.setState(prevState => ({
     responseToAnswer:checked,
     alert: myAlert
   }))
 };


  getRandomCard(currentCards) {
    var card = currentCards[Math.floor(Math.random()*currentCards.length)];
    var answers = card.definition;

    var cards = currentCards;
    if(answers){
      var result = answers.split(",");
      this.answers = result;


      this.slot =this.slots.concat(result);
      while (this.slots.length<5){
        var newCard = cards[Math.floor(Math.random()*cards.length)];
        var newCardAnswers = newCard.definition;
        var newCardAnswerList = newCardAnswers.split(",");

        this.slots.push(newCardAnswerList[0]);

      }
    }
    return (card);
  };




  renderButtonList(myHandler,colorList) {
      return (
				<div >
					{
						this.state.randomAnswers.map(function(name, index){
					return (
          <AnswerButton class="ansButton"
             color = {colorList[index]}
             key = {index}
             index = {index}
            potentialAnswer={name}
            check = {myHandler}
          />
          )

					})}
				</div>
      );

  };

  render() {
      return (
        <div className="App">
          <Alert bsStyle={this.state.alert}>
            <strong>{this.state.responseToAnswer}</strong>
          </Alert>

          <div className="questionRow">
            <Panel bsStyle="primary">
              <Panel.Body>{this.state.currentCard.term}</Panel.Body>
            </Panel>
          </div>
          <div className="bRow">
          {this.renderButtonList(this.checkAnswer,this.state.buttonColorList)}
          </div>
          <div className="buttonRow">
            <DrawButton drawCard= {this.updateCard}  />
          </div>
          <br/>
          <br/>
          <p>term</p>
          <input className="fireBaseInput" type="text" />
          <p>definition</p>
          <input className="fireBaseInputDef" type="text" />
          <button onClick= {this.handleSubmit}>add to collection</button>
        </div>
            );



  };
}


export default App;
