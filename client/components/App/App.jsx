import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import ChartsPage from 'client/routes/charts';
import ArtistPage from 'client/routes/artist';
import { NotificationContainer } from 'react-notifications';
import Player from 'client/components/Player';
import Nav from 'client/components/Nav';
import Sidebar from 'client/components/Sidebar';
import Playlist from 'client/components/Playlist';
import Callback from 'client/components/Callback';
import { notificationFailure, notificationSuccess } from 'client/redux/modules/notification';
import { connect } from 'react-redux';

// Main container of our app.
class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props;

    window.addEventListener('offline', () => {
      dispatch(notificationFailure('Looks like your internet connection is down!'));
    });

    window.addEventListener('online', () => {
      dispatch(notificationSuccess('Great, you are back online!'));
    });

    const fetchUser = username => ({ type: 'FETCH_USER', payload: username });
    dispatch(fetchUser('MiniPekka'));
  }

  componentWillUnmount() {
    // Remove global listeners
    window.removeEventListener('offline');
    window.removeEventListener('online');
  }

  render() {
    return (
      <Router>
        <div id="main-wrapper">
          <Nav />
          <Sidebar />
          <div id="page-content-wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <Switch>
                    <Route exact path="/charts/:genre?" component={ChartsPage} />
                    <Route exact path="/artist/:artistId" component={ArtistPage} />
                    <Route path="/callback" component={Callback} />
                    <Redirect to="/charts" />
                  </Switch>
                </div>
                <Player />
                <Playlist />
              </div>
            </div>
          </div>
          <NotificationContainer />
        </div>
      </Router>
    );
  }
}


App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(App);
