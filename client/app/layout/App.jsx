import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {
  CHARTS_ROUTE,
  USER_PROFILE_ROUTE,
  TRACK_PROFILE_ROUTE,
  AUTH_CALLBACK_ROUTE,
} from 'client/common/constants/RouteConsts';
import Charts from 'client/features/charts/Charts';
import UserProfile from 'client/features/userProfile/UserProfile';
import { NotificationContainer } from 'react-notifications';
import Player from 'client/features/player/Player';
import Playlist from 'client/features/playlist';
import Nav from 'client/common/components/Nav';
import Sidebar from 'client/common/components/Sidebar';
import Callback from 'client/common/components/Callback';
import GlobalEvents from 'client/features/global/GlobalEvents';

import styled, { injectGlobal } from 'styled-components';
import {
  NAV_BAR_HEIGHT,
  SIDEBAR_WIDTH_DESKTOP,
  SIDEBAR_WIDTH_DESKTOP_LG,
  SIDEBAR_WIDTH_4K,
} from 'client/app/css/variables';
import { BACKGROUND_COLOR, LIGHTER_GRAY } from 'client/app/css/colors';
import { media } from 'client/app/css/styleUtils';

// Global CSS
injectGlobal`

  * {
    padding: 0;
    margin: 0;
  }

  html {
    font-family: 'Open Sans';
    /* Always put font-size here so that we could apply rem */
    font-size: 14px;
  }

  body {
    color: white;
    background-color: ${BACKGROUND_COLOR};
    padding-top: ${NAV_BAR_HEIGHT}px;
  }

  a {
    color: ${LIGHTER_GRAY}
    text-decoration: none;
    &:hover,
    &:focus,
    &:active {
      color: ${LIGHTER_GRAY};
      cursor: pointer;
      text-decoration: none;
    }
  }

  .container {
    padding: 0;
  }

  .content {
    margin: 40px 0 80px;
  }

  ul {
    list-style-type: none;
  }

  .pad-bottom {
    padding-bottom: 70px;
  }

  .container-fluid {
    padding: 0;
  }
`;

const PageContentWrapper = styled.div`
  margin-left: $sidebar-width;
  padding: 20px 20px 20px 50px;
  ${media.desktop`margin-left: ${SIDEBAR_WIDTH_DESKTOP}`}
  ${media.desktopLG`margin-left: ${SIDEBAR_WIDTH_DESKTOP_LG}`}
  ${media.desktop4K`margin-left: ${SIDEBAR_WIDTH_4K}`}
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
`;

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Sidebar />
        <PageContentWrapper>
          <Switch>
            <Route exact path={`${CHARTS_ROUTE}/:genre?`} component={Charts} />
            <Route exact path={`${USER_PROFILE_ROUTE}/:userId`} component={UserProfile} />
            <Route exact path={`${TRACK_PROFILE_ROUTE}/:trackId`} />
            <Route exact path={AUTH_CALLBACK_ROUTE} component={Callback} />
            <Redirect to={CHARTS_ROUTE} />
          </Switch>
          <Player />
          <Playlist />
        </PageContentWrapper>
        <GlobalEvents />
        <NotificationContainer />
      </div>
    </Router>
  );
}

export default App;