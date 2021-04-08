import RingCentral from '@rc-ex/core';
import fs from 'fs';
import path from 'path';

const rc = new RingCentral({
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
  server: process.env.RINGCENTRAL_SERVER_URL,
});

(async () => {
  await rc.authorize({
    username: process.env.RINGCENTRAL_USERNAME!,
    extension: process.env.RINGCENTRAL_EXTENSION,
    password: process.env.RINGCENTRAL_PASSWORD!,
  });

  await rc
    .restapi()
    .account()
    .extension()
    .fax()
    .post({
      to: [
        {
          phoneNumber: process.env.RINGCENTRAL_RECEIVER,
        },
      ],
      coverIndex: 0,
      attachments: [
        {
          filename: 'test.png',
          contentType: 'image/png',
          content: fs.readFileSync(
            path.join(__dirname, '..', 'ringcentral.png')
          ),
        },
      ],
    });

  await rc.revoke();
})();
