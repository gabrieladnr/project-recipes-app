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

  changeCheckStatus = ({ target }) => {
    const { checksIngri } = this.state;
    const viewedIngrid = checksIngri;
    viewedIngrid[target.name] = !viewedIngrid[target.name];
    this.setState({ checksIngri: viewedIngrid });
    // viewedIngrid[target.name] = (viewedIngrid[target.name] === 'checked')
    // ? 'unchecked' : 'checked';
  }

  trackCheckedIngrid = () => {
    const { infoObj: { recipe } } = this.props;
    const avaliableIngrid = Object.keys(recipe)
      .filter((e) => e.includes('strIngredient'));
    const uncheckedIngrid = [];
    for (let i = 0; i < avaliableIngrid.length; i += 1) {
      uncheckedIngrid.push(false);
    }
    this.setState({
      checksIngri: uncheckedIngrid,
    });
  }

  render() {
    const { checksIngri } = this.state;
    const { infoObj: { recipe, statusClass },
      handleChange, recipeProgress, finalizeRecipe } = this.props;
    // console.log(recipe);
    return (
      <div>
        CheckList
        <ul>
          {
            Object.keys(recipe).filter((key) => key.includes('strIngredient'))
              .map((ingredient, index) => {
                if (recipe[ingredient] === '' || recipe[ingredient] === null) {
                  return <div key={ index }> </div>;
                }
                const measure = `strMeasure${index + 1}`;
                return (
                  <label
                    key={ index }
                    htmlFor="ingridients"
                  >
                    <input
                      type="checkbox"
                      name={ index }
                      data-testid={ `${index}-ingridient-step` }
                      onChange={ (event) => {
                        this.changeCheckStatus(event);
                        handleChange(event);
                        recipeProgress(recipe[ingredient]);
                        finalizeRecipe();
                      } }
                      className={ statusClass }
                      checked={ checksIngri[index] }
                    />
                    {`${recipe[measure]} ${recipe[ingredient]}`}
                  </label>
                );
              })
          }
        </ul>
      </div>
    );
  }
}

CheckList.propTypes = {
  infoObj: PropTypes.shape({
    recipe: PropTypes.objectOf(PropTypes.string),
    statusCheck: PropTypes.bool,
    statusClass: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  finalizeRecipe: PropTypes.func.isRequired,
  recipeProgress: PropTypes.func.isRequired,
};
