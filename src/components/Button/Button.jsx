import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

class Button extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <div className={css.Container}>
        <button className={css.Button} onClick={onClick}>
          Load More
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
