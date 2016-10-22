import { connect } from 'react-redux';
import SongCardList from 'client/components/SongCardList';
import { isChartsFetching, getChartsTrackIds } from 'client/redux/modules/reducers';

// Container for SongCardList
// Simply providing slices of state for the component to render.
const mapStateToProps = state => ({
  fetching: isChartsFetching(state),
  trackIds: getChartsTrackIds(state)
});

const mapDispatchToProps = dispatch => ({
  scrollFunc() {
    console.log('Scroll Func lol');
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);