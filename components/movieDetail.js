import React, { Component } from 'react';
import styled from 'styled-components';

class MovieDetail extends Component {
  render() {
    const { record } = this.props;
    return (
      <ExtraInfo>
        <img src={record.imageLarge} alt={record.imageLarge} />
        {/* <p><a href={record.imageLarge} target={'_blank'}>{record.title}</a></p> */}
        <CastsInfo>
          <h3>主演</h3>
          {record.casts.split(',').map((cast) => (
            <Author key={cast}>{cast}</Author>
          ))}
          <h3>导演</h3>
          {record.directors.split(',').map((director) => (
            <Author key={director}>{director}</Author>
          ))}
          <h3>简介</h3>
          <p>{record.summary}</p>
          {record.countries && <h3>国家</h3>}
          {record.countries && <p>{record.countries}</p>}
        </CastsInfo>
      </ExtraInfo>
    );
  }
}

const Author = styled.p`
  margin-bottom: 4px;
  margin-top: 0;
  padding: 0;
`;

const ExtraInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin: 12px;
`;

const CastsInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

export default MovieDetail;
