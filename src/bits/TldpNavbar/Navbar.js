import React, { Component } from 'react';
import { Link } from 'gatsby';
import './Navbar.scss';
import PropTypes from 'prop-types';
import MobileNavbar from './MobileNavbar';
import { NavbarSlim } from './../NavbarSlim/NavbarSlim';

export default class Navbar extends Component {
  mobileMenuItems() {
    const links = this.props.links;
    return <MobileNavbar links={links}></MobileNavbar>;
  }
  menuItems() {
    const title = this.props.title;
    const links = this.props.links;
    return (
      <>
        <Link activeClassName="" className="siteTitle" to="/">
          {title}
        </Link>
        {links.map((link) => (
          <Link activeClassName="active" to={link.path} key={link.name}>
            {link.name}
          </Link>
        ))}
      </>
    );
  }

  render() {
    return (
      <div className="Navbar">
        <div className="SmallNavbar">{this.mobileMenuItems()}</div>
        <div className="BigNavbar">
          <NavbarSlim links={this.props.links} />
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  title: PropTypes.string,
  links: PropTypes.array,
};

Navbar.defaultProps = {
  title: 'SiteTitle',
  links: [
    { path: '/', name: 'rootLink' },
    { path: '/somePath', name: 'somePage' },
    { path: '/otherPath', name: 'otherPage' },
  ],
};
