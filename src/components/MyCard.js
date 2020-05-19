import React from 'react';
import './MyCard.scss';
import PropTypes from 'prop-types';

function MyCard(props) {
  const { id, title, children } = props;
  return (
    <div className="mycard mycard--light" id={`mycard--${id}`}>
      <div className="mycard__title">
        <h2>{title}</h2>
      </div>
      <div className="mycard__body">{children}</div>
    </div>
  );
}

MyCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
};

export default MyCard;
