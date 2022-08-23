import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionFilterDrinks, actionFilterFoods } from '../redux/actions/headerActions';

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      filter: '',
      disabled: true,
    };
  }

  // essa função faz a requisição na API de pesquisar a lista com o filtro
  callFetchSearch = async (url) => {
    const { searchInput } = this.state;
    const { history, dispatchFilteredDrinks, dispatchFilteredFoods } = this.props;
    // fazendo a requisição na api
    const response = await fetch(`${url}${searchInput}`)
      .then((responseApi) => responseApi.json());
    console.log(response);

    if (history.location.pathname === '/drinks') {
      // adiciona o filtro ao reducer drinks e altera a rota para a devida rota.
      dispatchFilteredDrinks(response);
      // abaixo alteramos a rota devidamente. Quando houver 1 elemento apenas e quando não houver 1 elemento apenas
      if (response.drinks.length === 1) {
        history.push(`/drinks/${response.drinks[0].idDrink}`);
      }
    } else {
      // adiciona o filtro ao reducer foods e altera a rota para a devida rota.
      dispatchFilteredFoods(response);
      if (response.meals.length === 1) {
        history.push(`/foods/${response.meals[0].idMeal}`);
      }
    }
  }

  // essa função é chamada para alterar o valor da barra de busca
  changeInputSearch = ({ target }) => {
    const { value } = target;
    this.setState({
      searchInput: value,
    });
  }

  // essa função é chamada para alterar o valor do radio de filtrar a pesquisa
  changeTypeSearch = (parameter) => {
    this.setState({
      filter: parameter,
      disabled: false,
    });
  }

  // Função para fazer cases de requisição na api
  getListProducts = async () => {
    const { searchInput, filter } = this.state;
    const { history } = this.props;
    switch (filter) {
    case 'ingrediente':
      if (history.location.pathname === '/drinks') {
        // chamada da api para a pagina de drinks
        this.callFetchSearch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=');
        // else para chamada da api para a pagina de foods
      } else this.callFetchSearch('https://www.themealdb.com/api/json/v1/1/filter.php?i=');
      break;
    case 'nome':
      if (history.location.pathname === '/drinks') {
        // chamada da api para a pagina de drinks
        this.callFetchSearch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        // else para chamada da api para a pagina de foods
      } else this.callFetchSearch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      break;
    case 'primeira-letra':
      if (searchInput.length === 1) {
        if (history.location.pathname === '/drinks') {
          // chamada da api para a pagina de drinks
          this.callFetchSearch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=');
          // else para chamada da api para a pagina de foods
        } else this.callFetchSearch('https://www.themealdb.com/api/json/v1/1/search.php?f=');
      } else alert('Your search must have only 1 (one) character');
      break;
    default:
      return 'error';
    }
  }

  render() {
    const { searchInput, disabled } = this.state;
    return (
      <div className="search-bar">
        <button type="button" data-testid="search-top-btn">
          Pesquisar
        </button>
        <input
          type="text"
          data-testid="search-input"
          value={ searchInput }
          onChange={ this.changeInputSearch }
        />
        {/* renderização condicional abaixo */}
        <label htmlFor="ingredient-search-radio">
          ingredient
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="ingredient-search-radio"
            name="filter-radio"
            onClick={ () => this.changeTypeSearch('ingrediente') }
          />
        </label>
        <label htmlFor="name-search-radio">
          name
          <input
            type="radio"
            data-testid="name-search-radio"
            id="name-search-radio"
            name="filter-radio"
            onClick={ () => this.changeTypeSearch('nome') }
          />
        </label>
        <label htmlFor="first-letter-search-radio">
          first letter
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            id="first-letter-search-radio"
            name="filter-radio"
            onClick={ () => this.changeTypeSearch('primeira-letra') }
          />
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          disabled={ disabled }
          onClick={ () => this.getListProducts() }
        >
          Search
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchFilteredDrinks: (drinks) => dispatch(actionFilterDrinks(drinks)),
  dispatchFilteredFoods: (foods) => dispatch(actionFilterFoods(foods)),
});

SearchBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  dispatchFilteredDrinks: PropTypes.func.isRequired,
  dispatchFilteredFoods: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SearchBar);
