import reducer, {
  CLEAR_LOCATIONS,
  clearLocations,
  FETCH_ERROR,
  FETCH_SUCCESS,
  FETCHING,
  query,
  QUERY,
  submit,
  SUGGEST,
  updateQuery,
} from './weather';

describe('Weather Reducer', function() {
  const cases = [
    {
      name: 'should handle unknown action',
      input: [{ name: 'andrew' }, { type: 'andrew' }],
      want: { name: 'andrew' },
    },
    {
      name: 'should update query text',
      input: [{ search: '' }, { type: QUERY, search: 'andrew' }],
      want: { search: 'andrew' },
    },
    {
      name: 'should update Suggestion',
      input: [
        { locations: [{ name: 'andrew' }] },
        { type: SUGGEST, data: { locations: [] } },
      ],
      want: { locations: [] },
    },
    {
      name: 'should clear suggestions',
      input: [{ locations: [{ name: 'andrew' }] }, { type: CLEAR_LOCATIONS }],
      want: { locations: [] },
    },
    {
      name: 'should update weather',
      input: [
        { isFetching: true, err: 'blabla', days: [] },
        { type: FETCH_SUCCESS, data: { weather: [{ d: 'good' }] } },
      ],
      want: { isFetching: false, err: '', days: [{ d: 'good' }] },
    },
    {
      name: 'should update fetching state',
      input: [
        { isFetching: false, err: 'blabla', days: [] },
        { type: FETCHING },
      ],
      want: { isFetching: true, err: '', days: [] },
    },
    {
      name: 'should update fetch error',
      input: [
        { isFetching: true, err: '', days: [] },
        { type: FETCH_ERROR, err: new Error('Oops!') },
      ],
      want: { isFetching: false, err: 'Oops!', days: [] },
    },
  ];

  cases.forEach(function(c) {
    it(c.name, function() {
      expect(reducer.apply(null, c.input)).toEqual(c.want);
    });
  });
});

describe('Weather Action Creators', function() {
  it('should updateQuery', function() {
    const txt = 'HelloWorld!';
    const dispatch = jest.fn();
    updateQuery(txt)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: QUERY, search: txt });
  });

  it('should fetch suggestions', function() {
    const txt = 'HelloWorld!';
    const dispatch = jest.fn();
    const data = [{ name: 'andrew' }];
    const api = {
      weather: {
        search: jest.fn().mockResolvedValue(data),
      },
    };

    process.nextTick(function() {
      expect(dispatch).toHaveBeenCalledWith({
        type: SUGGEST,
        data: { locations: data },
      });
    });
    query(txt)(dispatch, null, { api });

    expect(api.weather.search).toHaveBeenCalledWith(txt);
  });

  it('should handle suggestions error', function() {
    const txt = 'HelloWorld!';
    const dispatch = jest.fn();
    const err = new Error('Oops!');
    const api = {
      weather: {
        search: jest.fn().mockRejectedValue(err),
      },
    };

    process.nextTick(function() {
      expect(dispatch).toHaveBeenCalledWith({
        type: SUGGEST,
        data: { locations: [] },
      });
    });
    query(txt)(dispatch, null, { api });

    expect(api.weather.search).toHaveBeenCalledWith(txt);
  });

  it('should not fetch suggestions', function() {
    const txt = '';
    const dispatch = jest.fn();
    const api = {
      weather: {
        search: jest.fn(),
      },
    };

    query(txt)(dispatch, null, { api });

    expect(dispatch).not.toHaveBeenCalled();
    expect(api.weather.search).not.toHaveBeenCalled();
  });

  it('should clearLocations', function() {
    const dispatch = jest.fn();
    clearLocations()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: CLEAR_LOCATIONS });
  });

  it('should fetch weather', function(done) {
    const locationId = 123;
    const dispatch = jest.fn();
    const api = {
      weather: {
        getWeather: jest.fn().mockResolvedValue({
          weather: [{ date: '2020-05-22', temp: { min: 1, max: 2 } }],
        }),
      },
    };

    process.nextTick(function() {
      expect(dispatch).toHaveBeenCalledWith({
        type: FETCH_SUCCESS,
        data: { weather: [{ date: 'Friday', temp: { min: 1, max: 2 } }] },
      });
      done();
    });
    submit(locationId)(dispatch, null, { api });
    expect(dispatch).toHaveBeenCalledWith({ type: FETCHING });

    expect(api.weather.getWeather).toHaveBeenCalledWith(locationId);
  });

  it('should handle error in fetch weather', function(done) {
    const locationId = 123;
    const dispatch = jest.fn();
    const err = new Error('Oops!');
    const api = {
      weather: {
        getWeather: jest.fn().mockRejectedValue(err),
      },
    };

    process.nextTick(function() {
      expect(dispatch).toHaveBeenCalledWith({
        type: FETCH_ERROR,
        err,
      });
      done();
    });
    submit(locationId)(dispatch, null, { api });
  });
});
