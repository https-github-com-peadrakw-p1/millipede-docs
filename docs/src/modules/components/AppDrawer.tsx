import { Divider } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import { useHoux } from 'houx';
import React from 'react';
import { isMobileOnly } from 'react-device-detect';

import { useTranslation } from '../../../../i18n';
import { Page } from '../../../../src/typings/data/import';
import { RootState } from '../redux/reducers';
import { pathnameToLanguage } from '../utils/helpers';
import AppDrawerNavItem from './AppDrawerNavItem';
import Link from './common/link/Link';

const drawerWidth = 240;

const useDrawerStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap'
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1
      }
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      // at original
      // padding: theme.spacing(0, 1),
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    toolbarTitle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    drawerPaper: {
      width: drawerWidth
    }
  })
);

export interface DrawerStyleOverride {
  drawer: string;
}

interface AppDrawerProps {
  isDrawerOpen: boolean;
  handleDrawerClose: () => void;
  drawerStyleOverride: DrawerStyleOverride;
}

interface DrawerContextProps {
  activePage: Page;
  depth: number;
  handleDrawerClose?: () => void;
}

interface DrawerReduceProps {
  acc: Array<JSX.Element>;
  currentPage: Page;
}

const AppDrawer = (props: AppDrawerProps) => {
  const { isDrawerOpen, handleDrawerClose, drawerStyleOverride } = props;

  const classes = useDrawerStyles(
    drawerStyleOverride ? drawerStyleOverride.drawer : {}
  );

  const theme: Theme = useTheme();

  const {
    state: {
      navigation: { pages, activePage }
    }
  }: { state: RootState } = useHoux();

  const { t } = useTranslation();

  const canonicalRef = React.useRef();
  React.useEffect(() => {
    const { canonical } = pathnameToLanguage(window.location.pathname);
    (canonicalRef as any).current = canonical;
  }, []);

  const renderMobileDrawer = (navItems: JSX.Element) => {
    return (
      <Drawer
        variant='temporary'
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        classes={{
          paper: classes.drawerPaper
        }}
        ModalProps={{
          keepMounted: true
        }}
      >
        <div className={classes.toolbar}>
          <Link
            className={classes.toolbarTitle}
            href='/'
            onClick={handleDrawerClose}
            variant='h6'
            color='inherit'
          >
            {t('application-title')}
          </Link>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {navItems}
      </Drawer>
    );
  };

  const renderDesktopDrawer = (navItems: JSX.Element) => {
    return (
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: isDrawerOpen,
          [classes.drawerClose]: !isDrawerOpen
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: isDrawerOpen,
            [classes.drawerClose]: !isDrawerOpen
          })
        }}
        open={isDrawerOpen}
      >
        <div className={classes.toolbar}>
          <Link
            className={classes.toolbarTitle}
            href='/'
            onClick={handleDrawerClose}
            variant='h6'
            color='inherit'
          >
            {t('application-title')}
          </Link>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {navItems}
      </Drawer>
    );
  };

  /* eslint-disable no-shadow */
  const reduceChildRoutes = (
    { acc, currentPage }: DrawerReduceProps,
    drawerContext: DrawerContextProps
  ) => {
    const { activePage, depth, handleDrawerClose: onClose } = drawerContext;

    if (currentPage.displayNav === false) {
      return acc;
    }

    if (currentPage.children && currentPage.children.length > 1) {
      const title = t(`pages.${currentPage.pathname}`);

      const topLevel =
        activePage &&
        activePage.pathname.indexOf(`${currentPage.pathname}/`) === 0;

      return [
        ...acc,
        <AppDrawerNavItem
          key={currentPage.pathname}
          depth={depth}
          openImmediately={topLevel || !!currentPage.subheader}
          title={title}
          icon={currentPage.icon}
          highlight={currentPage.highlight}
        >
          {renderNavItems(currentPage.children, {
            handleDrawerClose: onClose,
            activePage,
            depth: depth + 1
          })}
        </AppDrawerNavItem>
      ];
    }

    const title = t(`pages.${currentPage.pathname}`);

    const { icon, pathname, highlight } =
      currentPage.children && currentPage.children.length === 1
        ? currentPage.children[0]
        : currentPage;

    return [
      ...acc,
      <AppDrawerNavItem
        key={currentPage.pathname}
        depth={depth}
        title={title}
        icon={icon}
        href={pathname}
        onClick={onClose}
        highlight={highlight}
      />
    ];
  };

  const renderNavItems = (
    pages: Array<Page>,
    drawerContext: DrawerContextProps
  ) => {
    const {
      activePage: { pathname }
    } = drawerContext;

    const initValue: Array<JSX.Element> = [];
    return (
      <List key={pathname} dense>
        {pages.reduce(
          (acc, currentPage) =>
            reduceChildRoutes({ acc, currentPage }, drawerContext),
          initValue
        )}
      </List>
    );
  };

  let navItems: JSX.Element;
  if (pages && pages.length > 0) {
    navItems = renderNavItems(pages, {
      handleDrawerClose,
      activePage,
      depth: 0
    });
  }

  if (pages && pages.length > 0) {
    if (isMobileOnly) {
      return renderMobileDrawer(navItems);
    }
    return renderDesktopDrawer(navItems);
  }
  return null;
};

export default AppDrawer;
