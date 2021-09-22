import React from 'react';
import { Link } from 'gatsby';
import './Navbar.scss';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PaletteRoundedIcon from '@material-ui/icons/PaletteRounded';
import RssFeedRoundedIcon from '@material-ui/icons/RssFeedRounded';
import EventIcon from '@material-ui/icons/Event';
import PhotoLibraryRoundedIcon from '@material-ui/icons/PhotoLibraryRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
//$accentColor: #85b94f; //#aac989; //#4d9933;
//$accentLight: #aac989;
//$accentColorIdle: #2b6b15;

const useStyles = makeStyles({
  root: {
    boxShadow: '0 -2px 2px 0 rgba(99,99,99,.1)',
    borderTop: ' solid 1px rgba(99,99,99,.3)',
    backgroundColor: '#fbfaf9', //'white'//'#f2ede9',
  },
});

const useChildStyles = makeStyles({
  root: {
    color: '#8d918f', // '#84998d',//\'#6b6b6b', //dimgray',
    // borderRadius: '10px',
    // margin: '0.2rem',
    transform: 'scale(0.9)',
  },

  selected: {
    color: '#506b5c',
    fontWeight: 700,
    // boxShadow: 'inset 0 -2px 0 0 #506b5c',
    // backgroundColor: '#f9f7f6',
    transform: 'scale(1)',
    // boxShadow: '1px 1px 9px 0px rgb(0 0 0 / 23%)',
  },
});

export default function MobileNavbar(props) {
  const { links } = props;
  const classes = useStyles();
  const childClasses = useChildStyles();
  const [value, setValue] = React.useState(0);
  // TODO: to make something truly factorised, user shall be able to override ths method by injecting it in the component
  const populateIconForName = (name) => {
    switch (name) {
      case 'WORK':
        return <PaletteRoundedIcon />;
      case 'NEWS':
        return <RssFeedRoundedIcon />;
      case 'BOOKING':
      case 'RESERVER':
        return <EventIcon />;
      case 'HOME':
      case 'ACCUEIL':
        return <HomeRoundedIcon />;
      case 'GALLERY':
      case 'GALERIE':
        return <PhotoLibraryRoundedIcon />;
      default:
        return <></>;
    }
  };

  return (
    <BottomNavigation
      value={-1} // Trick material-ui its defaut value is incorrect. Active classname takes care of it
      showLabels
      className={classes.root}
    >
      {links.map((link) => {
        // --- Workaround to enable active CSS even if there is a trailing slash on the URL
        const otherLinkVersion = link.path.endsWith('/')
          ? link.path.slice(0, -1)
          : `${link.path}/`;
        // Skip gatsby build, Browsers only
        let otherLinkIsActive = false;
        if (typeof window !== 'undefined') {
          otherLinkIsActive = window.location.pathname === otherLinkVersion;
        }
        const standardClass = otherLinkIsActive
          ? [childClasses.root, childClasses.selected]
          : childClasses.root;

        return (
          <BottomNavigationAction
            key={link.path}
            label={link.path}
            component={Link}
            className={standardClass}
            to={link.path}
            label={link.name}
            activeClassName={childClasses.selected}
            label={link.name}
            icon={populateIconForName(link.name)}
          />
        );
      })}
    </BottomNavigation>
  );
}
