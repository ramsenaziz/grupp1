import React, { Component } from 'react';
import './css/App.css';
import DayRow from './DayRow.js';
import DayRowColumns from './DayRowColumns';
import Column from './Column.js';
import Card from './Card.js';
import Dice from './Dice.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      backlogCards: [
        {
          key: 'US1',
          title: 'US1',
          money: 111,
          analysis: 111,
          development: 111,
          testing: 111
        },
        {
          key: 'US2',
          title: 'US2',
          money: 222,
          analysis: 222,
          development: 222,
          testing: 222
        },
        {
          key: 'US3',
          title: 'US3',
          money: 333,
          analysis: 333,
          development: 333,
          testing: 333
        },
        {
          key: 'US4',
          title: 'US4',
          money: 444,
          analysis: 444,
          development: 444,
          testing: 444
        }
      ],
        analysisCards: [],
        developmentCards: [],
        testingCards: [],
        doneCards: [],
        unexpectedCards: []
    }
    this.handleCardClick = this.handleCardClick.bind(this);

  }
  handleCardClick(card) {
    //console.log(card);
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
        <div className='row'>
          <Dice />
        </div>
      <div className='row'>
          <DayRow key='day' day='DayRow' />
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
