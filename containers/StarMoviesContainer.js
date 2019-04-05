import React, { Component } from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import Main from './main';
import '../styles/style.css';
import { fetchStarMovieList, getMovieList } from '../actions/actions';

const starMovieName = 'starMovieList';

class StarMoviesContainer extends Component {
  componentDidMount() {
    this.getStarMovieList();
  }

  getStarMovieList = () => {
    const { dispatch } = this.props;
    let list = getMovieList(starMovieName);
    list = list === null ? [] : Array.from(list);
    dispatch(fetchStarMovieList.request(list));
  };

  onRefresh = () => {
    this.getStarMovieList();
  };

  render() {
    const { data, loading } = this.props;
    return (
      <div>
        <Spin tip="Loading..." spinning={loading}>
          <Main
            data={data}
            showRefreshButton
            refreshMovies={this.onRefresh}
          />
        </Spin>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.info.movieStarList.data,
    loading: state.info.movieStarList.loading,
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
)(StarMoviesContainer);
