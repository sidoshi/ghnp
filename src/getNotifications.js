import type { GetNotificationsOptions, GetNotificationsResponse } from './types'

export default async ({
  client,
  url,
  lastModified,
  params = {},
}: GetNotificationsOptions): Promise<GetNotificationsResponse> => {
  // By adding last modified header, we get 304 status if nothing is updated
  const headers =
    lastModified !== undefined ? { 'If-Modified-Since': lastModified } : {}

  try {
    const res = await client.get(url, {
      params,
      headers,
    })

    return {
      notifications: res.data,
      lastModified: res.headers['last-modified'],
      updated: true,
      pollIntervalMs: +res.headers['x-poll-interval'] * 1000 || 0,
    }
  } catch (err) {
    const { response: res } = err

    if (res.status === 304) {
      return {
        notifications: [],
        updated: false,
        lastModified,
        pollIntervalMs: +res.headers['x-poll-interval'] * 1000 || 0,
      }
    }

    throw err
  }
}
