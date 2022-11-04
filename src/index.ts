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

  const r = await rc
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
      // coverIndex: 0,
      attachments: [
        {
          filename: 'test.pdf',
          contentType: 'application/pdf',
          content: fs.readFileSync(path.join(__dirname, '..', 'test.pdf')),
        },
      ],
    });

  // const r = await rc
  //   .restapi()
  //   .account()
  //   .extension()
  //   .messageStore('1841852326016')
  //   .get();
  console.log(JSON.stringify(r, null, 2));
  await rc.revoke();
})();
