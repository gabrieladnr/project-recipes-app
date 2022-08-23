import React from 'react';
import Cocktails from './Cocktails';
// import Meals from './Meals';
import '../styles/recipes.css';

class Recipes extends React.Component {
  render() {
    return (
      <div>
        {/* <Meals /> */}
        <Cocktails />
      </div>
    );
  }
}

export default Recipes;
