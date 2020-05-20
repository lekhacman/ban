import React from 'react';
import PropTypes from 'prop-types';
import MyCard from './MyCard';

export function Day({ data }) {
  return (
    <MyCard title={data.date}>
      <div>min: {data.temp.min}</div>
      <div>max: {data.temp.max}</div>
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
