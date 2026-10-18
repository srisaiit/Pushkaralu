// High-Quality Native Telugu, Hindi & Indian English Text-to-Speech Engine
// Single-Speaker Playback Controller: Guarantees exactly ONE voice plays at any time
// Features authentic Microsoft Azure Neural Voice synthesis with strict cancellation

class SpeechService {
  constructor() {
    this.recognition = null;
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.isListening = false;
    this.isSpeaking = false;
    this.currentAudio = null;
    this.currentUtterance = null;
    this.voices = [];
    this.hasSpeechRecognition = false;
    this.sessionCounter = 0; // Incremented on every request or cancellation

    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.hasSpeechRecognition = true;
      }
      this.initVoices();
    }
  }

  initVoices() {
    if (!this.synth) return;
    const loadVoices = () => {
      this.voices = this.synth.getVoices();
    };
    loadVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoices;
    }
  }

  // Active voice descriptor for UI
  getVoiceDescriptor(lang = 'te') {
    if (lang === 'te') {
      return "Microsoft Shruti Neural Voice — Native Andhra/Telangana Telugu (స్వాభావిక తెలుగు స్వరం)";
    } else if (lang === 'hi') {
      return "Microsoft Swara Neural Voice — Native Indian Hindi (स्वाभाविक भारतीय हिन्दी)";
    } else {
      return "Microsoft Neerja Neural Voice — Natural Indian English (Clear & Warm)";
    }
  }

  // Find local browser female voice fallback (used ONLY if neural service is completely unreachable)
  getBrowserFallbackVoice(lang = 'en') {
    if (!this.voices || this.voices.length === 0) {
      this.initVoices();
    }
    const voices = this.voices || [];

    const femaleKeywords = ['female', 'woman', 'zira', 'swara', 'kalpana', 'heera', 'neerja', 'priya', 'sangeeta', 'sunita', 'shruti', 'geeta', 'natural', 'samantha', 'victoria'];
    const maleKeywords = ['david', 'george', 'mark', 'ravi', 'madhav', 'male', 'man'];

    const isFemale = (v) => {
      const name = (v.name || '').toLowerCase();
      if (maleKeywords.some((m) => name.includes(m))) return false;
      return femaleKeywords.some((f) => name.includes(f));
    };

    if (lang === 'te') {
      const teVoice = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('te') && isFemale(v)) ||
                      voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('te'));
      if (teVoice) return { voice: teVoice, isNative: true, langCode: 'te-IN' };

      const inVoice = voices.find((v) => v.lang && v.lang.toLowerCase().includes('in') && isFemale(v));
      if (inVoice) return { voice: inVoice, isNative: false, langCode: 'en-IN' };

      return { voice: voices.find(isFemale) || voices[0] || null, isNative: false, langCode: 'en-US' };
    }

    if (lang === 'hi') {
      const hiVoice = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('hi') && isFemale(v)) ||
                      voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('hi'));
      if (hiVoice) return { voice: hiVoice, isNative: true, langCode: 'hi-IN' };

      const inVoice = voices.find((v) => v.lang && v.lang.toLowerCase().includes('in') && isFemale(v));
      if (inVoice) return { voice: inVoice, isNative: false, langCode: 'en-IN' };

      return { voice: voices.find(isFemale) || voices[0] || null, isNative: false, langCode: 'en-US' };
    }

    // English
    const enInVoice = voices.find((v) => v.lang && v.lang.toLowerCase().includes('in') && isFemale(v));
    if (enInVoice) return { voice: enInVoice, isNative: true, langCode: enInVoice.lang };

    const enFemale = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('en') && isFemale(v));
    if (enFemale) return { voice: enFemale, isNative: true, langCode: enFemale.lang || 'en-US' };

    return { voice: voices[0] || null, isNative: true, langCode: 'en-US' };
  }

  // STOP ALL SPEECH IMMEDIATELY (Hard stop and cleanup for single-speaker guarantee)
  stopSpeaking() {
    // 1. Invalidate any in-flight playback sessions
    this.sessionCounter++;

    // 2. Hard stop and cancel Web Speech Synthesis (NEVER let it speak concurrently)
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {
        // ignore
      }
      this.currentUtterance = null;
    }

    // 3. Hard stop and release HTML5 Audio
    if (this.currentAudio) {
      const a = this.currentAudio;
      this.currentAudio = null;
      try {
        a.onplay = null;
        a.onended = null;
        a.onerror = null;
        a.pause();
        a.currentTime = 0;
        a.removeAttribute('src');
        a.load(); // Releases audio pipeline hardware
      } catch (e) {
        // ignore
      }
    }

    this.isSpeaking = false;
  }

  // Primary High-Quality Neural TTS Playback (Single-Speaker Controller)
  speakText(text, lang = 'te', onStart, onEnd, onError) {
    // 1. Stop all previous speech immediately
    this.stopSpeaking();

    if (!text || !text.trim()) {
      if (onEnd) onEnd();
      return;
    }

    // Capture this unique session ID
    const currentSession = this.sessionCounter;

    // Clean text of markdown formatting
    const cleanText = text
      .replace(/[*_#`~[\]]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/(\d{4})-(\d{7})/g, '$1 $2')
      .trim();

    const encoded = encodeURIComponent(cleanText);
    const audioUrl = `/api/tts?text=${encoded}&lang=${lang}`;

    const audio = new Audio();
    this.currentAudio = audio;

    audio.onplay = () => {
      // Discard if session was cancelled or replaced
      if (this.sessionCounter !== currentSession) {
        try { audio.pause(); } catch (e) {}
        return;
      }
      this.isSpeaking = true;
      if (onStart) onStart();
    };

    audio.onended = () => {
      if (this.sessionCounter !== currentSession) return;
      this.isSpeaking = false;
      this.currentAudio = null;
      if (onEnd) onEnd();
    };

    audio.onerror = (e) => {
      // If session was cancelled, do NOT fallback
      if (this.sessionCounter !== currentSession) return;
      console.warn('Neural audio playback network notice, trying local fallback:', e);
      this.currentAudio = null;
      this.speakLocalSynthesis(cleanText, lang, currentSession, onStart, onEnd, onError);
    };

    try {
      audio.src = audioUrl;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // If the audio was interrupted/aborted or a new request started, DO NOT FALLBACK!
          if (this.sessionCounter !== currentSession) return;
          if (err && err.name === 'AbortError') return; // User stopped audio intentionally

          console.warn('Audio play notice:', err.message);
          this.speakLocalSynthesis(cleanText, lang, currentSession, onStart, onEnd, onError);
        });
      }
    } catch (err) {
      if (this.sessionCounter !== currentSession) return;
      console.warn('Audio creation error:', err);
      this.speakLocalSynthesis(cleanText, lang, currentSession, onStart, onEnd, onError);
    }
  }

  // Local Web Speech Synthesis fallback (Strictly guarded by session ID)
  speakLocalSynthesis(cleanText, lang, expectedSession, onStart, onEnd, onError) {
    // If request is outdated or cancelled, abort immediately
    if (this.sessionCounter !== expectedSession) return;

    if (!this.synth) {
      this.isSpeaking = false;
      if (onError) onError('Speech synthesis unavailable.');
      return;
    }

    // Cancel any queued speech before starting fallback
    try {
      this.synth.cancel();
    } catch (e) {}

    try {
      const voiceObj = this.getBrowserFallbackVoice(lang);
      const utterance = new SpeechSynthesisUtterance(cleanText);

      if (voiceObj.voice) {
        utterance.voice = voiceObj.voice;
      }
      utterance.lang = voiceObj.langCode;
      utterance.rate = 0.94;
      utterance.pitch = 1.05;

      utterance.onstart = () => {
        if (this.sessionCounter !== expectedSession) {
          try { this.synth.cancel(); } catch (e) {}
          return;
        }
        this.isSpeaking = true;
        if (onStart) onStart();
      };

      utterance.onend = () => {
        if (this.sessionCounter !== expectedSession) return;
        this.isSpeaking = false;
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        if (this.sessionCounter !== expectedSession) return;
        this.isSpeaking = false;
        this.currentUtterance = null;
        if (onError) onError(e);
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    } catch (err) {
      this.isSpeaking = false;
      if (onError) onError(err);
    }
  }

  // Start speech recognition
  startListening(lang = 'te', onResult, onError, onEnd) {
    if (!this.recognition) {
      if (onError) onError('Speech recognition is not supported in this browser.');
      return;
    }

    // Stop all audio playback immediately when starting to listen (interruptibility!)
    this.stopSpeaking();

    // Set recognition language locale
    if (lang === 'te') {
      this.recognition.lang = 'te-IN';
    } else if (lang === 'hi') {
      this.recognition.lang = 'hi-IN';
    } else {
      this.recognition.lang = 'en-IN';
    }

    this.recognition.onstart = () => {
      this.isListening = true;
    };

    this.recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (onResult) {
        onResult({
          transcript: finalTranscript || interimTranscript,
          isFinal: !!finalTranscript
        });
      }
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      if (onError) onError(event.error || 'Speech recognition error');
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (onEnd) onEnd();
    };

    try {
      this.recognition.start();
    } catch (err) {
      console.warn('Speech recognition start notice:', err);
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
    }
    this.isListening = false;
  }
}

export const speechService = new SpeechService();
