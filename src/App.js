import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import ProductDescription from './components/ProductDescription';

function App() {
  return (
    <div className="meals">
      <div>
        <Switch>
          <Route exact path="/foods" component={ Foods } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route path="/foods/:id" component={ ProductDescription } />
          <Route path="/drinks/:id" component={ ProductDescription } />
        </Switch>
      </div>
    </div>
  );
}

export default App;
