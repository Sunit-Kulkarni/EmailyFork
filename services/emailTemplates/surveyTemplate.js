const keys = require('../../config/keys');
var openpgp = require('openpgp');
openpgp.initWorker({
  path: 'openpgp.worker.js'
});

openpgp.config.aead_protect = true;

module.exports = survey => {
  var fileContents = `
  <html>
    <body>
      <div style="text-align: center;">
        <h3>I'd like your input!</h3>
        <p>Please answer the following question:</p>
        <p>${survey.body}</p>
        <div>
          <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
        </div>
        <div>
          <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
        </div>
      </div>
    </body>
  </html>
`;

  var options, encryptedContents;
  var myKey = {};

  myKey.pubkey = keys.testPubKey;

  options = {
    data: fileContents,
    publicKeys: openpgp.key.readArmored(myKey.pubkey).keys
  };

  openpgp.encrypt(options).then(async ciphertext => {
    encryptedContents = await ciphertext.data;
    console.log(encryptedContents);
  });
};
