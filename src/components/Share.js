import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

class Share extends Component {
  constructor() {
    super();
    this.state = {
      copied: false,
    };
  }

  render() {
    const { pathname, item, keyused, testId } = this.props;
    const { copied } = this.state;
    return (
      <div className="share-Element">
        {
          keyused === 'history' ? (
            <>
              <button
                type="button"
                data-testid={ testId }
                onClick={ () => {
                  copy(`http://localhost:3000${pathname}`);
                  this.setState({
                    copied: true,
                  });
                } }
              >
                <img src={ shareIcon } alt="share" />
              </button>
              {
                (copied) && <p data-testid="link-copied">Link copied!</p>
              }
            </>
          ) : (
            <>
              <button
                type="button"
                data-testid={ testId }
                src={ shareIcon }
                onClick={ () => {
                  copy(
                    `http://localhost:3000/${item.type}s/${item.id}`,
                  );
                  this.setState({
                    copied: true,
                  });
                } }
              >
                <img src={ shareIcon } alt="share" />
              </button>
              {
                (copied) && <p data-testid="link-copied">Link copied!</p>
              }
            </>
          )
        }
      </div>
    );
  }
}
Share.propTypes = {
  pathname: PropTypes.string.isRequired,
  item: PropTypes.shape({
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  keyused: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};
export default Share;
