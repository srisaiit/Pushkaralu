import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import https from 'https';
import msedgeTtsPkg from 'msedge-tts';

const { MsEdgeTTS, OUTPUT_FORMAT } = msedgeTtsPkg.default || msedgeTtsPkg;

// High-quality native Indian neural voices
const NEURAL_VOICES = {
  te: 'te-IN-ShrutiNeural',  // Native Andhra/Telangana Telugu Female
  hi: 'hi-IN-SwaraNeural',   // Native Indian Hindi Female
  en: 'en-IN-NeerjaNeural'   // Natural Indian English Female
};

// Fallback Google Translate TTS chunk
function fetchGoogleTtsChunk(text, lang) {
  return new Promise((resolve, reject) => {
    const clean = text
      .replace(/[*_#`~[\]()]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/(\d{4})-(\d{7})/g, '$1 $2')
      .trim();

    const targetLang = lang === 'te' ? 'te' : lang === 'hi' ? 'hi' : 'en';
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(clean)}&tl=${targetLang}&client=tw-ob`;

    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`TTS fallback status: ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });

    req.on('error', reject);
  });
}

// Synthesize audio using authentic Microsoft Azure Neural Voice via msedge-tts
async function synthesizeNeuralAudio(text, lang) {
  const clean = text
    .replace(/[*_#`~[\]()]/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/(\d{4})-(\d{7})/g, '$1 $2')
    .trim();

  const voice = NEURAL_VOICES[lang] || NEURAL_VOICES.te;
  const tts = new MsEdgeTTS();
  await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

  const { audioStream } = tts.toStream(clean);
  const chunks = [];

  return new Promise((resolve, reject) => {
    audioStream.on('data', (chunk) => chunks.push(chunk));
    audioStream.on('end', () => resolve(Buffer.concat(chunks)));
    audioStream.on('error', reject);
  });
}

// In-memory audio cache for sub-10ms response latency
const ttsCache = new Map();

function ttsApiPlugin() {
  const handler = async (req, res) => {
    try {
      const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
      const text = parsedUrl.searchParams.get('text');
      const lang = parsedUrl.searchParams.get('lang') || 'te';

      if (!text || !text.trim()) {
        res.statusCode = 400;
        res.end('Missing text parameter');
        return;
      }

      const cacheKey = `${lang}:${text.trim()}`;
      if (ttsCache.has(cacheKey)) {
        const cached = ttsCache.get(cacheKey);
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        res.setHeader('X-TTS-Source', 'Cache');
        res.end(cached);
        return;
      }

      let audioBuffer;
      try {
        // 1. Primary: Authentic Microsoft Neural Voice
        audioBuffer = await synthesizeNeuralAudio(text, lang);
      } catch (neuralErr) {
        console.warn('Neural TTS fallback activated:', neuralErr.message);
        // 2. Fallback: Google Translate TTS
        audioBuffer = await fetchGoogleTtsChunk(text, lang);
      }

      // Bound cache size
      if (ttsCache.size > 250) {
        const firstKey = ttsCache.keys().next().value;
        ttsCache.delete(firstKey);
      }
      ttsCache.set(cacheKey, audioBuffer);

      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.setHeader('X-TTS-Source', 'Neural');
      res.end(audioBuffer);
    } catch (err) {
      console.error('TTS API error:', err);
      res.statusCode = 500;
      res.end(err.message || 'TTS generation error');
    }
  };

  return {
    name: 'tts-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/tts', handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/tts', handler);
    }
  };
}

export default defineConfig({
  plugins: [react(), ttsApiPlugin()],
  server: {
    port: 8080,
    open: false,
    host: true
  },
  preview: {
    port: 8080,
    host: true
  }
});
