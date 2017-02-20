import React, {
  Component
} from 'react';
import './css/App.css';
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
			//Arrays representing the board columns. Contain cards
      backlogCards: [],
      analysisCards: [],
      developmentCards: [],
      testingCards: [],
      doneCards: [],
      unexpectedCards: [],
			
			//Release plan
			days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
			today: 'Monday',
			sprint: 1,
			totalSprints: 8,
      progress: 0,
			workDone: false,
			
			//Employees and their distribution across the board
			employeesA: [{role: 'analyst', img: './images/1.png', id: 'a'}, ],
			employeesD: [
				{role: 'developer', img: './images/2.png', id: 'd1'},
				{role: 'developer', img: './images/2.png', id: 'd2'},
				{role: 'developer', img: './images/2.png', id: 'd3'},
				{role: 'developer', img: './images/2.png', id: 'd4'},
			],
			employeesT: [{role: 'tester', img: './images/3.png', id: 't'}],
			
			//The points rolled with the dice
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
      unexpectedCards: [],
			
			days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
			today: 'Monday',
			sprint: 1,
			totalSprints: 8,
      progress: 0,
			
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
    })
  }

  nextDay() {
    var progress = this.state.progress + 25;
		var sprint = this.state.sprint;
		var totalSprints = this.state.totalSprints;
    if (progress > 100) {
      progress = 0;
			sprint++;
			if (sprint > totalSprints) {
				this.init();
				return
			}
    }
		var nextDay = progress / 25;
		var today = this.state.days[nextDay];

    this.setState({
			today: today,
			sprint: sprint,
      progress: progress
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
      testingCards: testing,
			workDone: true
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
      <div className='container'>
       
        <div className="row">
          <ProgressBar bar={this.state.progress} />
        </div>
        
        <div className='row'>
        	<h4>{this.state.today}. Sprint {this.state.sprint}/{this.state.totalSprints}</h4>
        </div>
        
        <div className='well'>
        
					<div className='row'>
						<div className='btn-group'>
							<NewGameBtn handleClick={this.init.bind(this)} />
							<Dice roll={this.rollDice.bind(this)} />
							<ProgressBtn enabled={this.state.workDone} handleClick={this.nextDay.bind(this)} />
						</div>
					</div>
       	
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
        	
        </div>
        
        
        <div className='row' >
          <Column title='Backlog' cards={this.createCards(backlog)} />
          <Column title='Analysis' cards={this.createCards(analysis)} />
          <Column title='Development' cards={this.createCards(development)} />
          <Column title='Testing' cards={this.createCards(testing)} />
          <Column title='Done' cards={this.createCards(done)} />
          <Column title='Unexpected' cards={this.createCards(unexpected)} />
        </div>
        
      </div>
    )
  }
}



export default App;