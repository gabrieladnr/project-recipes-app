import React from 'react';
import PropTypes from 'prop-types';
import Cocktails from './Cocktails';
import Meals from './Meals';
import Footer from './Footer';
import Header from './Header';

class Recipes extends React.Component {
  render() {
    const { history } = this.props;
    const { location } = history;
    const { pathname } = location;
    const title = pathname.includes('/foods') ? 'Foods' : 'Drinks';
    return (
      <div>
        { <Header tittle={ title } searchBool="true" history={ history } />}
        { (pathname === '/foods') && <Meals /> }
        { (pathname === '/drinks') && <Cocktails />}
        <Footer history={ history } />
      </div>
    );
  }
}

export default Recipes;

Recipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
