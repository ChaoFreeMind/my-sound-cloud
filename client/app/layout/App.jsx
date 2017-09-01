import React from 'react';
import SC from 'soundcloud';
import PropTypes from 'prop-types';
import Playlist from 'features/playlist/Playlist';
import Callback from 'common/components/Callback';
import NetworkDetector from 'features/network/NetworkDetector';
import OverlayLoader from 'features/overlayLoader/OverlayLoader';
import styled, { injectGlobal } from 'styled-components';
import Player from 'features/player/Player';
import Sidebar from 'features/sidebar/Sidebar';
import Navbar from 'common/components/Navbar';
import NotificationCenter from 'features/notification/NotificationCenter';
import { isLoginInProgress } from 'features/auth/authSelectors';
import { connect } from 'react-redux';
import { CLIENT_ID, REDIRECT_URI } from 'common/constants/authConsts';
import Routing from 'app/routing/Routing';
import { Route, Switch } from 'react-router-dom';
import { AUTH_CALLBACK_ROUTE } from 'common/constants/routeConsts';
import 'app/css/global';

SC.initialize({
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT_URI,
  scope: 'non-expiring',
});

const PageContentWrapper = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  flex: 6;
  padding: 50px 20px 100px 100px;
  margin: 0 auto;
  min-height: 100vh;
`;

const MainWrapper = styled.div`padding-top: 70px;`;

class Main extends React.Component {
  componentDidMount() {
    // To stop scrolling while logging in.
    const { loginInProgress } = this.props;
    injectGlobal`
      body {
        /* disable scroll when the global overlay loader is active */
        overflow-y: ${loginInProgress ? 'hidden' : 'scroll'};
      }
    `;
  }

  render() {
    return (
      <OverlayLoader>
        <MainWrapper>
          <Navbar />
          <Sidebar />
          <PageContentWrapper>
            <Routing />
            <Player />
            <Playlist />
          </PageContentWrapper>
          <NetworkDetector />
          <NotificationCenter />
        </MainWrapper>
      </OverlayLoader>
    );
  }
}

Main.propTypes = {
  loginInProgress: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    loginInProgress: isLoginInProgress(state),
  };
}

const ConnectedMain = connect(mapStateToProps)(Main);

function App() {
  return (
    <Switch>
      <Route exact path={AUTH_CALLBACK_ROUTE} component={Callback} />
      <Route component={ConnectedMain} />
    </Switch>
  );
}

export default App;
