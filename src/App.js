import React, { Component } from 'react';
import './css/App.css';
import DayRow from './DayRow.js';
import DayRowColumns from './DayRowColumns';
import Column from './Column.js';
import Card from './Card.js';
import Dice from './Dice.js';
import ProgressBar from './ProgressBar.js';
import ProgressBtn from './ProgressBtn.js';
import NewGameBtn from './NewGameBtn.js';

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

  reducePoints(array, points, key, pos = 0) {
    var nextPos = pos + 1;
    var currentPoints = array[pos][key];
    console.log(points);
    while (currentPoints > 0 && points > 0) {
      currentPoints--;
      points--;
    }
    array[pos][key] = currentPoints;
    this.setState({ analysisCards: array });
    if (points > 0 && array[nextPos]) {
      this.reducePoints(array, points, key, nextPos)
    }
  }

  init() {
    var cards = this.cardGenerator(10);
    this.setState({ backlogCards: cards })

  }

  nextDay() {
    var number = this.state.progress + 20;
    if (number > 100) {
      number = 0;
    }

    this.setState({ progress: number });

  }

  rollDice() {
    var stateValue = (this.random(6) + 1);
    this.reducePoints(this.state.analysisCards, stateValue, 'analysis');
  }

  handleCardClick(card) {

    var cardLoc = card.props.location;

    var locations = [
      'backlogCards',
      'analysisCards',
      'developmentCards',
      'testingCards',
      'doneCards',
    ];
    var currentArray = this.state[locations[cardLoc]];
    var findCard;

    /*filter currentArray if clicked card is found, put it in var findCard*/
    var filteredArray = currentArray.filter((c) => {
      if (c.title === card.props.title) findCard = c;
      else return c.title !== card.props.title;
    });
    findCard.location++;

    /*make a copy of the array the card will move to. Then push the card into that copy*/
    var nextArray = this.state[locations[cardLoc + 1]].slice();
    nextArray.push(findCard);

    /*Put both filteredArray (the array the card was in before clicked), and nextArray (the new home of the card)
    in App.state to save changes made*/
    this.setState({
      [locations[cardLoc]]: filteredArray,
      [locations[cardLoc + 1]]: nextArray
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
        location={card.location}
      />);
    })
    return cardComponents;
  }

  //Creates objects with random values to simulate data from database
  cardGenerator(nrOfcardsToMake) {
    var cards = [];


    for (var i = 0; i < nrOfcardsToMake; i++) {
      cards.push({
        title: 'US' + (i + 1),
        money: this.random(10) * 5 * 10,
        analysis: this.random(10) + 1,
        development: this.random(10) + 1,
        testing: this.random(10) + 1,
        location: 0
      });
    }

    return cards;
  }
  //   createCards(backlog)
  // cardGenerator(8)


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
          {/*<DayRow key='day' day='DayRow' />*/}
          <ProgressBar bar={this.state.progress} />
        </div>
        <div className='row'>
          <NewGameBtn handleClick={this.init.bind(this)} />
          <Dice roll={this.rollDice.bind(this)} />
        </div>
        <div className='row'>
          <Column title='Backlog' cards={this.createCards(backlog)} />
          <Column title='Analysis' cards={this.createCards(analysis)} />
          <Column title='Development' cards={this.createCards(development)} />
          <Column title='Testing' cards={this.createCards(testing)} />
          <Column title='Done' cards={this.createCards(done)} />
          <Column title='Unexpected' cards={this.createCards(unexpected)} />

        </div>
        <div className="row">
          <ProgressBtn handleClick={this.nextDay.bind(this)} />
        </div>
      </div>
    )
  }
}



export default App;
