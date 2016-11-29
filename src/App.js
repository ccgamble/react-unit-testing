import React, { Component } from 'react';
import './App.css';
import Grocery from './Grocery'
import AddGrocery from './AddGrocery'

class App extends Component {
  render() {
    return (
      <AddGrocery groceries={[
            { id: 1, name: "Bananas" },
            { id: 2, name: "Oranges" },
          ]}/>
    );
  }
}

export default App;
