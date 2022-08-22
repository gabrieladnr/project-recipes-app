import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import FoodDetails from './components/FoodDetails';
import DrinkDetails from './components/DrinkDetails';

function App() {
  return (
    <div className="meals">
      <div>
        <Switch>
          <Route path="/" exact component={ Login } />
          <Route path="/foods/:id" component={ FoodDetails } />
          <Route path="/drinks/:id" component={ DrinkDetails } />
        </Switch>
      </div>
    </div>
  );
}

export default App;
