import axios from 'axios'

import type { PollNotificationsOptions } from './types'

import parseNotifications from './parseNotifications'
import poll from './poll'

const GHNP = (token: string) => {
  const client = axios.create({
    headers: {
      Authorization: `token ${token}`,
    },
  })

  return {
    parseNotifications: () => parseNotifications(client),
    poll: (options?: PollNotificationsOptions = {}) => poll(client, options),
  }
}

export default GHNP

// const token = 'ceb6379babffab577f3b8562b2dab542cbe5a741'
// const ghnp = GHNP(token)
//
// ghnp
//   .poll()
//   .pipe(ghnp.parseNotifications(), map(x => console.log(x)))
//   .subscribe()
