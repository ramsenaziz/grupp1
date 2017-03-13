import React, { Component } from 'react';
import Employee from './Employee';
import './css/EmployeeCol.css';

class EmployeeCol extends Component {

  renderEmployees() {
    return this.props.employees.map(employee =>
      (<Employee key={employee.id} me={employee} move={this.props.move} />))
  }


  render() {
    var offset = this.props.offset;
    var classes = 'EmployeeCol col-xs-2 ' + offset;
    return (
      <div className={classes}>
        <h4
          style={{
            borderRadius:'10px',
            width:'110px',
            paddingTop:'3px',
            background: 'red',
            color: 'white',
            border:'black 5px solid',
            paddingBottom:'3px',
            marginLeft:'23px',
          }}>
          <strong> Score: {this.props.score}</strong></h4>
        {this.renderEmployees()}
      </div>
    )
  }
};

export default EmployeeCol;
