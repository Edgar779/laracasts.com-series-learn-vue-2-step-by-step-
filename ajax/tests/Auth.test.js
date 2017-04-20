module.exports = {
  'Test Auth VueJS' : function (browser) {
    browser
      .url('http://localhost:9090')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text]', 'ale')
      .setValue('input[type=password]', '123')
      .click('button[type=submit]')
      .pause(1000)
      .assert.elementPresent('#home')
      .end();
  }
};