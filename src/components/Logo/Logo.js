import React from "react";
import PropTypes from "prop-types";

class Logo extends React.Component {
  render() {
    let { src, width, height } = this.props;
    return (
      <img src={ src } width={ width } height={ height } alt="logo" />
    );
  }
}

Logo.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number
};

export default Logo;
