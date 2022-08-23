import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Food from './pages/Food';
import FoodInProgress from './pages/FoodInProgress';
import Drink from './pages/Drink';
import DrinkInProgress from './pages/DrinkInProgress';
import Login from './components/Login';
import Recipes from './components/Recipes';
import ProductDescription from './components/ProductDescription';

function App() {
  return (
    <div className="meals">
      <div>
        <Switch>
          <Route path="/" exact component={ Login } />
          <Route path="/foods" exact component={ Recipes } />
          <Route path="/drinks" exact component={ Recipes } />
          <Route path="/foods/:id" component={ Food } />
          <Route path="/drinks/:id" component={ Drink } />
          <Route path="/foods/:id/in-progress" component={ FoodInProgress } />
          <Route
            path="/drinks/:id/in-progress"
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
