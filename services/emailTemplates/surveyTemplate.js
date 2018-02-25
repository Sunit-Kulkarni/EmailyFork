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

  var options;
  var myKey = {};

  myKey.pubkey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
    
    xsBNBFn3XPUBCADCThyhTkBsSSB2FDHVjg9QoFYqyaIDWMFyszGWoLKjFbGU
    qeHn/3PEPieXPfUcle+PQ1EkfzAJD1kLAAWoqw/52hFxbjM1+8ptffyxTUmH
    8WBK93TFD7lWgsrhutqtPcPmE2R0GL44ICN+UgHQWTSHGxf1Jxy9AX2CjCXB
    iW8aBDtX5lFawta49niLREfQ/Tfm4IgyWsMTOByEXuv5PWYHsu6NRhY16PT9
    fo49quVX15OjLrhl5l0cwjk7czWmCNR2Aw+NKOJSYs41LSbdr9C5caRAHhOr
    zWkhw7ajUyDnVSFufyl3GhONfgSrtl82wGxuQEcj5aXmVzzMmIMIOm4BABEB
    AAHNRW1hcmtldGluZy5rdWxrYXJuaUBwcm90b25tYWlsLmNvbSA8bWFya2V0
    aW5nLmt1bGthcm5pQHByb3Rvbm1haWwuY29tPsLAdQQQAQgAKQUCWfdc9wYL
    CQcIAwIJEI2Kmo3T3QRpBBUICgIDFgIBAhkBAhsDAh4BAAC09wf+JFRUIcjK
    4rhpxbfvgEmFpFaMd0a7e4Ne0APNFvj3R6YgK4Skhr3JslQG3e7Fk48j2+jD
    /SWUKmnCs7l2X5bNZAhwEXs5KBEOd66uXmr/+aOmVXv3BMh9dZS5L1MJGBqF
    tJ9mC7JiwGfKPQyn1W2Gi5zPEoNdvKKRuNk2ppxyOmpubW5EnqEIWbEB8R5q
    AWDF/I0jDo7CfgDmddFl5/6wCEH0h/GxRex8rFCSpFKybsgzYhX4Pg1xUv2V
    j2HMsr2TQbfiKtUcYBvr5N6O8tY+55AgnHEIlLfOBhgzEZMR/r1azQ94vcfv
    T4wgqfnkrEAhp6q+F5T8Af/cyON98/9se87ATQRZ91z1AQgAzuTgYDzG7WqK
    Kx8qn3uufFYistxdiOTTVdIy8Wuor7vwI2+tUq0ml6bNtDdL4wuLHtIro5WZ
    gnyYaoyzfS6Nmt+U25iuV80LtjvU+RSMvdohc8GBJE5ZtsT+y2tWokOea6Q+
    5HQf8nnYsQaObEv44oAaDCQO3rRhtuU0ULecWq+B+J8PMmaV8ub7CkSltxoI
    xLdMCXZ/svN0EIbOKJ1oBgMgoLgYL7UlCqcfDsQG9iAGvV/KCO5/9hI3Pjv/
    dMnSytuCnTa+t0h21S7I1fmVyf6XGtvelSQNYerjP9M5mhWMftUgKi70tctO
    yOKGhWuUu85AZ6KSQkfY79w7JDBFiwARAQABwsBfBBgBCAATBQJZ91z3CRCN
    ipqN090EaQIbDAAAp44IAL79vq7wbXgvoNSsMSZosscNS1ZMb3+YxDd7XCc4
    Hniel35UK0v6iaoa/vU6NtL8kTJPGj2zA7kc/afhV30ni6ILf/cPw/W3manI
    1nFZW4FeD/Dnv1NoQZo8P0dkNJSMAQPyNpnVFPEhuXKEVoqGogvyE6vg6zm+
    +GWXILekIOeqS1WTREvezGJi6E4NzcDqzvbwiSBbCxplcvsMIOdHhdRdTm/c
    08Bd8wDB1OEpiUYIfyq0xCbPuzcGYsEh08b/Yfx4XyBVsHWTpLeCB6l+eWCB
    BFFGaddUTL7iYeGsuJjeINAZp1jCKLjULXA02Pz+AG9EAuRD20Sq0k0it6v2
    9yc=
    =PR35
    -----END PGP PUBLIC KEY BLOCK-----
`;

  options = {
    data: fileContents,
    publicKeys: openpgp.key.readArmored(myKey.pubkey).keys
  };

  openpgp.encrypt(options).then(function(ciphertext) {
    myKey.encrypted = ciphertext.data;
    console.log(myKey.encrypted);
  });

  return myKey.encrypted;
};
