import React, { Component } from 'react';
import './css/App.css';
import './css/Columns.css';
import ColumnList from './ColumnList';
import ColumnList2 from './ColumnList2';
import TopRowList from './TopRowList';

class App extends Component {
  render() {
    return (
      <div>
          <TopRowList />
          <ColumnList />
          <ColumnList2 />
      </div>
    )
  }
}

export default App;
