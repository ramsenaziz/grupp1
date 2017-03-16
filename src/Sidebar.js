import "./css/Sidebar.css";
import axios from 'axios';
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
        this.setState({
            sidebarOpen: !this.state.sidebarOpen,
            hamburger: !this.state.hamburger
        });
    }

    componentDidMount() {
        axios.get('http://localhost/grupp1/src/api/?/highscore').then((response) => {
            console.log(response.data);

            var highscore = response.data.map((obj, i) => {
                var teamAndScore = [obj.teamname, obj.highscore].join(" : ");

                return (<li>{teamAndScore}</li>);
            });
            this.setState({ highscore: highscore });
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
                <h2>Highscore</h2>
                <div className='well'>
                    <ol>{highscore}</ol>
                </div>
            </div>
        )
    }
}

export default Sidebar;