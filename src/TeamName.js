import React, { Component } from 'react';
import './css/Retrospective.css';

class TeamName extends Component {

    render() {
        var display = this.props.visible ? 'block' : 'none';
        var style = { display: display };
        let input;
        return (
            <div style={style} className='background'>
                <div
                    style={{
                        background: 'black',
                        color: 'white',
                        paddingTop: '0px',
                        paddingLeft: '40px',
                        paddingBottom: '20px',
                        border: '5px white solid',
                    }}
                    className='retrospective well well-lg'>

                    <h2>Write your teamname</h2>
                    <input
                        style={{
                            backgroundColor: 'black',
                            marginTop:'10px',
                            paddingLeft:'10px',
                        }}
                        ref={node => { input = node; }} />

                    <button 
                    style={{
                        marginTop:'5px',
                        marginLeft:'10px',
                    }}
                    className='btn btn-secondary' onClick={() => {
                        this.props.startgame(input.value);
                    }}> New Game
                    </button>
                </div>
            </div>

        )
    }
}

export default TeamName;