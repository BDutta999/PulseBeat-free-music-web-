const youtubeSearchApi = require('youtube-search-api');

async function test() {
  try {
    const res = await youtubeSearchApi.GetListByKeyword('faded alan walker', false, 5);
    console.log(JSON.stringify(res, null, 2));
  } catch(e) {
    console.error(e);
  }
}
test();
