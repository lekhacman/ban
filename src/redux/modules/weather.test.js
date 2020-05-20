import reducer, { QUERY } from './weather';

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
  ];

  cases.forEach(function(c) {
    it(c.name, function() {
      expect(reducer.apply(null, c.input)).toEqual(c.want);
    });
  });
});
