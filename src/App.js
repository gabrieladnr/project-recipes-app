import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './components/Login';
import FoodDetails from './components/FoodDetails';
import DrinkDetails from './components/DrinkDetails';
import Recipes from './components/Recipes';
import RecipeInProgress from './components/RecipeInProgress';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/foods/:id" exact component={ FoodDetails } />
        <Route path="/drinks/:id" exact component={ DrinkDetails } />
        <Route path="/foods" exact component={ Recipes } />
        <Route path="/drinks" exact component={ Recipes } />
        <Route path="/foods/:id/in-progress" component={ RecipeInProgress } />
        <Route
          path="/drinks/:id/in-progress"
          component={ RecipeInProgress }
        />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </div>
  );
}

export default App;
