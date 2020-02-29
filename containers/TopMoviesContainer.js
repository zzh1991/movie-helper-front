import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import Main from './main';
import '../styles/style.less';
import { fetchMovieTop, syncTopMovieList } from '../actions/actions';

class TopMoviesContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchMovieTop.request());
  }

  onSync = () => {
    const { dispatch } = this.props;
    dispatch(syncTopMovieList());
  };

  render() {
    const { data, loading } = this.props;
    return (
      <div>
        <Spin tip="Loading..." spinning={loading}>
          <Main data={data} showSyncButton syncMovies={this.onSync} />
        </Spin>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.info.movieTopList.data,
    loading: state.info.movieTopList.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopMoviesContainer);
