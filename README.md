# Movie Helper Front

<p align="center">
    <a href="http://movie.zzhpro.com">
        <img src="./pictures/favicon.ico" width="152">
    </a>
    <h3 align="center">Movie Helper Front</h3>
    <p align="center">
        <a href="https://github.com/zzh1991/movie-helper-front/blob/master/LICENSE"><img src="https://img.shields.io/github/license/zzh1991/movie-helper-front.svg"></a>
        <a href="#"><img src="https://img.shields.io/github/languages/top/zzh1991/movie-helper-front.svg"></a>
        <a href="#"><img src="https://img.shields.io/github/languages/count/zzh1991/movie-helper-front.svg"></a>
        <a href="#"><img src="https://img.shields.io/github/search/zzh1991/movie-helper-front/goto.svg"></a>
        <a href="https://snyk.io//test/github/zzh1991/movie-helper-front?targetFile=package.json"><img src="https://snyk.io//test/github/zzh1991/movie-helper-front/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io//test/github/zzh1991/movie-helper-front?targetFile=package.json" style="max-width:100%;"></a>
    </p>
    <p align="center">
        Movie management and find valueable movies to watch<br>
    </p>
</p>

## 🚀 Usage

- `yarn`: install dependency
- `yarn start`
- go to http://localhost:3000
- `yarn run deploy` to build

## Demo: [Movie Helper](http://movie.zzhpro.com)

### Recent Movies

![Recent](./pictures/recent-movie-1907.png)

### Top 100 Movies

![Top](./pictures/top-movie-1907.png)

### Viewed Movies

![View](./pictures/view-movie.png)

### Stared Movies(Want to watch)

![Star](./pictures/star-movie.png)

### All Movies

![All](./pictures/all-movie.png)

## Todo

- [x] upgrade antd
- [x] redesign layout 

## Dependency

- react
- redux
- react-router-dom
- react-redux
- redux-thunk
- redux-saga
- [ant design](https://ant.design)
- [ant design pro layout](https://github.com/ant-design/ant-design-pro-layout)
- day.js
- webpack 4
- @babel 7
- eslint
- styled-components

## Problems

### React router v4 HashRouter

- install react-router-dom

```javascript
<HashRouter>
  <div>
    <Route exact path="/" component={App} />
    <Route path="/app" component={App} />
  </div>
</HashRouter>

// this.props.history.push('path');
```

### webpack

#### babel

- arrow function: transform-class-properties
- async: "transform-runtime", { "polyfill": false, "regenerator": true }

### [Parcel](https://parceljs.org/)

#### Problems for parcel

- css packaged, class name is not same, so not css effect
- svg, jpg url path is not right for static resource, not web resource

## Author

👤 **Zhihao Zhang**

- Github: [@zzh1991](https://github.com/zzh1991)

## Show your support

Please ⭐️ this repository if this project helped you!

## 📝 License

Copyright © 2019 [zzh1991](https://github.com/zzh1991).<br />
This project is [MIT](https://github.com/zzh1991/movie-helper-front/blob/master/LICENSE) licensed.
