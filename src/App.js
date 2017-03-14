import React, {
  Component
} from 'react';
import axios from 'axios';
import querystring from 'querystring';
import './css/App.css';
import './css/index.css';
import './css/Card.css';
import Sidebar from './Sidebar.js';
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
      gameID: '',
			teamname: '',
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
      startScreen: true,

      //Employees and their distribution across the board
      employeesA: [],
      employeesD: [],
      employeesT: [],

      //The points rolled with the dice
      AScore: 0,
      DScore: 0,
      TScore: 0,
      gameover: false,
			
			totalScore: 0
    }

    this.handleCardClick = this.handleCardClick.bind(this);

  }

  componentDidMount() {
		//axios.get("http://localhost/grupp1/src/api/?/game/MRAtn").then(response => {
		//	this.setState( {gameID: response.data} );
		//})
    //axios.get("http://localhost/grupp1/src/api/?/highscore").then((response) => {
    //  console.log(response);
    //});
    //axios.get("http://localhost/grupp1/src/api/?/actioncard/vadsomhelst/game/" + this.state.gameID).then((response) => {
    //  console.log(response);
    //});
    //axios.get("http://localhost/grupp1/src/api/?/game/" + this.state.gameID + "/employees").then((response) => {
    //  console.log(response);
    //});
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
    axios.post("http://localhost/grupp1/src/api/?/games",
      querystring.stringify({
        teamname: val
      })).then((response) => {
        this.setState({
          gameID: response.data,

					startScreen: false
        }, this.setupGame)

      });
  }
	
	getGame() {
		axios.get("http://localhost/grupp1/src/api/?/games/"+this.state.gameID)
			.then(response => {
				var data = response.data[0];
				this.setState({
					teamname: data.teamname,
					startDate: data.startdate,
					today: Number(data.currentday),
					sprint: Number(data.sprint),
					totalScore: Number(data.highscore)
				})
		})
	}
	
	setupGame() {
		var id = this.state.gameID;
		this.cardGenerator(20, 0);
		this.cardGenerator(7, 1);
		this.cardGenerator(5, 2);
		
		this.getGame();
		
		axios.post("http://localhost/grupp1/src/api/?/employees",
			querystring.stringify({
				game_id: id
		})).then(response => {
			axios.get("http://localhost/grupp1/src/api/?/games/"+id+"/employees")
				.then(response => {
					var analytics = response.data.filter(emp => emp.currentrole == 1);
					var devs = response.data.filter(emp => emp.currentrole == 2);
					var tests = response.data.filter(emp => emp.currentrole == 3);
				
					this.setState({
						employeesA: analytics,
						employeesD: devs,
						employeesT: tests
					})
				}
			)
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
      sprint = sprint + 1;
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
		
		axios.post("http://localhost/grupp1/src/api/?/games/"+this.state.gameID,
			querystring.stringify({
				teamname: this.state.teamname,
				sprint: sprint,
				currentday: day,
				highscore: this.state.totalScore,
				startdate: this.state.startDate,
				enddate: 'NULL'
			})
	 	).then(this.getGame.bind(this))	
  }

  rollDice() {
    var AScore = this.state.employeesA.map(employee => this.random(6));
		if (AScore.length > 0) {
			AScore = AScore.reduce((a, b) => a + b);
		}
    var DScore = this.state.employeesD.map(employee => this.random(6));
		if (DScore.length > 0) {
			DScore = DScore.reduce((a, b) => a + b);
		}
    var TScore = this.state.employeesT.map(employee => this.random(6));
		if (TScore.length > 0) {
			TScore = TScore.reduce((a, b) => a + b);
		}

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
	
	moveEmployee(emp) {
		var employee = emp.props.me;
		var newRole = Number(employee.currentrole);
		newRole += 1;
		
		if (employee.role != 2 && newRole == 2) {
			newRole += 1;
		}
		
		if (newRole > 3) {
			newRole = 1;
		}
		
		axios.put("http://localhost/grupp1/src/api/?/employees",
			querystring.stringify({
				game_id: this.state.gameID,
				id: employee.id,
				currentrole: newRole
			})
		).then(response => {
			axios.get("http://localhost/grupp1/src/api/?/games/"+this.state.gameID+"/employees")
				.then(response => {
					var analytics = response.data.filter(emp => emp.currentrole == 1);
					var devs = response.data.filter(emp => emp.currentrole == 2);
					var tests = response.data.filter(emp => emp.currentrole == 3);
				
					this.setState({
						employeesA: analytics,
						employeesD: devs,
						employeesT: tests
					})
				}
			)
		})
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
    axios.post("http://localhost/grupp1/src/api/?/cards",
      querystring.stringify({
        cards: JSON.stringify(cards),
        game_id: this.state.gameID
      }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then((response) => {
        axios.get("http://localhost/grupp1/src/api/?/games/" + this.state.gameID + "/cards/0").then((response) => {
          this.setState({ backlogCards: response.data });
        });
      })

    return cards;
  }

  render() {
    var backlog = this.state.backlogCards;
    var analysis = this.state.analysisCards;
    var development = this.state.developmentCards;
    var testing = this.state.testingCards;
    var done = this.state.doneCards;

    return (
      <div className='container'>
        <TeamName startgame={this.init.bind(this)} visible={this.state.startScreen} />
        <Retrospective done={() => this.setState({ retrospective: false })} visible={this.state.retrospective} />
        <Gameover done={this.init.bind(this)} visible={this.state.gameover} score={36363636363} />
        <Sidebar />
        <ReleasePlan day={this.state.today} sprint={this.state.sprint} totalSprints={this.state.totalSprints} />

        <div className='well'>
          <div className='row'>
            <div className='col-xs-3'>
            	<div className='row'>
            		<div className='btn-group btn-group-vertical'>
                	<NewGameBtn handleClick={this.init.bind(this)} />
                	<Dice disabled={this.state.workDone} roll={this.rollDice.bind(this)} />
                	<ProgressBtn enabled={this.state.workDone} handleClick={this.nextDay.bind(this)} />
              	</div>
            	</div>
              <div className='row'>
          			<h3>{this.state.teamname}</h3>
          		</div>
            </div>
            <EmployeeCol
              employees={this.state.employeesA}
              score={this.state.AScore}
              move={this.moveEmployee.bind(this)}
              allowedToMove={!this.state.workDone}
            />
            <EmployeeCol
              employees={this.state.employeesD}
              score={this.state.DScore}
              move={this.moveEmployee.bind(this)}
              allowedToMove={!this.state.workDone}
            />
            <EmployeeCol
              employees={this.state.employeesT}
              score={this.state.TScore}
              move={this.moveEmployee.bind(this)}
              allowedToMove={!this.state.workDone}
            />
          </div>
        </div>

        <div className='row' >
          <Column title='Backlog' cards={this.createCards(backlog)} offset='col-xs-offset-1' />
          <Column title='Analysis' cards={this.createCards(analysis)} color='#79d6ea'/>
          <Column title='Development' cards={this.createCards(development)} color='lightgray' />
          <Column title='Testing' cards={this.createCards(testing)} color='lightpink' />
          <Column title='Done' cards={this.createCards(done)} targetVal='money'/>
        </div>

      </div>
    )
  }
}

export default App;