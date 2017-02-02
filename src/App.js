import React, { Component } from 'react';
import './css/App.css';
import Column from './Column.js';
import Card from './Card.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      backlogCards: [{
        key: 'US1',
        title: 'US1',
        money: 231,
        analysis: 2,
        development: 5,
        testing: 3
      }],
      analysisCards: [],
      developmentCards: [],
      testingCards: [],
      doneCards: [],
      unexpectedCards: []
    }
    this.handleCardClick = this.handleCardClick.bind(this);
  }
  handleCardClick(card) {
    console.log(card);
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
        location: [locations[0]]
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
        <div className='row'>
          <Column key='b' title='Backlog' cards={this.createCards(backlog)} />
          <Column key='a' title='Analysis' cards={this.createCards(analysis)}/>
          <Column key='dev' title='Development' cards={this.createCards(development)}/>
          <Column key='t' title='Testing' cards={this.createCards(testing)}/>
          <Column key='dn' title='Done' cards={this.createCards(done)}/>
          <Column key='un' title='Unexpected' cards={this.createCards(unexpected)}/>
        </div>
      </div>
    )
  }
}

export default App;
