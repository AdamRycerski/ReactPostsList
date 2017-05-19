import React from "react";

class FetchingList extends React.Component {
  static defaultProps = {
    filter: (items => items),
    schema: {},
  }

  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

  componentDidMount() {
    fetch(this.props.fetchUrl)
      .then(res => res.json())
      .then(items => { this.setState({ items }) });
  }

  __getItemsListJSX() {
    let items = this.props.filter(this.state.items);
    let itemsJSX = items.map(item => this.__getItemJSX(item));

    return (
      <ul className="list-group">
        { itemsJSX }
      </ul>
    );
  }

  __filter(items) {
    return items;
  }

  __mapItemPropsToComponentProps(item, schema) {
    let componentProps = {};
    Object.keys(schema).forEach((key) => {
      componentProps[key] = item[schema[key]];
    });
    return componentProps;
  }

  __getItemJSX(item) {
    const Component = this.listElement || this.props.listElement;
    let props = this.__mapItemPropsToComponentProps(item, this.props.schema);

    return (
      <li key={ props.key } className="list-group-item">
        <Component {...props} />
      </li>
    );
  }

  render() {
    return (
      <div>
        { this.__getItemsListJSX() }
      </div>
    );
  }
}

export default FetchingList;
