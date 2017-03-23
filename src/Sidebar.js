import "./css/Sidebar.css";
import axios from 'axios';
import NewGameBtn from './NewGameBtn.js';
import React, { Component } from 'react';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false,
            hamburger: false,
            highscore: []
        };
    }
    sideMenu() {
        if (!this.state.sidebarOpen) {
            axios.get('http://localhost/grupp1/src/api/?/highscore').then((response) => {

                var highscore = response.data.map((obj, i) => {
                    /*var teamAndScore = [obj.teamname, obj.highscore].join(" | ");*/
                    var classname;
                    if (i === 0) {
                        classname = "gold";
                    } else if (i === 1) {
                        classname = "silver";
                    } else if (i === 2) {
                        classname = "bronze";
                    }
                    return (<tr><td className={classname}></td><td>{obj.teamname}</td><td>{obj.highscore}</td></tr>);
                });
                this.setState({ highscore: highscore });
            });
        }

        this.setState({
            sidebarOpen: !this.state.sidebarOpen,
            hamburger: !this.state.hamburger
        });
    }
    render() {
        var sidebarClass = this.state.sidebarOpen ? 'sidebar sb-open' : 'sidebar sb-close';
        var hamburgericon = this.state.hamburger ? 'sidebarBtn c-hamburger c-hamburger--htx is-active' : 'sidebarBtn c-hamburger c-hamburger--htx';
        var highscore = this.state.highscore;
        return (
            <div className={sidebarClass} >
                <button onClick={this.sideMenu.bind(this)}
                    className={hamburgericon}>
                    <span></span>
                </button>
                <br/>
                <NewGameBtn handleClick={this.props.handleClick} />
                <h2>Highscore</h2>
                <table className='table table-bordered'>
                    <tbody>
                        {highscore}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Sidebar;