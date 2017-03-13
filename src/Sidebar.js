import "./css/Sidebar.css";
import React, { Component } from 'react';

class Sidebar extends Component {
    constructor() {
        super();
        this.state = {
            sidebarOpen: false,
            hamburger: false
        };
    }
    sideMenu() {
        this.setState({
            sidebarOpen: !this.state.sidebarOpen,
            hamburger: !this.state.hamburger
        });
    }
    render() {
        var sidebarClass = this.state.sidebarOpen ? 'sidebar sb-open' : 'sidebar sb-close';
        var hamburgericon = this.state.hamburger ? 'sidebarBtn c-hamburger c-hamburger--htx is-active' : 'sidebarBtn c-hamburger c-hamburger--htx';
        /*var glyph = this.state.sidebarOpen ? 'glyphicon glyphicon-chevron-right' : 'glyphicon glyphicon-chevron-left';*/
        return (
            <div className={sidebarClass} >
                <button onClick={this.sideMenu.bind(this)}
                    className={hamburgericon}>
                    <span></span>
                </button>
                <div>Now you can see me!</div>
            </div>
        )
    }
}

export default Sidebar;