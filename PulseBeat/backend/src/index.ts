import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// @ts-ignore
const youtubeSearchApi = require('youtube-search-api');
const youtubedl = require('youtube-dl-exec');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'PulseBeat Backend is running' });
});

// YouTube Audio Stream Route
app.get('/api/stream', async (req, res) => {
  const videoId = req.query.id as string;
  if (!videoId) return res.status(400).send('Video ID is required');

  try {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    
    // Use youtube-dl-exec to reliably fetch the raw audio URL
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
    const formats = output.formats.filter((f: any) => f.acodec !== 'none' && f.vcodec === 'none');
    
    if (formats.length > 0) {
      // Redirect the native audio player directly to YouTube's high-speed CDN
      res.redirect(formats[0].url);
    } else {
      res.status(404).send('No audio format found');
    }
  } catch (err) {
    console.error('Stream setup error:', err);
    res.redirect('https://cdn.pixabay.com/download/audio/2022/03/15/audio_2491a6d71b.mp3?filename=hip-hop-rock-beats-118000.mp3');
  }
});

// Search Route (using YouTube API for real famous songs)
app.get('/api/search', async (req, res) => {
  try {
    const query = req.query.q as string;
if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const result = await youtubeSearchApi.GetListByKeyword(query, false, 20);
    const videos = result.items.filter((item: any) => item.type === 'video');
    
    const formattedResults = videos.map((video: any) => {
      let img = 'https://via.placeholder.com/600';
      if (video.thumbnail && video.thumbnail.thumbnails && video.thumbnail.thumbnails.length > 0) {
        img = video.thumbnail.thumbnails[video.thumbnail.thumbnails.length - 1].url;
      }

      return {
        id: video.id,
        title: video.title,
        artist: video.channelTitle,
        img: img,
        audioUrl: `http://localhost:5000/api/stream?id=${video.id}`
      };
    });

    res.status(200).json({ results: formattedResults });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
