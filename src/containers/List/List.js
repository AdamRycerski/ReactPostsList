import React from "react";

import "./List.scss";

class List extends React.Component {
  constructor(props) {
    super(props)

    this.idGenerator = (function* () {
      let id = 0;
      while(true) {
        id++;
        yield id;
      }
    })();
  }

  __getItemsListJSX() {
    let listElements = this.props.items.map(item => this.__getListElement(item));

    return (
      <ul className="list-group">
        { listElements }
      </ul>
    );
  }



  __getListElement(item) {
    return (
      <li key={ item.key } className="ListItem list-group-item">
        { item.jsx }
      </li>
    );
  }

  render() {
    return (
      <div className="List">
        { this.__getItemsListJSX() }
      </div>
    );
  }
}

export default List;
