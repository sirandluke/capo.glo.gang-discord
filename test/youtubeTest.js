const expect = require('chai').expect;
const { getSong } = require('../src/youtube');

describe('YouTube API Tests', () => {
  it('Catch Error', async () => {
    return getSong().catch(error => {
      expect(error).to.be.an('error');
      console.error(`URL ERROR ===> ${error}`);
    });
  });

  it('Get URL', async () => {
    return getSong().then(url => {
      expect(url).to.be.a('string');
      console.error(`URL ===> ${url}`);
    });
  });
});
