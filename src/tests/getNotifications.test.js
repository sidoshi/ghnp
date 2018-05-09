import getNotifications from '../getNotifications'

const createMockClient = (shouldThrow, status = 200) => ({
  get: jest.fn(() => {
    const res = {
      data: 'NOTIFICATIONS',
      headers: {
        'last-modified': 'LAST_MODIFIED',
        'x-poll-interval': '60',
      },
      status,
    }

    if (shouldThrow) {
      const error = new Error()
      error.response = res
      throw error
    }

    return res
  }),
})

test('Makes a request with proper params and headers', async () => {
  const client = createMockClient()
  const url = 'https://api.github.com'
  const lastModified = new Date().toISOString()
  const params = {
    all: true,
    participating: true,
  }

  const res1 = await getNotifications({ client, url, lastModified, params })
  expect(client.get).toHaveBeenCalledWith(url, {
    headers: { 'If-Modified-Since': lastModified },
    params: { all: true, participating: true },
  })
  expect(res1).toEqual({
    lastModified: 'LAST_MODIFIED',
    notifications: 'NOTIFICATIONS',
    pollIntervalMs: 60000,
    updated: true,
  })

  client.get.mockClear()

  const res2 = await getNotifications({ client, url })
  expect(client.get).toHaveBeenCalledWith(url, { headers: {}, params: {} })
  expect(res2).toEqual({
    lastModified: 'LAST_MODIFIED',
    notifications: 'NOTIFICATIONS',
    pollIntervalMs: 60000,
    updated: true,
  })
})

test('handles 304 Not Changed', async () => {
  const client = createMockClient(true, 304)
  const url = 'https://api.github.com'
  const lastModified = new Date().toISOString()
  const params = {
    all: true,
    participating: true,
  }

  const res = await getNotifications({
    client,
    url,
    lastModified,
    params,
  })

  expect(res).toEqual({
    lastModified,
    notifications: [],
    pollIntervalMs: 60000,
    updated: false,
  })
})

test('Throws on all errors other then 304', async () => {
  const client = createMockClient(true, 500)
  const url = 'https://api.github.com'
  const lastModified = new Date().toISOString()
  const params = {
    all: true,
    participating: true,
  }

  try {
    await getNotifications({
      client,
      url,
      lastModified,
      params,
    })
  } catch (err) {
    expect(err.response).toMatchSnapshot()
  }
})
