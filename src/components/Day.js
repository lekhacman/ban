import React from 'react';
import PropTypes from 'prop-types';
import MyCard from './MyCard';

export function Day({ data }) {
  return (
    <MyCard title={data.date}>
      <p>min: {data.temp.min}</p>
      <p>max: {data.temp.max}</p>
    </MyCard>
  );
}

Day.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.string,
    temp: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
    }),
  }),
};
