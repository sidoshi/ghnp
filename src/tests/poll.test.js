import poll from '../poll'

test('should return an observable', () => {
  const obs = poll(null, {})
  expect(typeof obs.subscribe).toBe('function')
})

test('returns single values after flattening', done => {
  const client = 'client'
  const getNotifications = jest.fn(async () => ({
    lastModified: 'LAST_MODIFIED',
    notifications: [1, 2, 3, 4],
    pollIntervalMs: 70000,
    updated: true,
  }))
  const options = {
    defaultInterval: 60000,
    params: { all: true },
    getNotifications,
  }
  const notifications = []
  let i = 0

  const sub = poll(client, options).subscribe(n => {
    notifications.push(n)
    i += 1
    if (i === 4) {
      expect(notifications).toEqual([1, 2, 3, 4])
      sub.unsubscribe()
      done()
    }
  })
})
