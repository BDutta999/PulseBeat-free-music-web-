const play = require('play-dl');

async function test() {
  try {
    const stream = await play.stream('https://www.youtube.com/watch?v=60ItHLz5WEA');
    console.log("Stream URL:", stream.url);
  } catch(e) {
    console.error(e);
  }
}
test();
