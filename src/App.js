import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Login from './components/Login';
import Recipes from './components/Recipes';

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
          {/* <Route path="/" exact component={ Login } /> */}
          <Route path="/foods" exact component={ Recipes } />
          {/* <Route path="/drinks" exact component={ Recipes } /> */}

          {/* rota abixo placeholderapenas para desenvolvimento, REMOVER */}
          <Route path="/" exact component={ Recipes } />
        </Switch>
      </div>
    </div>
  );
}

export default App;
