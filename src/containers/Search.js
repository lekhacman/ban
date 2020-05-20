import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import './Search.scss';

import {
  clearLocations,
  query,
  search,
  submit,
} from '../redux/modules/weather';

function renderSuggestion(suggestion) {
  return <span>{suggestion.title}</span>;
}
let timerId = null;
export function Search(props) {
  function getSuggestionValue(suggestion) {
    props.onSubmit(suggestion.id);
    return suggestion.title;
  }

  // Suggestion is fetched after 1 second of idle
  function handleFetchRequested({ value }) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      props.onQuery(value);
      timerId = null;
    }, 1000);
  }

  function handleSelect(event, { newValue }) {
    props.onSearch(event.target.value || newValue);
  }

  return (
    <section className="searcher">
      <Autosuggest
        suggestions={props.locations}
        onSuggestionsFetchRequested={handleFetchRequested}
        onSuggestionsClearRequested={props.onClearSuggestion}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          placeholder: 'Search',
          value: props.txt,
          onChange: handleSelect,
        }}
      />
    </section>
  );
}

Search.propTypes = {
  txt: PropTypes.string,
  locations: PropTypes.array,
  onQuery: PropTypes.func,
  onSearch: PropTypes.func,
  onClearSuggestion: PropTypes.func,
  onSubmit: PropTypes.func,
};

/**
 * @param {RootState} state
 */
function mapStateToProps(state) {
  return { txt: state.weather.search, locations: state.weather.locations };
}

const mapDispatchToProps = {
  onSearch: search,
  onQuery: query,
  onClearSuggestion: clearLocations,
  onSubmit: submit,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
