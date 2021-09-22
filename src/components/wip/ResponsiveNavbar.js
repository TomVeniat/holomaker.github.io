import React, { Component } from 'react';
import { Link } from 'gatsby';
import './ResponsiveNavbar.scss';
import PropTypes from 'prop-types';

// Warn : this is just a dump of a code never used in production atm
export class ResponsiveNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      overlay: false,
    };
    this.toggleOverlay = this.toggleOverlay.bind(this);
  }

  toggleOverlay() {
    this.setState((state) => ({ overlay: !state.overlay }));
  }

  iconClose() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          fill="white"
        />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    );
  }

  iconMenu() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="white" />
      </svg>
    );
  }

  topbarIcon() {
    return this.state.overlay ? this.iconClose() : this.iconMenu();
  }

  smallTopBar() {
    return (
      <>
        <div className={'MiniBar'}>
          <div className={'Title'}>{this.pageTitle()}</div>

          <div
            onClick={this.toggleOverlay}
            style={{ paddingLeft: '1em', paddingRight: '1em', lineHeight: '0' }}
          >
            {this.topbarIcon()}
          </div>
        </div>
      </>
    );
  }

  // Dirty workaround to show title
  pageTitle() {
    if (this.state.overlay) {
      return '';
    }
    if (this.props.pageTitle === '/') {
      return 'HOME';
    } else {
      return this.props.pageTitle.replace(/\//g, '').toUpperCase();
    }
  }

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
      <div className="ResponsiveNavbar">
        <div className="BigLinks headerLinksCommon">{this.menuItems()}</div>

        {this.smallTopBar()}
        {this.state.overlay && (
          <div className={'Overlay'}>
            <div className={'SmallLinks headerLinksCommon'}>
              {this.menuItems()}
            </div>
          </div>
        )}
      </div>
    );
  }
}

ResponsiveNavbar.propTypes = {
  links: PropTypes.array.isRequired,
};
