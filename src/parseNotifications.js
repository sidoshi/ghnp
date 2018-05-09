import { mergeMap } from 'rxjs/operators/mergeMap'
import { from } from 'rxjs/observable/from'

import type { Axios } from 'axios'
import type { GithubNotification, ParsedNotification } from './types'

import reasonsMap from './reasons'

const debug = require('debug')('GHNP_PARSE')

const parse = async (
  n: GithubNotification,
  client: Axios
): Promise<ParsedNotification> => {
  const url = n.subject.latest_comment_url || n.subject.url
  let htmlUrl = ''

  try {
    const res = await client.get(url)
    htmlUrl = res.data.html_url
  } catch (err) {
    debug(err)
  }

  return {
    reason: reasonsMap[n.reason] || '',
    title: n.subject.title,
    repo: n.repository.full_name,
    url,
    htmlUrl,
  }
}

const parseNotifications = (client: Axios) =>
  mergeMap(notification => from(parse(notification, client)))

export default parseNotifications
