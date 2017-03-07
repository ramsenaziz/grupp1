import React, { Component } from 'react';
import './css/Retrospective.css';

class TeamName extends Component {

    render() {
        var display = this.props.visible ? 'block' : 'none';
        var style = { display: display };
        let input;
        return (
            <div style={style} className='background'>
                <div className='retrospective well well-lg'>
                    <h1>Write your teamname</h1>
                    <input ref={node => { input = node; }} />


                    <button className='btn btn-success' onClick={() => {
                        this.props.newgame
                        init(input.value);
                    }}> New Game
                    </button>
                </div>
            </div>

        )
    }
}

export default TeamName;