import React from 'react';
import { Link } from 'gatsby';

import './Navbar.scss';
export default function HideAppBar(props) {
  return (
    <div className="Navbar">
      <div className="MobileAppBar">
        <Link activeClassName="" className="siteTitle" to="/">
          {props.title}
        </Link>
      </div>
    </div>
  );
}
