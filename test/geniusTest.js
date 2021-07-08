const expect = require('chai').expect;
const { getLyric } = require('../src/genius');

describe('Genius API Tests', () => {
  it('Catch Error', async () => {
    return getLyric().catch(error => {
      expect(typeof error).to.be.an('error');
      console.error(`LYRIC ERROR ===> ${error}`);
    });
  });

  it('Get Lyric', async () => {
    require('dotenv').config();
    return getLyric().then(lyric => {
      expect(lyric).to.be.an('object');
      expect(lyric.body).to.be.a('string');
      expect(lyric.title).to.be.a('string');
      console.error(`LYRIC ===> body: ${lyric.body}, title: ${lyric.title}`);
    })
  });
});
