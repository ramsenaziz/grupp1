import React, {
  Component
} from 'react';
import axios from 'axios';
import querystring from 'querystring';
import './css/App.css';
import './css/index.css';
import './css/Card.css';
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

      //Release plan
      today: 0,
      sprint: 1,
      totalSprints: 8,
      workDone: false,
      retrospective: false,
      teamname: true,

      //Employees and their distribution across the board
      employeesA: [{ role: 'analyst', img: './images/ana.png', id: 'a' },],
      employeesD: [
        { role: 'developer', img: './images/dev.png', id: 'd1' },
        { role: 'developer', img: './images/dev.png', id: 'd2' },
        { role: 'developer', img: './images/dev.png', id: 'd3' },
        { role: 'developer', img: './images/dev.png', id: 'd4' },
      ],
      employeesT: [{ role: 'tester', img: './images/test.png', id: 't' }],

      //The points rolled with the dice
      AScore: 0,
      DScore: 0,
      TScore: 0,
      gameover: false
    }

    this.handleCardClick = this.handleCardClick.bind(this);

  }

  componentDidMount() {
    axios.get("http://localhost/grupp1/src/api/?/highscore").then((response) => {
      console.log(response);
    });
    axios.get("http://localhost/grupp1/src/api/?/actioncard/vadsomhelst/game/" + this.state.gameID).then((response) => {
      console.log(response);
    });
    axios.get("http://localhost/grupp1/src/api/?/game/" + this.state.gameID + "/employees").then((response) => {
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

    axios.post("http://localhost/grupp1/src/api/?/game",
      querystring.stringify({
        teamname: val
      })).then((response) => {
        this.setState({
          gameID: response.data,
          teamname: false,
          backlogCards: [],
          analysisCards: [],
          developmentCards: [],
          testingCards: [],
          doneCards: [],

          today: 0,
          sprint: 1,
          totalSprints: 8,

          employeesA: [{ role: 'analyst', img: './images/ana.png' },],
          employeesD: [
            { role: 'developer', img: './images/dev.png' },// <img src={require('./images/2.png')} />
            { role: 'developer', img: './images/dev.png' },
            { role: 'developer', img: './images/dev.png' },
            { role: 'developer', img: './images/dev.png' },
          ],
          employeesT: [{ role: 'tester', img: './images/test.png' }],

          AScore: 0,
          DScore: 0,
          TScore: 0,
          gameover: false
        })
        this.cardGenerator(20, 0);
				this.cardGenerator(7, 1);
				this.cardGenerator(5, 2);
      });

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

    var analysis = this.reducePoints(this.state.analysisCards, AScore, 'apoint');
    var development = this.reducePoints(this.state.developmentCards, DScore, 'dpoint');
    var testing = this.reducePoints(this.state.testingCards, TScore, 'tpoint');

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
    var cardLoc = Number(card.props.location);

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
      if (c.id == card.props.id) {
				findCard = c;
			}
      else return c.id !== card.props.id;
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
    var types = ['us', 'm', 'd'];
    var cardComponents = cards.map(card => {
      if (card.type == 0) {
        return (
          <Card
            key={card.id}
            title={types[0] + card.number}
            id={card.id}
            money={card.money}
            analysis={card.apoint}
            development={card.dpoint}
            testing={card.tpoint}
            Click={this.handleCardClick}
            location={card.location}
          />
        );
      } else if (card.type == 1) {
        return (
          <MCard
            key={card.id}
            id={card.id}
            title={types[1] + card.number}
            analysis={card.apoint}
            development={card.dpoint}
            testing={card.tpoint}
            Click={this.handleCardClick}
            location={card.location}
          />
        );
      } else if (card.type == 2) {
        return (
          <DCard
            key={card.id}
            id={card.id}
            title={types[2] + card.number}
            analysis={card.apoint}
            development={card.dpoint}
            testing={card.tpoint}
            Click={this.handleCardClick}
            location={card.location}
          />
        );
      }
    });
    return cardComponents;
  }

  //Creates objects with random values to simulate data from database
  cardGenerator(nrOfcardsToMake, cardType) {
    var cards = [];
    for (var i = 0; i < nrOfcardsToMake; i++) {
      cards.push({
        type: cardType,
        number: i + 1,
        money: this.random(10) * 50,
        apoint: this.random(10),
        dpoint: this.random(10),
        tpoint: this.random(10),
        location: 0
      });
    }
    /*var querystring = require('querystring');*/
    axios.post("http://localhost/grupp1/src/api/?/card",
      querystring.stringify({
        cards: JSON.stringify(cards),
        game_id: this.state.gameID
      }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then((response) => {
        axios.get("http://localhost/grupp1/src/api/?/game/" + this.state.gameID + "/cards/0").then((response) => {
          this.setState({ backlogCards: response.data });
        });
      })

    return cards;
  }

  render() {
    var backlog = this.state.backlogCards ;
    var analysis = this.state.analysisCards;
    var development = this.state.developmentCards;
    var testing = this.state.testingCards;
    var done = this.state.doneCards;

    return (
      <div className='container'>
        <TeamName startgame={this.init.bind(this)} visible={this.state.teamname} />
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
          <Column title='Backlog' cards={this.createCards(backlog)} offset='col-xs-offset-1' />
          <Column title='Analysis' cards={this.createCards(analysis)} color='#FFF546'/>
          <Column title='Development' cards={this.createCards(development)} />
          <Column title='Testing' cards={this.createCards(testing)} />
          <Column title='Done' cards={this.createCards(done)} />
        </div>

      </div>
    )
  }
}

export default App;