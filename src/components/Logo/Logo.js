import React from 'react';

import PropTypes from 'prop-types';

import './Logo.scss';

class Logo extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
  };

  render() {
    let { src, width, height } = this.props;
    return (
      <div className='Logo'>
        <img className='Logo__img' src={ src } width={ width } height={ height } alt='logo' />
      </div>
    );
  }
}

export default Logo;
