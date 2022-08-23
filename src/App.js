import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Recipes from './components/Recipes';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import ProductDescription from './components/ProductDescription';

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
          <Route exact path="/foods" component={ Foods } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route path="/foods/:id" component={ ProductDescription } />
          <Route path="/drinks/:id" component={ ProductDescription } />
          <Route path="/recipes" exact component={ Recipes } />
        </Switch>
      </div>
    </div>
  );
}

export default App;
