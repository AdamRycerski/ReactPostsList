import React from 'react';

import PropTypes from 'prop-types';

import './List.scss';

class List extends React.Component {
  static defaultProps = {
    items: [],
  }

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.any.isRequired,
      jsx: PropTypes.element.isRequired,
    })),
  }

  __getItemsListJSX() {
    const listElements = this.props.items.map(item => this.__getListElement(item));

    return (
      <ul className='list-group'>
        { listElements }
      </ul>
    );
  }

  __getListElement(item) {
    return (
      <li key={ item.key } className='ListItem list-group-item'>
        { item.jsx }
      </li>
    );
  }

  render() {
    return (
      <div className='List'>
        { this.__getItemsListJSX() }
      </div>
    );
  }
}

export default List;
