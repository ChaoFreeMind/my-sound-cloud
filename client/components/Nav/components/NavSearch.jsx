import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Link,
 } from 'react-router-dom';
import { dropdownSearchShowCount } from 'client/constants/SearchConsts';
import { defaultEventHandlerFactory } from 'client/utils/FactoryUtils';
import NavSearchDropdownTrackContainer from '../containers/NavSearchDropdownTrackContainer';
import NavSearchDropdownArtistContainer from '../containers/NavSearchDropdownArtistContainer';


class NavSearch extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderSearchResults = this.renderSearchResults.bind(this);
    this.onShowAllClick = this.onShowAllClick.bind(this);
  }

  // When user press enter, show all results.
  onSubmit(e) {
    e.preventDefault();
    const { handleShowAll } = this.props;
    const searchKeyword = this.searchInput.value;
    handleShowAll(searchKeyword);
    this.searchInput.value = '';
  }

  onChange(e) {
    e.preventDefault();
    e.stopPropagation();
    const { handleChange } = this.props;
    handleChange(e.target.value.trim());
  }

  onFocus(e) {
    this.props.handleFocus(e.target.value.trim());
  }

  onBlur() {
    this.props.handleBlur();
  }

  onShowAllClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const { handleShowAll } = this.props;
    handleShowAll(this.searchInput.value.trim());
  }

  renderSearchResults() {
    const { artistIds, trackIds, dropdownShown } = this.props;
    if (dropdownShown) {
      return (
        <Router>
        <div className="nav-search-result">
          {
            (artistIds.length !== 0) && (<div className="dropdown-title">
              ARTISTS
          </div>)
          }
          <ul className="dropdown-list">
            {
              artistIds.slice(0, dropdownSearchShowCount).map(artistId =>
                <NavSearchDropdownArtistContainer
                  key={artistId}
                  artistId={artistId}
                />)
            }
          </ul>
          {
            (trackIds.length !== 0) && (<div className="dropdown-title">
              TRACKS
            </div>)
          }

          <ul className="dropdown-list">
            {
              trackIds.slice(0, dropdownSearchShowCount).map(trackId =>
                <NavSearchDropdownTrackContainer
                  key={trackId}
                  trackId={trackId}
                />)
            }
            {
              (trackIds.length !== 0) && (<li className="dropdown-item-show-all">
                <Link
                  to=''
                  className="dropdown-show-all-link"
                  onMouseDown={this.onShowAllClick}
                >
                  SHOW ALL
                  </Link>
              </li>)
            }
          </ul>
        </div>
        </Router>
      );
    }
    return <div />;
  }

  render() {
    return (
      <div className="nav-search">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <i className="icon ion-search" />
            <input
              className="nav-search-input"
              placeholder="SEARCH"
              type="search"
              ref={(node) => { this.searchInput = node; }}
              onChange={this.onChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
            />
          </div>
        </form>
        {this.renderSearchResults()}
      </div>
    );
  }
}

NavSearch.defaultProps = {
  dropdownShown: false,
  artistIds: [],
  trackIds: [],
  handleBlur: defaultEventHandlerFactory('handleBlur'),
  handleFocus: defaultEventHandlerFactory('handleFocus'),
  handleChange: defaultEventHandlerFactory('handleChange'),
  handleShowAll: defaultEventHandlerFactory('handleShowAll'),
};

NavSearch.propTypes = {
  dropdownShown: PropTypes.bool,
  artistIds: PropTypes.array,
  trackIds: PropTypes.array,
  handleBlur: PropTypes.func,
  handleFocus: PropTypes.func,
  handleChange: PropTypes.func,
  handleShowAll: PropTypes.func,
};

export default NavSearch;
