import React from 'react';
// import PropTypes from 'prop-types';
import './App.scss';
import MyContact from '../components/MyContact';

export default function App(props) {
  return (
    <div className="App App--light">
      <main>
        <MyContact />
      </main>
    </div>
  );
}

App.propTypes = {};
