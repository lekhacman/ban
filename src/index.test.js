it('renders without crashing', () => {
  document.body.innerHTML = `<div id="root"></div>`;
  require('./index');
  expect(document.getElementsByTagName('h1').length).toEqual(1);
});
