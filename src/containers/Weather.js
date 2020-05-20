import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Day } from '../components/Day';
import { pick } from 'ramda';

export function Weather(props) {
  return (
    <div>
      {props.isFetching ? 'Loading' : null}
      {props.err
        ? props.err
        : props.days.map((d, id) => <Day key={id} data={d} />)}
    </div>
  );
}

Weather.propTypes = {
  err: PropTypes.string,
  isFetching: PropTypes.bool,
  days: PropTypes.array,
};

/**
 * @param {RootState} state
 */
function mapStateToProps(state) {
  return pick(['err', 'days', 'isFetching'])(state.weather);
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
