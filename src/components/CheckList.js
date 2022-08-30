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
  }

  trackCheckedIngrid = () => {
    const { ingred } = this.props;
    const uncheckedIngrid = [];
    for (let i = 0; i < ingred.length; i += 1) {
      uncheckedIngrid.push(false);
    }
    this.setState({
      checksIngri: uncheckedIngrid,
    }, () => this.inProgressInitial());
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
    const { id, ingred } = this.props;
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let helper = [];
    if (storage.meals[id].some((element) => element === ingred[index])) {
      helper = storage.meals[id].filter((item) => item !== ingred[index]);
    } else {
      helper = [...storage.meals[id], ingred[index]];
    }
    const newStorage = {
      ...storage,
      meals: {
        ...storage.meals,
        [id]: helper,
      },
    };
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
    const { id, ingred } = this.props;
    if (localStorage.getItem('inProgressRecipes')) {
      const { meals } = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (Object.keys(meals).some((item) => item === id)) {
        ingred.forEach((item, index) => {
          if (meals[id].some((element) => element === item)) {
            const helper = { target: { name: index } };
            this.handleChange(helper);
          }
        });
      } else {
        const inProgressRecipes = {
          cocktails: {},
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
            >
              <input
                type="checkbox"
                name={ index }
                data-testid={ `${index}-ingridient-step` }
                onChange={ (e) => {
                  this.handleChange(e);
                  this.changeLocalStorage(index);
                } }
                className={ (checksIngri[index]) ? 'checked' : 'unchecked' }
                checked={ checksIngri[index] }
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
};
