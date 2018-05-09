import { Observable } from 'rxjs/Observable'
import { mergeAll } from 'rxjs/operators/mergeAll'

import type { Axios } from 'axios'
import type { PollNotificationsOptions, GithubNotification } from './types'

import defaultNotificationsGetter from './getNotifications'

const API_URL = 'https://api.github.com/notifications'

const poll = (
  client: Axios,
  {
    defaultInterval = 60000,
    params = {},
    url = API_URL,
    getNotifications = defaultNotificationsGetter,
  }: PollNotificationsOptions
): Observable<GithubNotification> =>
  Observable.create(observer => {
    let timer

    const notify = (lastModified?: string) =>
      getNotifications({ client, url, lastModified, params })
        .then(res => {
          if (res.updated) {
            observer.next(res.notifications)
          }

          const interval = Math.max(defaultInterval, res.pollIntervalMs) || 0
          timer = setTimeout(() => notify(res.lastModified), interval)
        })
        .catch(observer.error)

    // Start the notifier for the first time on subscription
    notify()

    return () => clearTimeout(timer)
  }).pipe(mergeAll())

export default poll
