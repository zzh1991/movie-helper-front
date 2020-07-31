import React, { Component } from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import Main from './main';
import { fetchViewdMovieList, getMovieList } from '../actions/actions';

const watchedMovieName = 'watchedMovieList';

class ViewedMoviesContainer extends Component {
  componentDidMount() {
    this.getViewedMovieList();
  }

  getViewedMovieList = () => {
    const { dispatch } = this.props;
    let list = getMovieList(watchedMovieName);
    list = list === null ? [] : Array.from(list);
    dispatch(fetchViewdMovieList.request(list));
  };

  onRefresh = () => {
    this.getViewedMovieList();
  };

  render() {
    const { data, loading } = this.props;
    return (
      <div>
        <Spin tip="Loading..." spinning={loading}>
          <Main
            data={data}
            refreshMovies={this.onRefresh}
          />
        </Spin>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.info.movieViewedList.data,
    loading: state.info.movieViewedList.loading,
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
)(ViewedMoviesContainer);
