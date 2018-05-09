import type { Axios } from 'axios'

import reasons from './reasons'

type Reason = $Keys<typeof reasons>

export type GithubNotification = {
  id: string,
  unread: boolean,
  reason: Reason,
  updated_at: string,
  last_read_at: string,
  subject: {
    title: string,
    url: string,
    latest_comment_url: string,
    type: string,
  },
  repository: {
    id: number,
    name: string,
    full_name: string,
    owner: {
      login: string,
      id: number,
      avatar_url: string,
      gravatar_id: string,
      url: string,
      html_url: string,
      followers_url: string,
      following_url: string,
      gists_url: string,
      starred_url: string,
      subscriptions_url: string,
      organizations_url: string,
      repos_url: string,
      events_url: string,
      received_events_url: string,
      type: string,
      site_admin: boolean,
    },
    private: boolean,
    html_url: string,
    description: string,
    fork: boolean,
    url: string,
    forks_url: string,
    keys_url: string,
    collaborators_url: string,
    teams_url: string,
    hooks_url: string,
    issue_events_url: string,
    events_url: string,
    assignees_url: string,
    branches_url: string,
    tags_url: string,
    blobs_url: string,
    git_tags_url: string,
    git_refs_url: string,
    trees_url: string,
    statuses_url: string,
    languages_url: string,
    stargazers_url: string,
    contributors_url: string,
    subscribers_url: string,
    subscription_url: string,
    commits_url: string,
    git_commits_url: string,
    comments_url: string,
    issue_comment_url: string,
    contents_url: string,
    compare_url: string,
    merges_url: string,
    archive_url: string,
    downloads_url: string,
    issues_url: string,
    pulls_url: string,
    milestones_url: string,
    notifications_url: string,
    labels_url: string,
    releases_url: string,
    deployments_url: string,
  },
  url: string,
  subscription_url: string,
}

export type GetNotificationsOptions = {
  client: Axios,
  url: string,
  lastModified?: string,
  params?: Object,
}

export type GetNotificationsResponse = {
  notifications: GithubNotification[],
  lastModified?: string,
  updated: boolean,
  pollIntervalMs: number,
}

export type PollNotificationsOptions = {
  url?: string,
  defaultInterval?: number,
  params?: Object,
  getNotifications?: (
    g: GetNotificationsOptions
  ) => Promise<GetNotificationsResponse>,
}

export type ParsedNotification = {
  reason: string,
  title: string,
  repo: string,
  url: string,
  htmlUrl: string,
}
