import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Day } from '../components/Day';
import { pick } from 'ramda';
import './Weather.scss';

export function Weather(props) {
  return (
    <section className="weather">
      {props.isFetching ? 'Loading' : null}
      {props.err ? (
        <div>{props.err}</div>
      ) : (
        props.days.map((d, id) => <Day key={id} data={d} />)
      )}
    </section>
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
