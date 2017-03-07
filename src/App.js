import React, {
  Component
} from 'react';
import './css/App.css';
import axios from 'axios';
import Column from './Column.js';
import Card from './Card.js';
import MCard from './MCard.js';
import DCard from './DCard.js';
import Dice from './Dice.js';
import ProgressBtn from './ProgressBtn.js';
import NewGameBtn from './NewGameBtn.js';
import EmployeeCol from './EmployeeCol.js';
import Retrospective from './Retrospective.js';
import ReleasePlan from './ReleasePlan.js';
import Gameover from './Gameover.js';
import TeamName from './TeamName.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      gameID: "",
      //Arrays representing the board columns. Contain cards
      backlogCards: [],
      analysisCards: [],
      developmentCards: [],
      testingCards: [],
      doneCards: [],
      unexpectedCards: [],

      //Release plan
      today: 0,
      sprint: 1,
      totalSprints: 8,
      workDone: false,
      retrospective: false,
      teamname: true,

      //Employees and their distribution across the board
      employeesA: [{ role: 'analyst', img: './images/1.png', id: 'a' },],
      employeesD: [
        { role: 'developer', img: './images/2.png', id: 'd1' },
        { role: 'developer', img: './images/2.png', id: 'd2' },
        { role: 'developer', img: './images/2.png', id: 'd3' },
        { role: 'developer', img: './images/2.png', id: 'd4' },
      ],
      employeesT: [{ role: 'tester', img: './images/3.png', id: 't' }],

      //The points rolled with the dice
      AScore: 0,
      DScore: 0,
      TScore: 0,
      gameover: false
    }

    this.handleCardClick = this.handleCardClick.bind(this);

  }

  componentDidMount() {
    axios.get("http://localhost:8080/grupp1/src/api/?/highscore").then((response) => {
      console.log(response);
      /* this.setState({
         backlogCards: response.data,
         analysisCards: response.data,
         developmentCards: response.data,
         testingCards: response.data,
         doneCards: response.data,
         unexpectedCards: response.data,
 
         //Release plan
         today: response.data,
         sprint: response.data,
         totalSprints: response.data,
         workDone: response.data,
         retrospective: response.data,
 
         //Employees and their distribution across the board
         employeesA: response.data,
         employeesD: response.data,
         employeesT: response.data,
 
         //The points rolled with the dice
         AScore: response.data,
         DScore: response.data,
         TScore: response.data,
         gameover: response.data
       });*/
    });
    axios.get("http://localhost:8080/grupp1/src/api/?/game/" + this.state.gameID).then((response) => {
      console.log(response);
    });
    axios.get("http://localhost:8080/grupp1/src/api/?/actioncard/vadsomhelst/game/" + this.state.gameID).then((response) => {
      console.log(response);
    });
    axios.get("http://localhost:8080/grupp1/src/api/?/game/vadsomhelst/employees").then((response) => {
      console.log(response);
    });
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

  init(val) {
    var cards = this.cardGenerator(10);
    axios.post("http://localhost:8080/grupp1/src/api/?/game/vadsomhelst/teamname=" + val).then((response) => {

    });
    this.setState({
      backlogCards: cards,
      analysisCards: [],
      developmentCards: [],
      testingCards: [],
      doneCards: [],
      unexpectedCards: [],

      today: 0,
      sprint: 1,
      totalSprints: 8,

      employeesA: [{ role: 'analyst', img: './images/1.png' },],
      employeesD: [
        { role: 'developer', img: './images/2.png' },
        { role: 'developer', img: './images/2.png' },
        { role: 'developer', img: './images/2.png' },
        { role: 'developer', img: './images/2.png' },
      ],
      employeesT: [{ role: 'tester', img: './images/3.png' }],

      AScore: 0,
      DScore: 0,
      TScore: 0,
      gameover: false
    })
  }

  nextDay() {
    var day = this.state.today + 1;
    var sprint = this.state.sprint;
    var totalSprints = this.state.totalSprints;
    var retrospective = false;
    var gameover = false;
    if (day > 4) {
      day = 0;
      retrospective = true;
      sprint++;
      if (sprint > totalSprints) {
        gameover = true;
        retrospective = false;
      }
    }

    this.setState({
      today: day,
      sprint: sprint,
      workDone: false,
      retrospective: retrospective,
      gameover: gameover
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
    return Math.floor(Math.random() * (maxInt - minInt) + minInt);
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
        type: type,
        number: i + 1,
        money: this.random(10) * 50,
        apoint: this.random(10),
        dpoint: this.random(10),
        tpoint: this.random(10),
        location: 0
      });
    }
    /*  JSON.stringify(cards);
      axios.post("http://localhost:8080/grupp1/src/api/?/cards", { cards: cards, game_id: this.state.gameID }).then((response) => {
        console.log(response.data);
  
      });*/
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
        <TeamName newgame={() => { this.init(); this.setState({ teamname: false }) }} visible={this.state.teamname} />
        <Retrospective done={() => this.setState({ retrospective: false })} visible={this.state.retrospective} />
        <Gameover done={this.init.bind(this)} visible={this.state.gameover} score={36363636363} />

        <ReleasePlan day={this.state.today} sprint={this.state.sprint} totalSprints={this.state.totalSprints} />

        <div className='well'>
          <div className='row'>
            <div className='col-xs-2'>
              <div className='btn-group btn-group-vertical'>
                <NewGameBtn handleClick={this.init.bind(this)} />
                <Dice disabled={this.state.workDone} roll={this.rollDice.bind(this)} />
                <ProgressBtn enabled={this.state.workDone} handleClick={this.nextDay.bind(this)} />
              </div>
            </div>
            <EmployeeCol
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