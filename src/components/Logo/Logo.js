import React from "react";
import PropTypes from "prop-types";

class Logo extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
  };

  render() {
    let { src, width, height } = this.props;
    return (
      <img src={ src } width={ width } height={ height } alt="logo" />
    );
  }
}

export default Logo;
