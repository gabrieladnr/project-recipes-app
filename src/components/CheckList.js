import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class CheckList extends Component {
  constructor() {
    super();
    this.state = {
      checksIngri: [],
    };
  }

  componentDidMount() {
    this.trackCheckedIngrid();
    this.inProgressInitial();
  }

  trackCheckedIngrid = () => {
    const { ingred } = this.props;
    const uncheckedIngrid = [];
    for (let i = 0; i < ingred.length; i += 1) {
      uncheckedIngrid.push(false);
    }
    this.setState({
      checksIngri: uncheckedIngrid,
    });
  }

  finishedValidation = () => {
    const { changeDisable, statusDisabled } = this.props;
    const { checksIngri } = this.state;
    if (statusDisabled && checksIngri.every((item) => item)) {
      changeDisable();
    }
    if (!statusDisabled && !checksIngri.every((item) => item)) {
      changeDisable();
    }
  }

  changeLocalStorage = (index) => {
    const { id, ingred, type } = this.props;
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let helperMeal = [];
    let helperDrink = [];
    let newStorage = {};
    if (type === 'food') {
      if (Object.keys(storage.meals).length > 0) {
        if (storage.meals[id].some((element) => element === ingred[index])) {
          helperMeal = storage.meals[id].filter((item) => item !== ingred[index]);
        } else {
          helperMeal = [...storage.meals[id], ingred[index]];
        }
      }
      newStorage = {
        ...storage,
        meals: {
          ...storage.meals,
          [id]: helperMeal,
        },
      };
    } else {
      if (Object.keys(storage.cocktails).length > 0) {
        if (storage.cocktails[id].some((element) => element === ingred[index])) {
          helperDrink = storage.cocktails[id].filter((item) => item !== ingred[index]);
        } else {
          helperDrink = [...storage.cocktails[id], ingred[index]];
        }
      }
      newStorage = {
        ...storage,
        cocktails: {
          ...storage.cocktails,
          [id]: helperDrink,
        },
      };
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
  }

  handleChange = ({ target }) => {
    const { checksIngri } = this.state;
    const helper = checksIngri;
    helper[target.name] = !helper[target.name];
    this.setState({
      checksIngri: helper,
    }, () => {
      this.finishedValidation();
    });
  }

  inProgressInitial = () => {
    const { type } = this.props;
    if (type === 'food') {
      this.mealsStorageAux();
    } else {
      this.drinksStorageAux();
    }
  }

  drinksStorageAux = () => {
    const { id, ingred } = this.props;
    if (localStorage.getItem('inProgressRecipes')) {
      const { cocktails, meals } = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (Object.keys(cocktails).some((item) => item === id)) {
        ingred.forEach((item, index) => {
          if (cocktails[id].some((element) => element === item)) {
            const helper = { target: { name: index } };
            this.handleChange(helper);
          }
        });
      } else {
        const inProgressRecipes = {
          cocktails: {
            ...cocktails,
            [id]: [],
          },
          meals: { ...meals },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
      }
    } else {
      const inProgressRecipes = {
        cocktails: {
          [id]: [],
        },
        meals: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
  }

  mealsStorageAux = () => {
    const { id, ingred } = this.props;
    if (localStorage.getItem('inProgressRecipes')) {
      const { cocktails, meals } = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (Object.keys(meals).some((item) => item === id)) {
        ingred.forEach((item, index) => {
          if (meals[id].some((element) => element === item)) {
            const helper = { target: { name: index } };
            this.handleChange(helper);
          }
        });
      } else {
        const inProgressRecipes = {
          cocktails: { ...cocktails },
          meals: {
            ...meals,
            [id]: [],
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
      }
    } else {
      const inProgressRecipes = {
        cocktails: {},
        meals: {
          [id]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
  }

  render() {
    const { ingred } = this.props;
    const { checksIngri } = this.state;
    return (
      <ul>
        {
          ingred.map((ingredient, index) => (
            <label
              key={ index }
              htmlFor="ingridients"
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                type="checkbox"
                name={ index }
                onChange={ (e) => {
                  this.handleChange(e);
                  this.changeLocalStorage(index);
                } }
                className={ (checksIngri[index]) ? 'checked' : 'unchecked' }
                defaultChecked={ checksIngri[index] }
              />
              {ingredient}
            </label>
          ))
        }
      </ul>
    );
  }
}

CheckList.propTypes = {
  changeDisable: PropTypes.func.isRequired,
  statusDisabled: PropTypes.bool.isRequired,
  ingred: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
