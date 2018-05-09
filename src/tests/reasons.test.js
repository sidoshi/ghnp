import reasons from '../reasons'

test('Proper reasons are available', () => {
  expect(reasons).toMatchSnapshot()
})
