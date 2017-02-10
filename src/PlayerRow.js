import React, { Component } from 'react';
import PlayerColumns from './PlayerColumns';

class PlayerRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players:[
        <img src={require('./images/1.png')} /> ,
        <img src={require('./images/2.png')} />,
        <img src={require('./images/2.png')} /> ,
        <img src={require('./images/2.png')} />,
        <img src={require('./images/2.png')} /> ,
        <img src={require('./images/3.png')} />
       ]
      }
}

renderPlayers() {
   return this.state.players.map(player =>
     (<PlayerColumns player={player} />))
}

  render() {
    return (
      <div className='PlayerRow' >
          {this.renderPlayers()}
      </div>
    )
  }
};

export default PlayerRow;
