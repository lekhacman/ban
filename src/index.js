import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';

// Bootstrap
/**
 * App Context
 */
// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());
//
// gtag('config', 'G-JXKCHX8PGX');

// Hooray
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
