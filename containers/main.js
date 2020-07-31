import React from 'react';
import {
  EyeFilled,
  EyeOutlined,
  HeartFilled,
  HeartOutlined,
  ReloadOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import {
  Table, Button, Input, Tooltip,
} from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import {
  fetchMovieViewed,
  saveMovieToLocal,
  deleteMovieToLocal,
  getMovieList,
} from '../actions/actions';
import MovieDetail from '../components/movieDetail';
import MovieList from '../components/movieList';

// eslint-disable-next-line prefer-destructuring
const Search = Input.Search;

const movieType = [
  {
    text: '剧情',
    value: '剧情',
  },
  {
    text: '动作',
    value: '动作',
  },
  {
    text: '喜剧',
    value: '喜剧',
  },
  {
    text: '爱情',
    value: '爱情',
  },
  {
    text: '战争',
    value: '战争',
  },
  {
    text: '纪录片',
    value: '纪录片',
  },
  {
    text: '科幻',
    value: '科幻',
  },
  {
    text: '动画',
    value: '动画',
  },
];
const watchedMovieName = 'watchedMovieList';
const starMovieName = 'starMovieList';

class Main extends React.Component {
  state = {
    current: 1,
    pageSize: 6,
    watchedMovieSet: getMovieList(watchedMovieName),
    starMovieSet: getMovieList(starMovieName),
    searchText: '',
  };

  onShowSizeChange = (current, pageSize) => {
    this.setState({
      current,
      pageSize,
    });
  };

  onChange = (current) => {
    this.setState({
      current,
    });
  };

  updateCheck = (isChecked, id, movieListName) => {
    const { dispatch } = this.props;
    dispatch(
      fetchMovieViewed.request({
        id,
        viewed: isChecked,
      }),
    );

    if (isChecked) {
      saveMovieToLocal(id, movieListName);
      this.setViewOrStarState(movieListName, id);
    } else {
      deleteMovieToLocal(id, movieListName);
      this.setUnviewOrUnstarState(movieListName, id);
    }
  };

  setViewOrStarState = (movieListName, id) => {
    const { watchedMovieSet, starMovieSet } = this.state;
    if (movieListName === watchedMovieName) {
      const set = watchedMovieSet;
      set.add(id);
      this.setState({
        watchedMovieSet: set,
      });
    } else {
      const set = starMovieSet;
      set.add(id);
      this.setState({
        starMovieSet: set,
      });
    }
  };

  setUnviewOrUnstarState = (movieListName, id) => {
    const { watchedMovieSet, starMovieSet } = this.state;
    if (movieListName === watchedMovieName) {
      const set = watchedMovieSet;
      set.delete(id);
      this.setState({
        watchedMovieSet: set,
      });
    } else {
      const set = starMovieSet;
      set.delete(id);
      this.setState({
        starMovieSet: set,
      });
    }
  };

  numberToBoolean = (num) => {
    if (num > 0) {
      return true;
    }
    return false;
  };

  searchMovie = (searchText) => {
    this.setState({
      searchText,
    });
  };

  renderLatestSyncTime = () => {
    const { data } = this.props;
    if (data.length === 0) {
      return '';
    }
    let maxDate = '';
    for (const item of data) {
      if (item.updateTime > maxDate) {
        maxDate = item.updateTime;
      }
    }
    return `上次同步时间: ${dayjs(maxDate).format('YYYY-MM-DD HH:mm:ss Z')}`;
  };

  render() {
    const {
      watchedMovieSet, starMovieSet, current, pageSize,
    } = this.state;
    const columns = [
      {
        title: '电影名称',
        key: 'name',
        dataIndex: 'title',
        render: (text, record) => {
          return (
            <a
              href={record.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {text}
            </a>
          );
        },
        sorter: (a, b) => a.title.localeCompare(b.title),
        width: 200,
      },
      {
        title: '评分',
        key: 'rate',
        dataIndex: 'rating',
        sorter: {
          compare: (a, b) => a.rating - b.rating,
          multiple: 1,
        },
        width: 100,
      },
      {
        title: '上映年份',
        key: 'year',
        dataIndex: 'movieYear',
        sorter: {
          compare: (a, b) => a.movieYear - b.movieYear,
          multiple: 1,
        },
        width: 150,
      },
      {
        title: '类型',
        key: 'genres',
        dataIndex: 'genres',
        width: 150,
        filters: movieType,
        filterMultiple: true,
        onFilter: (value, record) => record.genres.includes(value),
        filtered: true,
      },
      {
        title: '已看',
        key: 'viewed',
        dataIndex: 'viewed',
        render: (text, record) => {
          let isChecked = false;
          if (
            record
            && record.movieId
            && watchedMovieSet.has(record.movieId)
          ) {
            isChecked = true;
          }
          return (
            <span>
              {isChecked && (
                <Button
                  type="circle"
                  onClick={() => {
                    this.updateCheck(
                      !isChecked,
                      record.movieId,
                      watchedMovieName,
                    );
                  }}
                >
                  <EyeFilled />
                </Button>
              )}
              {!isChecked && (
                <Button
                  type="circle"
                  onClick={() => {
                    this.updateCheck(
                      !isChecked,
                      record.movieId,
                      watchedMovieName,
                    );
                  }}
                >
                  <EyeOutlined />
                </Button>
              )}
            </span>
          );
        },
        width: 100,
        filters: [
          {
            text: '已看',
            value: 1,
          },
          {
            text: '未看',
            value: 0,
          },
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.viewed === this.numberToBoolean(value),
      },
      {
        title: '想看',
        key: 'star',
        dataIndex: 'star',
        render: (text, record) => {
          let isChecked = false;
          if (
            record
            && record.movieId
            && starMovieSet.has(record.movieId)
          ) {
            isChecked = true;
          }
          return (
            <span>
              {isChecked && (
                <Button
                  type="circle"
                  onClick={() => {
                    this.updateCheck(!isChecked, record.movieId, starMovieName);
                  }}
                >
                  <HeartFilled />
                </Button>
              )}
              {!isChecked && (
                <Button
                  type="circle"
                  onClick={() => {
                    this.updateCheck(!isChecked, record.movieId, starMovieName);
                  }}
                >
                  <HeartOutlined />
                </Button>
              )}
            </span>
          );
        },
        width: 100,
        filters: [
          {
            text: '想看',
            value: 1,
          },
          {
            text: '不看',
            value: 0,
          },
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.star === this.numberToBoolean(value),
      },
    ];

    const {
      showSyncButton, showRefreshButton, syncMovies, refreshMovies,
    } = this.props;
    let { data } = this.props;
    if (data !== null) {
      const { searchText } = this.state;
      if (searchText !== '') {
        data = data.filter((item) => item.title.includes(searchText));
      }
      data.map((item, index) => {
        item.key = index;
      });
    }

    if (watchedMovieSet) {
      data.map((item) => {
        if (watchedMovieSet.has(item.movieId)) {
          item.viewed = true;
        }
      });
    }

    if (starMovieSet) {
      data.map((item) => {
        if (starMovieSet.has(item.movieId)) {
          item.star = true;
        }
      });
    }

    return (
      <div>
        {window.outerWidth >= 1000
        && (
        <div>
          <div
            style={{
              marginBottom: 16,
              display: 'grid',
              gridTemplateColumns: '5fr 5fr',
            }}
          >
            <div style={{ display: 'grid' }}>
              <Search
                placeholder="电影搜索"
                onSearch={this.searchMovie}
                style={{ width: 200 }}
              />
            </div>
            {showSyncButton && (
            <div
              style={{
                display: 'grid',
                justifyItems: 'end',
                alignItems: 'center',
              }}
            >
              <div>
                <span style={{ marginRight: 8 }}>
                  {this.renderLatestSyncTime()}
                </span>
                <Tooltip placement="bottom" title="同步">
                  <Button
                    shape="circle"
                    icon={<SyncOutlined />}
                    onClick={syncMovies}
                  />
                </Tooltip>
              </div>
            </div>
            )}
            {showRefreshButton && (
            <div
              style={{
                display: 'grid',
                justifyItems: 'end',
                alignItems: 'center',
              }}
            >
              <Tooltip placement="bottom" title="reload">
                <Button
                  shape="circle"
                  icon={<ReloadOutlined />}
                  onClick={refreshMovies}
                />
              </Tooltip>
            </div>
            )}
          </div>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              current,
              pageSize,
              showSizeChanger: true,
              onShowSizeChange: this.onShowSizeChange,
              pageSizeOptions: ['6', '8', '10', '15', '20'],
              showQuickJumper: true,
              onChange: this.onChange,
              // position: 'top',
            }}
            expandedRowRender={(record) => <MovieDetail record={record} />}
            // scroll={{ y: '60vh' }}
            rowKey={(record) => record.id}
          />
        </div>
        )}
        {window.outerWidth < 1000 && (<MovieList movieList={data} />)}
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    // data: state.info.movieRecentList.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

Main.propTypes = {
  showSyncButton: PropTypes.bool,
  showRefreshButton: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
