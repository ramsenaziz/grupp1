import React, { Component } from 'react';
import Employee from './Employee';
import './css/EmployeeCol.css';

class EmployeeCol extends Component {

  renderEmployees() {
    return this.props.employees.map(employee =>
      (<Employee key={employee.id} me={employee} move={this.props.move} allowedToMove={this.props.allowedToMove}/>))
  }

  render() {
    var offset = this.props.offset;
    var classes = 'EmployeeCol col-xs-2 ' + offset;
    return (
      <div className={classes}>
       <div className='box'>
        <h4
          style={{
            width:'110px',
            paddingTop:'3px',
            color: 'gray',
            paddingBottom:'3px',
            marginLeft:'23px',
          }}>
          <strong> Points: {this.props.score}</strong></h4>
        {this.renderEmployees()}
				</div>
      </div>
    )
  }
};

export default EmployeeCol;
