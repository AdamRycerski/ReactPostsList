import React from "react";
import { IndexLink } from "react-router";

class Breadcrumbs extends React.Component {
  __getList() {
    let items = this.__getListItemsButLast();
    items.push(this.__getLastListItem());

    return (
      <ol className="breadcrumb">
        { items }
      </ol>
    );
  }

  __getListItemsButLast() {
    const links = this.props.links;

    return links.slice(0, links.length-1).map((link) => {
      return (
        <li key={ link.path } className="breadcrumb-item">
          <IndexLink
            to={ link.path }
          >
            { link.name}
          </IndexLink>
        </li>
      );
    });
  }

  __getLastListItem() {
    const links = this.props.links;
    const link = links[links.length-1];

    return (
      <li key={ link.path } className="breadcrumb-item active">
        { link.name}
      </li>
    );
  }

  render() {
    return (
      <div className="Breadcrumbs">
        { this.__getList() }
      </div>
    );
  }
}

export default Breadcrumbs;
