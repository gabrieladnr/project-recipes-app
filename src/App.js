import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Food from './pages/Food';
import FoodInProgress from './pages/FoodInProgress';
import Drink from './pages/Drink';
import DrinkInProgress from './pages/DrinkInProgress';

function App() {
  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
      <div>
        <Switch>
          <Route path="/" exact component={ Login } />
          <Route path="/foods" exact component={ Foods } />
          <Route path="/drinks" exact component={ Drinks } />
          <Route path="/foods/{id-da-receita}" component={ Food } />
          <Route path="drinks/{id-da-receita}" component={ Drink } />
          <Route path="/foods/{id-da-receita}/in-progress" component={ FoodInProgress } />
          <Route
            path="/drinks/{id-da-receita}/in-progress"
            component={ DrinkInProgress }
          />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </div>
    </div>
  );
}

export default App;
