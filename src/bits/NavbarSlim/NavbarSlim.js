import React, { Component } from 'react';
import { Link } from 'gatsby';
import './NavbarSlim.scss';
import PropTypes from 'prop-types';

export class NavbarSlim extends Component {
  menuItems() {
    return (
      <>
        {this.props.links.map((link) => {
          return (
            <Link key={link.name} activeClassName="active" to={link.path}>
              {link.name}
            </Link>
          );
        })}
      </>
    );
  }

  render() {
    return (
      <div className="NavbarSlim">
        <div className={'Links'}>{this.menuItems()}</div>
      </div>
    );
  }
}

NavbarSlim.propTypes = {
  links: PropTypes.array.isRequired,
};
