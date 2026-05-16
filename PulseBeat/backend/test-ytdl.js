const youtubedl = require('youtube-dl-exec');

async function test() {
  try {
    const url = 'https://www.youtube.com/watch?v=60ItHLz5WEA';
    const output = await youtubedl(url, {
      dumpJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: [
        'referer:youtube.com',
        'user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36'
      ]
    });
    
    // Find audio only format
    const formats = output.formats.filter(f => f.acodec !== 'none' && f.vcodec === 'none');
    console.log("Audio formats found:", formats.length);
    if(formats.length > 0) {
      console.log("Stream URL:", formats[0].url);
    }
  } catch(e) {
    console.error(e);
  }
}
test();
