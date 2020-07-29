import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';

// eslint-disable-next-line no-undef
ReactDOM.render(<Routes />, document.getElementById('react'));

// eslint-disable-next-line no-undef
if (module.hot) module.hot.accept('./routes', () => render(Routes));
