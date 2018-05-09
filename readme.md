# ghnp

[![Build Status](https://travis-ci.org/sidoshi/ghnp.svg?branch=master)](https://travis-ci.org/sidoshi/ghnp) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/sidoshi/ghnp/issues) [![HitCount](http://hits.dwyl.io/sidoshi/ghnp.svg)](http://hits.dwyl.io/sidoshi/ghnp) [![npm](https://img.shields.io/npm/v/ghnp.svg)](https://www.npmjs.com/package/ghnp) [![npm](https://img.shields.io/npm/l/ghnp.svg)](https://www.npmjs.com/package/ghnp)

> Rx utilites for GitHub Notifications Polling

No knowledge of RxJs is required to use this lib.

## Install

```bash
npm install --save ghnp
```

## Usage

```js
import GHNP from 'ghnp'

// A Github token with `repo` and `notifications` scope
// https://developer.github.com/apps/building-oauth-apps/scopes-for-oauth-apps/
const token = 'GITHUB_TOKEN'

const ghnp = GHNP(token)

const subscription = ghnp
  .poll({
    defaultInterval: 10000, // Interval to wait on polling, Default: 60000
    params: { all: true }, // Optionally add params
  })
  .subscribe({
    next: notification => console.log(notification),
    error: err => console.log(err),
    compelete: () => console.log('Done'),
  })

// At any point you can stop polling by calling
subscription.unsubscribe()
```

Except token used to initialize `GHNP`, no other options are required.

```js
// No options are required
ghnp.poll().subscribe({
  next: notification => console.log(notification),
  error: err => console.log(err),
  compelete: () => console.log('Done'),
})
```

`defaultInterval` does not gaurantee that the requests will be polled
at that interval. `X-Poll-Interval` header returned from Github is obeyed and
the highest interval from `defaultInterval` and `X-Poll-Interval` is used.

As the raw notifications object is a bit cluttered, `parseNotifications` can be
used to extract all the usefull informations including the `html_url` which
can be used to directly visit the concerned page.

```js
ghnp
  .poll()
  .pipe(ghnp.parseNotifications())
  .subscribe({
    next: notification => console.log(notification),
    error: err => console.log(err),
    compelete: () => console.log('Done'),
  })
```

See the schema of [raw notification](https://github.com/sidoshi/ghnp/blob/master/src/types.js#L7-L86) object and [parsed notification](https://github.com/sidoshi/ghnp/blob/master/src/types.js#L111-L117) objects.

## License

MIT © [Siddharth Doshi](https://sid.sh)
