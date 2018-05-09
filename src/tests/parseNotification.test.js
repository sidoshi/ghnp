import { from } from 'rxjs/observable/from'
import raw from '../../raw-notifications-example.json'
import parseNotification from '../parseNotifications'

test('parses notification properly', done => {
  const client = {
    get: jest.fn().mockReturnValue({ data: { html_url: 'htmlUrl' } }),
  }
  from(raw)
    .pipe(parseNotification(client))
    .subscribe(n => expect(n).toMatchSnapshot(), null, done)
})
