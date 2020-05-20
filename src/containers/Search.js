import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Field, Form, Formik } from 'formik';
import Autosuggest from 'react-autosuggest';
import {
  clearLocations,
  query,
  search,
  submit,
} from '../redux/modules/weather';

function renderSuggestion(suggestion) {
  return <div>{suggestion.title}</div>;
}

export function Search(props) {
  // function query(fOnChange, event) {
  //   props.onQuery(event.target.value);
  //   fOnChange(event);
  // }
  // return (
  //   <Formik initialValues={{ txt: props.txt }} onSubmit={props.onSubmit}>
  //     <Form>
  //       <div>
  //         <Field name="txt">
  //           {function({ field }) {
  //             return (
  //               <div>
  //                 <input
  //                   type="text"
  //                   placeholder="Search"
  //                   onChange={query.bind(null, field.onChange)}
  //                 />
  //               </div>
  //             );
  //           }}
  //         </Field>
  //         <button type="submit">Search</button>
  //       </div>
  //     </Form>
  //   </Formik>
  // );

  function getSuggestionValue(suggestion) {
    props.onSubmit(suggestion.id);
    return suggestion.title;
  }

  function handleFetchRequested({ value }) {
    props.onQuery(value);
  }

  function handleSelect(event, { newValue }) {
    props.onSearch(event.target.value || newValue);
  }

  return (
    <div>
      {/*<input type="text" placeholder="Search" onChange={handleQuery} />*/}
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
    </div>
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
