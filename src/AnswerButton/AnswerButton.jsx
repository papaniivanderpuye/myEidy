import React, { Component } from "react";
import "./AnswerButton.css";
//import { Button } from "react-bootstrap";

class AnswerButton extends Component {
  constructor(props) {
    super(props);

    this.check = this.check.bind(this);

    this.state = {
      color: "primary"
    };
  }

  check() {
    this.props.check(this.props.potentialAnswer, this.props.index);
  }

  reset() {
    this.setState({
      color: "primary"
    });
  }

  /*
  <button className = "answerButton" onClick= {this.check}>
    {this.props.potentialAnswer}
  </button>
  */

  render(props) {
    return (
      <div className="buttonContainer">
        <button className={this.props.color} bsstyle={this.props.color} onClick={this.check}>
          {this.props.potentialAnswer}
        </button>
        <br />
        <br />
      </div>
    );
  }
}

export default AnswerButton;
