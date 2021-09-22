import React from 'react';
import { Link } from 'gatsby';
import './NativeMobileNavbar.scss';

import PaletteRoundedIcon from '@material-ui/icons/PaletteRounded';
import RssFeedRoundedIcon from '@material-ui/icons/RssFeedRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';

export default function MobileNavbar(props) {
  const { links } = props;

  // TODO: to make something truly factorised, user shall be able to override ths method by injecting it in the component
  const populateIconForName = (name) => {
    switch (name) {
      case 'WORK':
        return <PaletteRoundedIcon />;
      case 'NEWS':
        return <RssFeedRoundedIcon />;
      case 'ABOUT':
        return <PersonRoundedIcon />;
      default:
        return <></>;
    }
  };

  return (
    <div className={'NativeMobileNavbar'}>
      {links.map((link) => {
        return (
          <Link
            key={link.path}
            label={link.path}
            className={'insideNav'}
            activeClassName={'forceActive'}
            to={link.path}
          >
            {populateIconForName(link.name)}
            <div>{link.name}</div>
          </Link>
        );
      })}
    </div>
  );
}
