import React, { Component } from 'react';
import './css/App.css';
import Column from './Column.js';
import Card from './Card.js';
import Dice from './Dice.js';
import ProgressBar from './ProgressBar.js';
import ProgressBtn from './ProgressBtn.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      backlogCards: [],
      analysisCards: [],
      developmentCards: [],
      testingCards: [],
      doneCards: [],
      unexpectedCards: [],
      progress: 0,
      diceValue: 0
    }

    this.handleCardClick = this.handleCardClick.bind(this);
  }

  reducePoints(array, points, key, pos=0) {
    var nextPos = pos +1;
    var currentPoints = array[pos][key];
    console.log(points);
      while(currentPoints > 0 && points > 0) {
       currentPoints --;
       points --;
      }
      array[pos][key] = currentPoints;
      this.setState({analysisCards: array});
        if(points > 0 && array[nextPos]) {
          this.reducePoints(array, points, key, nextPos)
        }
  }
  
  init() {
    var backlog = this.state.backlogCards;
    var analysis = this.cardGenerator(10);
    var development = this.state.developmentCards;
    var testing = this.state.testingCards;
    var done = this.state.doneCards;
    var unexpected = this.state.unexpectedCards;
    this.setState({analysisCards: analysis}) 
  }

  nextDay() {
    var number = this.state.progress + 20;
    if(number > 100) {
      number = 0;
    }
    this.init();
    this.setState({progress: number});
  }

  rollDice() {
    var stateValue = (this.random(6) + 1);
    this.reducePoints(this.state.analysisCards, stateValue, 'analysis');
  }

  handleCardClick(card) {
    var targetArray = this.state.analysisCards.slice();
    targetArray.push(card);

    var filteredArray = this.state.backlogCards.filter((c) => {
      return c.title !== card.title
    })

    this.setState ({
      backlogCards: filteredArray,
      analysisCards: targetArray
    });
  }

  random(maxInt) {
    return Math.floor(Math.random() * maxInt);
  }

  createCards(cards) {
    var cardComponents = cards.map(card => {
        return (<Card
          key={card.title}
          title={card.title}
          money={card.money}
          analysis={card.analysis}
          development={card.development}
          testing={card.testing}
          Click={this.handleCardClick}
        />);
    })
    return cardComponents;
  }

  //Creates objects with random values to simulate data from database
  cardGenerator(nrOfcardsToMake) {
    var cards = [];
    var locations = [
      'backlogCards',
      'analysisCards',
      'developmentCards',
      'testingCards',
      'doneCards',
    ];

    for (var i = 0; i < nrOfcardsToMake; i++) {
      cards.push({
        title: 'US' + (i + 1),
        money: this.random(10) * 5 * 10,
        analysis: this.random(10) + 1,
        development: this.random(10) + 1,
        testing: this.random(10) + 1,
        location: locations[1]
      });
    }

    return cards;
  }

  render() {
    var backlog = this.state.backlogCards;
    var analysis = this.state.analysisCards;
    var development = this.state.developmentCards;
    var testing = this.state.testingCards;
    var done = this.state.doneCards;
    var unexpected = this.state.unexpectedCards;

    return (
      <div className='container'>
      <div className="row">
      <ProgressBar bar={this.state.progress} />
      </div>
        <div className='row'>
          <Dice roll={this.rollDice.bind(this)}/>
        </div>
        <div className='row'>
          <Column key='b' title='Backlog' cards={this.createCards(backlog)} />
          <Column key='a' title='Analysis' cards={this.createCards(analysis)}/>
          <Column key='dev' title='Development' cards={this.createCards(development)}/>
          <Column key='t' title='Testing' cards={this.createCards(testing)}/>
          <Column key='dn' title='Done' cards={this.createCards(done)}/>
          <Column key='un' title='Unexpected' cards={this.createCards(unexpected)}/>
        </div>
        <div className="row">
        <ProgressBtn handleClick={this.nextDay.bind(this)} />
        </div>
      </div>
    )
  }
}

export default App;
