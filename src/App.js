import React, {
  Component
} from 'react';
import './css/App.css';
import DayRow from './DayRow.js';
import DayRowColumns from './DayRowColumns';
import Column from './Column.js';
import Card from './Card.js';
import MCard from './MCard.js';
import DCard from './DCard.js';
import Dice from './Dice.js';
import ProgressBar from './ProgressBar.js';
import ProgressBtn from './ProgressBtn.js';
import NewGameBtn from './NewGameBtn.js';
import EmployeeCol from './EmployeeCol.js';

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
      progress: 20,
			employeesA: [{role: 'analyst', img: './images/1.png'}, ],
			employeesD: [
				{role: 'developer', img: './images/2.png'},
				{role: 'developer', img: './images/2.png'},
				{role: 'developer', img: './images/2.png'},
				{role: 'developer', img: './images/2.png'},
			],
			employeesT: [{role: 'tester', img: './images/3.png'}],
      AScore: 0,
      DScore: 0,
      TScore: 0
    }

    this.handleCardClick = this.handleCardClick.bind(this);

  }
  //key is analysis, development or testing.
  //pos is position of the card in the column
  reducePoints(column, points, key, pos = 0) {

    if (!column[pos]) {
      return [];
    }

    var currentPoints = column[pos][key];

    while (currentPoints > 0 && points > 0) {
      currentPoints--;
      points--;
    }
    column[pos][key] = currentPoints;

    var nextPos = pos + 1;

    if (points > 0 && column[nextPos]) {
      this.reducePoints(column, points, key, nextPos);
    }
    return column;
  }

  init() {
    var cards = this.cardGenerator(10);
    this.setState({
      backlogCards: cards,
			analysisCards: [],
			developmentCards: [],
			testingCards: [],
			doneCards: [],
			unexpectedCards: []
    })

  }

  nextDay() {
    var number = this.state.progress + 20;
    if (number > 100) {
      number = 20;
    }

    this.setState({
      progress: number
    });
  }

  rollDice() {
    var AScore = this.state.employeesA.map(employee => this.random(6)).reduce((a, b) => a + b);
    var DScore = this.state.employeesD.map(employee => this.random(6)).reduce((a, b) => a + b);
		var TScore = this.state.employeesT.map(employee => this.random(6)).reduce((a, b) => a + b);

    var analysis = this.reducePoints(this.state.analysisCards, AScore, 'analysis');
    var development = this.reducePoints(this.state.developmentCards, DScore, 'development');
    var testing = this.reducePoints(this.state.testingCards, TScore, 'testing');

    this.setState({
      AScore: AScore,
      DScore: DScore,
      TScore: TScore,
      analysisCards: analysis,
      developmentCards: development,
      testingCards: testing
    });
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
		
  random(maxInt, minInt = 1) {
    return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
  }

  createCards(cards) {
    var cardComponents = cards.map(card => {
      if (card.type === 'us') {
        return (
          <Card
            key={card.title}
            title={card.title}
            money={card.money}
            analysis={card.analysis}
            development={card.development}
            testing={card.testing}
            Click={this.handleCardClick}
            location={card.location}
          />
        );
      } else if (card.type === 'm') {
        return (
          <MCard
            key={card.title}
            title={card.title}
            analysis={card.analysis}
            development={card.development}
            testing={card.testing}
            Click={this.handleCardClick}
            location={card.location}
          />
        );
      } else if (card.type === 'd') {
        return (
          <DCard
            key={card.title}
            title={card.title}
            analysis={card.analysis}
            development={card.development}
            testing={card.testing}
            Click={this.handleCardClick}
            location={card.location}
          />
        );
      }
    });
    return cardComponents;
  }

  //Creates objects with random values to simulate data from database
  cardGenerator(nrOfcardsToMake) {
    var cards = [];

    var types = ['us', 'd', 'm'];

    for (var i = 0; i < nrOfcardsToMake; i++) {
      var type = types[this.random(3, 0)];
      cards.push({
        title: type + (i + 1),
        type: type,
        money: this.random(10) * 50,
        analysis: this.random(10),
        development: this.random(10),
        testing: this.random(10),
        location: 0
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
      <div className='container' >
        <div className="row" > { /*<DayRow key='day' day='DayRow' />*/}
          < ProgressBar bar={this.state.progress} />
        </div>
        <div className='row' >
          <NewGameBtn handleClick={this.init.bind(this)} />
          <Dice roll={this.rollDice.bind(this)} />
        </div >
        <div className='row'>
        	<EmployeeCol
        		offset='col-xs-offset-2'
        		employees={this.state.employeesA}
        		score={this.state.AScore}
					/>
        	<EmployeeCol
        		employees={this.state.employeesD}
        		score={this.state.DScore}
        	/>
        	<EmployeeCol
        		employees={this.state.employeesT}
        		score={this.state.TScore}
					/>
        </div>
        <div className='row' >
          <Column title='Backlog' cards={this.createCards(backlog)} />
          <Column title='Analysis' cards={this.createCards(analysis)} />
          <Column title='Development' cards={this.createCards(development)} />
          <Column title='Testing' cards={this.createCards(testing)} />
          <Column title='Done' cards={this.createCards(done)} />
          <Column title='Unexpected' cards={this.createCards(unexpected)} />
        </div>
        <div className="row" >
          <ProgressBtn handleClick={this.nextDay.bind(this)} />
        </div>
      </div>
    )
  }
}



export default App;