import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Square, Sparkles, Send, RotateCcw, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { queryPushkarAI, detectLanguage } from '../ai/knowledgeEngine';
import { speechService } from '../ai/speechService';

export default function AiVoiceSection({
  lang = 'te',
  setLang,
  isListening,
  setIsListening
}) {
  const [transcript, setTranscript] = useState('');
  const [currentResponse, setCurrentResponse] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [speechError, setSpeechError] = useState(null);
  const [inputText, setInputText] = useState('');
  const [activeVoiceInfo, setActiveVoiceInfo] = useState('');
  const [latencyMs, setLatencyMs] = useState(null);

  // In-flight concurrency lock to prevent multiple triggers
  const processingLockRef = useRef(false);
  const conversationContextRef = useRef([]);
  const answerRef = useRef(null);

  // Update voice descriptor on language change
  useEffect(() => {
    setActiveVoiceInfo(speechService.getVoiceDescriptor(lang));
  }, [lang]);

  // Cleanup on unmount: immediately cancel all speech
  useEffect(() => {
    return () => {
      speechService.stopSpeaking();
      speechService.stopListening();
    };
  }, []);

  // Handle Question Processing (guaranteed single execution)
  const handleProcessQuestion = (queryText) => {
    if (!queryText || !queryText.trim()) return;
    if (processingLockRef.current) return;
    processingLockRef.current = true;

    // Hard stop all audio & mic immediately before starting new response
    speechService.stopSpeaking();
    speechService.stopListening();
    setIsSpeaking(false);
    setIsListening(false);
    setIsProcessing(true);
    setSpeechError(null);

    const startTime = performance.now();

    // Query Knowledge Engine with conversation context
    const result = queryPushkarAI(queryText, lang, conversationContextRef.current);
    const endTime = performance.now();
    const latency = Math.round(endTime - startTime);
    setLatencyMs(latency);

    // Update conversation context memory
    conversationContextRef.current = [
      ...conversationContextRef.current.slice(-5),
      { role: 'user', content: queryText },
      { role: 'assistant', content: result.displayText, category: result.category }
    ];

    const responseObj = {
      id: Date.now(),
      question: queryText,
      answer: result.displayText,
      spokenText: result.spokenText,
      language: result.language,
      category: result.category,
      action: result.action,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setCurrentResponse(responseObj);
    setTranscript('');

    // If language was explicitly detected from native script, keep sync
    if (setLang && ['te', 'hi', 'en'].includes(result.language) && result.language !== lang) {
      setLang(result.language);
    }

    // Playback Spoken Response via high-quality Single-Speaker Neural TTS
    speechService.speakText(
      result.spokenText,
      result.language,
      () => {
        setIsProcessing(false);
        setIsSpeaking(true);
        processingLockRef.current = false;
      },
      () => {
        setIsProcessing(false);
        setIsSpeaking(false);
        processingLockRef.current = false;
      },
      (err) => {
        console.warn('Speech playback notification:', err);
        setIsProcessing(false);
        setIsSpeaking(false);
        processingLockRef.current = false;
      }
    );

    // Auto-scroll to answer card
    setTimeout(() => {
      answerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 120);
  };

  // Toggle Microphone
  const toggleListening = () => {
    setSpeechError(null);

    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
      if (transcript && transcript.trim().length > 1) {
        handleProcessQuestion(transcript);
      }
    } else {
      // Immediate user interruption: stop all speech instantly
      speechService.stopSpeaking();
      setIsSpeaking(false);
      setIsProcessing(false);
      setIsListening(true);
      setTranscript('');

      speechService.startListening(
        lang,
        (res) => {
          setTranscript(res.transcript);
          if (res.isFinal && res.transcript.trim().length > 1) {
            speechService.stopListening();
            setIsListening(false);
            handleProcessQuestion(res.transcript);
          }
        },
        (err) => {
          console.warn('Recognition error:', err);
          setIsListening(false);
          setIsProcessing(false);
          processingLockRef.current = false;
          if (err === 'not-allowed') {
            setSpeechError(
              lang === 'te'
                ? "మైక్రోఫోన్ అనుమతి నిరాకరించబడింది. దయచేసి బ్రౌజర్‌లో మైక్ అనుమతించండి లేదా క్రింద టైప్ చేయండి."
                : lang === 'hi'
                ? "माइक्रोफोन अनुमति अस्वीकृत है। कृपया ब्राउज़र में माइक की अनुमति दें या नीचे टाइप करें।"
                : "Microphone permission was denied. Please allow microphone access or use the text box below."
            );
          } else if (err === 'no-speech') {
            setSpeechError(
              lang === 'te'
                ? "శబ్దం వినపడలేదు. దయచేసి మరలా మాట్లాడండి."
                : lang === 'hi'
                ? "कोई आवाज़ नहीं सुनी गई। कृपया पुनः बोलें।"
                : "No speech detected. Please speak clearly into your microphone."
            );
          } else {
            setSpeechError(`Notice: ${err}`);
          }
        },
        () => {
          setIsListening(false);
        }
      );
    }
  };

  // Stop Spoken Audio (Immediate Interruption)
  const handleStopAudio = () => {
    speechService.stopSpeaking();
    setIsSpeaking(false);
    setIsProcessing(false);
    processingLockRef.current = false;
  };

  // Replay Spoken Audio (Single instance)
  const handleReplayAudio = () => {
    if (!currentResponse) return;
    speechService.stopSpeaking();
    setIsSpeaking(false);
    setIsProcessing(true);

    speechService.speakText(
      currentResponse.spokenText,
      currentResponse.language,
      () => {
        setIsProcessing(false);
        setIsSpeaking(true);
      },
      () => {
        setIsProcessing(false);
        setIsSpeaking(false);
      },
      () => {
        setIsProcessing(false);
        setIsSpeaking(false);
      }
    );
  };

  // Submit Text Query Fallback
  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const text = inputText;
    setInputText('');
    handleProcessQuestion(text);
  };

  // Curated test questions for each language
  const testPromptsByLang = {
    te: [
      { label: "గోదావరి పుష్కరాలు ఎప్పుడు?", q: "గోదావరి పుష్కరాలు ఎప్పుడు జరుగుతాయి?" },
      { label: "పార్కింగ్ సౌకర్యం ఎక్కడ ఉంది?", q: "భక్తులకు పార్కింగ్ సౌకర్యం ఎక్కడ ఉంది?" },
      { label: "సమీపంలో స్నాన ఘాట్ ఎక్కడ ఉంది?", q: "సమీపంలో స్నాన ఘాట్ ఎక్కడ ఉంది?" },
      { label: "బట్టలు మార్చుకునే గదులు ఉన్నాయా?", q: "దుస్తులు మార్చుకోవడానికి ప్రత్యేక గదులు ఉన్నాయా?" },
      { label: "తాగునీటి సౌకర్యాలు ఎక్కడ ఉన్నాయి?", q: "తాగునీటి సౌకర్యాలు ఎక్కడ ఉన్నాయి?" },
      { label: "రాజమండ్రి నుంచి ఎలా రావాలి?", q: "నేను రాజమండ్రి నుంచి ఎలా రావాలి?" }
    ],
    en: [
      { label: "When will Pushkaralu take place?", q: "When will Godavari Pushkaralu 2027 take place?" },
      { label: "Where can pilgrims park?", q: "Where can pilgrims park their vehicles?" },
      { label: "Are changing rooms available?", q: "Are changing rooms available near the bathing ghats?" },
      { label: "Where can I find drinking water?", q: "Where can I find drinking water?" },
      { label: "How to reach nearest ghat?", q: "How can I reach the nearest bathing ghat?" }
    ],
    hi: [
      { label: "पुष्करालु कब होंगे?", q: "गोदावरी पुष्करालु 2027 कब होंगे?" },
      { label: "पार्किंग कहाँ उपलब्ध है?", q: "श्रद्धालुओं के लिए पार्किंग कहाँ उपलब्ध है?" },
      { label: "कपड़े बदलने की सुविधा?", q: "क्या स्नान घाट के पास कपड़े बदलने की सुविधा है?" },
      { label: "पीने का पानी कहाँ मिलेगा?", q: "पीने का पानी कहाँ मिलेगा?" },
      { label: "निकटतम स्नान घाट कैसे पहुँचें?", q: "मैं निकटतम स्नान घाट तक कैसे पहुँच सकता हूँ?" }
    ]
  };

  const activePrompts = testPromptsByLang[lang] || testPromptsByLang.te;

  return (
    <div id="ai" className="relative w-full max-w-4xl mx-auto px-4 py-6 sm:py-8 flex flex-col items-center">
      {/* 1. Header & Title with High Contrast Dark Navy Text */}
      <div className="text-center w-full">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#e0f2fe] dark:bg-slate-800 border-2 border-[#172554] px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#172554] dark:text-teal-300 mb-3 shadow-xs">
          <Sparkles className="h-3.5 w-3.5 text-[#172554] dark:text-teal-300" />
          Godavari Pushkaralu 2027
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#172554] dark:text-white">
          Godavari Pushkaralu AI Voice Assistant
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-2xl mx-auto font-bold">
          {lang === 'te'
            ? "స్వాభావిక ఆంధ్ర/తెలంగాణ తెలుగు స్వరంలో సమాధానం పొందండి. ఘాట్లు, దర్శనం, పార్కింగ్ మరియు సేవలపై మాట్లాడండి."
            : lang === 'hi'
            ? "प्राकृतिक भारतीय हिन्दी स्वर में सहायता प्राप्त करें। स्नान घाट, मंदिर, पार्किंग और सुविधाओं पर बात करें।"
            : "Natural two-way voice assistant in Telugu, English, and Hindi. Ask about ghats, darshan, parking, and visitor facilities."}
        </p>

        {/* 2. Language Selector: All Dark Navy Text, Pale Blue for Selected */}
        <div className="mt-6 inline-flex items-center gap-2 p-1.5 rounded-full bg-[#f1f5f9] dark:bg-slate-800 border-2 border-[#172554] shadow-sm">
          {[
            { id: 'te', label: 'తెలుగు' },
            { id: 'en', label: 'English' },
            { id: 'hi', label: 'हिन्दी' }
          ].map((item) => {
            const isSelected = lang === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (setLang) setLang(item.id);
                  speechService.stopSpeaking();
                  setIsSpeaking(false);
                }}
                className={`px-6 py-2.5 rounded-full text-sm sm:text-base font-black transition-all cursor-pointer select-none min-h-[44px] ${
                  isSelected
                    ? 'bg-[#dbeafe] dark:bg-teal-950 text-[#172554] dark:text-teal-200 border-2 border-[#1d4ed8] dark:border-teal-400 shadow-md scale-102 ring-2 ring-[#172554]/20'
                    : 'bg-white dark:bg-slate-900 text-[#172554] dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Central Master Microphone Widget: Cream/White Background with Dark Navy Icon & Text */}
      <div className="mt-10 flex flex-col items-center w-full">
        <div className="relative flex h-72 w-72 sm:h-80 sm:w-80 items-center justify-center">
          {/* Subtle Outer Animated Rings */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-700 ${
              isListening
                ? 'bg-red-500/20 scale-110 opacity-70 animate-ping'
                : isSpeaking
                ? 'bg-emerald-500/20 scale-105 opacity-60 animate-pulse'
                : 'bg-[#172554]/10 opacity-30'
            }`}
          />
          <div
            className={`absolute inset-6 rounded-full transition-all duration-500 ${
              isListening
                ? 'bg-red-500/25 scale-105 opacity-80'
                : isSpeaking
                ? 'bg-emerald-500/20 scale-105 opacity-70'
                : 'bg-[#172554]/15 opacity-40'
            }`}
          />

          {/* Master Microphone Button: Cream/White Background with Dark Navy Icon & Text */}
          <button
            id="master-mic-button"
            onClick={toggleListening}
            aria-label={isListening ? 'Stop listening' : 'Start speaking with AI'}
            className={`relative grid h-48 w-48 sm:h-52 sm:w-52 place-items-center rounded-full transition-all cursor-pointer select-none focus:outline-none focus:ring-4 focus:ring-[#172554]/30 active:scale-95 shadow-xl hover:shadow-2xl ${
              isListening
                ? 'bg-[#fef2f2] dark:bg-red-950/40 border-4 border-red-600 ring-4 ring-red-400/50 animate-pulse'
                : isProcessing
                ? 'bg-[#eff6ff] dark:bg-blue-950/40 border-4 border-[#1d4ed8]'
                : isSpeaking
                ? 'bg-[#ecfdf5] dark:bg-emerald-950/40 border-4 border-emerald-600 ring-4 ring-emerald-400/50'
                : 'bg-[#fefdf9] dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800 border-4 border-[#172554] hover:scale-105 ring-2 ring-[#172554]/20'
            }`}
          >
            <div className="flex flex-col items-center justify-center gap-2 px-4 text-center">
              {isListening ? (
                <>
                  <MicOff className="h-16 w-16 sm:h-20 sm:w-20 text-red-600 animate-bounce stroke-[2.2]" />
                  <span className="font-display font-black text-base sm:text-lg tracking-wide text-red-900 dark:text-red-200">
                    {lang === 'te' ? 'వింటున్నాను...' : lang === 'hi' ? 'सुन रहा हूँ...' : 'Listening...'}
                  </span>
                </>
              ) : isProcessing ? (
                <>
                  <Loader2 className="h-16 w-16 sm:h-20 sm:w-20 text-[#1d4ed8] dark:text-blue-300 animate-spin stroke-[2.2]" />
                  <span className="font-display font-black text-base sm:text-lg text-[#172554] dark:text-blue-200">
                    {lang === 'te' ? 'ఆలోచిస్తున్నాను...' : lang === 'hi' ? 'समझ रहा हूँ...' : 'Processing...'}
                  </span>
                </>
              ) : isSpeaking ? (
                <>
                  <Volume2 className="h-16 w-16 sm:h-20 sm:w-20 text-emerald-700 dark:text-emerald-300 animate-pulse stroke-[2.2]" />
                  <span className="font-display font-black text-base sm:text-lg text-[#064e3b] dark:text-emerald-200">
                    {lang === 'te' ? 'మాట్లాడుతున్నాను...' : lang === 'hi' ? 'बोल रहा हूँ...' : 'Speaking...'}
                  </span>
                </>
              ) : (
                <>
                  <Mic className="h-16 w-16 sm:h-20 sm:w-20 text-[#172554] dark:text-teal-300 stroke-[2.2] drop-shadow-xs" />
                  <span className="font-display font-black text-lg sm:text-xl tracking-wider uppercase text-[#172554] dark:text-white">
                    Talk with AI
                  </span>
                </>
              )}
            </div>
          </button>
        </div>

        {/* 4. High-Contrast Status State Banners with Dark Text */}
        <div className="mt-4 flex flex-col items-center w-full min-h-[4rem]">
          {/* A. Listening Indicator (Pale Red with Dark Red Text) */}
          {isListening && (
            <div className="flex items-center gap-3 rounded-full bg-[#fee2e2] dark:bg-red-950/60 border-2 border-red-600 px-6 py-2.5 text-sm sm:text-base font-black text-[#991b1b] dark:text-red-100 shadow-md animate-pulse">
              <span className="h-3 w-3 rounded-full bg-red-600 animate-ping" />
              <span>
                {lang === 'te'
                  ? 'మీ ప్రశ్న వింటున్నాను... దయచేసి మాట్లాడండి'
                  : lang === 'hi'
                  ? 'आपकी आवाज़ सुन रहा हूँ... कृपया बोलें'
                  : 'Listening to your voice... Speak now'}
              </span>
            </div>
          )}

          {/* B. Processing Indicator (Pale Blue with Dark Blue Text) */}
          {isProcessing && (
            <div className="flex items-center gap-3 rounded-full bg-[#dbeafe] dark:bg-blue-950/60 border-2 border-[#1d4ed8] px-6 py-2.5 text-sm sm:text-base font-black text-[#1e40af] dark:text-blue-100 shadow-md">
              <Loader2 className="h-5 w-5 animate-spin text-[#1d4ed8]" />
              <span>
                {lang === 'te'
                  ? 'సమాధానం సిద్ధం చేస్తున్నాను...'
                  : lang === 'hi'
                  ? 'उत्तर तैयार किया जा रहा है...'
                  : 'Processing verified answer...'}
              </span>
            </div>
          )}

          {/* C. Speaking Indicator (Pale Emerald with Dark Emerald Text & Visible Stop Button) */}
          {isSpeaking && (
            <div className="flex items-center gap-3 rounded-full bg-[#d1fae5] dark:bg-emerald-950/60 border-2 border-emerald-600 px-6 py-2.5 text-sm sm:text-base font-black text-[#065f46] dark:text-emerald-100 shadow-md">
              <div className="flex items-center gap-1 h-4">
                <span className="h-4 w-1 bg-[#065f46] dark:bg-emerald-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-4 w-1 bg-[#065f46] dark:bg-emerald-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-4 w-1 bg-[#065f46] dark:bg-emerald-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span>
                {lang === 'te'
                  ? 'సౌమ్యమైన తెలుగు స్వరంలో సమాధానం చెబుతున్నాను...'
                  : lang === 'hi'
                  ? 'सौम्य भारतीय महिला स्वर में उत्तर दे रही हूँ...'
                  : 'Speaking verified answer in natural Indian voice...'}
              </span>
              <button
                onClick={handleStopAudio}
                title="Stop speaking immediately"
                className="ml-3 inline-flex items-center gap-1.5 rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white px-3.5 py-1 text-xs font-black shadow-sm cursor-pointer transition border border-red-700"
              >
                <Square className="h-3.5 w-3.5 fill-current" /> Stop
              </button>
            </div>
          )}

          {/* D. Live Hearing Transcript Box */}
          {transcript && !isProcessing && (
            <div className="mt-3 max-w-lg rounded-xl bg-white dark:bg-slate-900 border-2 border-[#172554] p-4 text-center text-sm shadow-md animate-fade-in w-full">
              <span className="text-[#172554] dark:text-teal-400 text-xs block mb-1 font-black uppercase tracking-widest">
                {lang === 'te' ? 'విన్న ప్రశ్న:' : lang === 'hi' ? 'सुना गया प्रश्न:' : 'Recognized Speech:'}
              </span>
              <p className="font-black text-[#111827] dark:text-slate-100 text-base sm:text-lg italic">"{transcript}"</p>
            </div>
          )}

          {/* E. Error Notification */}
          {speechError && (
            <div className="mt-3 flex items-center gap-2.5 text-xs sm:text-sm text-[#991b1b] dark:text-red-200 bg-[#fee2e2] dark:bg-red-950/60 border-2 border-red-600 px-5 py-3 rounded-xl max-w-lg text-center font-bold shadow-sm">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
              <span>{speechError}</span>
            </div>
          )}
        </div>

        {/* 5. Quick Sample Test Questions (High-Contrast Dark Navy Text on White/Cream Chips) */}
        <div className="mt-4 flex flex-wrap justify-center gap-2 max-w-2xl px-2">
          {activePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleProcessQuestion(p.q)}
              className="rounded-full border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-[#172554] hover:bg-[#dbeafe] text-[#172554] dark:text-slate-100 px-4 py-2 text-xs sm:text-sm font-black transition cursor-pointer shadow-xs"
            >
              "{p.label}"
            </button>
          ))}
        </div>

        {/* 6. Short Answer Transcript Card with High-Contrast Dark Text */}
        {currentResponse && (
          <div
            ref={answerRef}
            className="mt-8 w-full max-w-2xl bg-white dark:bg-slate-900 border-2 border-[#172554]/30 rounded-2xl p-6 sm:p-7 shadow-xl animate-fade-in"
          >
            {/* Pilgrim Question */}
            <div className="flex items-start justify-between gap-4 border-b-2 border-slate-200 dark:border-slate-800 pb-4 mb-4">
              <div>
                <span className="text-xs uppercase tracking-widest font-black text-[#172554] dark:text-teal-400 block mb-1">
                  {lang === 'te' ? 'భక్తుని ప్రశ్న:' : lang === 'hi' ? 'तीर्थयात्री का प्रश्न:' : 'Pilgrim Question:'}
                </span>
                <p className="font-display text-base sm:text-lg font-black text-[#111827] dark:text-white">
                  "{currentResponse.question}"
                </p>
              </div>

              {/* Controls: Replay / Stop */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleReplayAudio}
                  title="Repeat last answer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#dbeafe] hover:bg-[#bfdbfe] text-[#172554] px-4 py-2 text-xs font-black transition shadow-xs cursor-pointer border-2 border-[#172554]"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Repeat</span>
                </button>
                {isSpeaking && (
                  <button
                    onClick={handleStopAudio}
                    title="Stop speaking"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white px-4 py-2 text-xs font-black transition shadow-xs cursor-pointer border border-red-700"
                  >
                    <Square className="h-3.5 w-3.5 fill-current" />
                    <span>Stop</span>
                  </button>
                )}
              </div>
            </div>

            {/* AI Verified Answer Transcript */}
            <div className="text-[#1f2937] dark:text-slate-200 text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium">
              {currentResponse.answer}
            </div>

            {/* Follow-up Prompt Bar */}
            <div className="mt-5 pt-4 border-t-2 border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-400 font-black">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                {lang === 'te'
                  ? 'సమాధానం పూర్తయింది. మీరు తదుపరి ప్రశ్నను అడగవచ్చు.'
                  : lang === 'hi'
                  ? 'उत्तर पूर्ण हुआ। आप अगला प्रश्न पूछ सकते हैं।'
                  : 'Answer complete. You can ask another question.'}
              </span>
              <button
                onClick={toggleListening}
                className="inline-flex items-center gap-1 text-[#172554] dark:text-teal-400 hover:underline font-black cursor-pointer text-sm"
              >
                <Mic className="h-4 w-4" /> Ask Follow-up
              </button>
            </div>
          </div>
        )}

        {/* 7. Text Fallback Input Bar */}
        <form onSubmit={handleTextSubmit} className="mt-8 flex w-full max-w-xl items-center gap-2 rounded-full border-2 border-[#172554] bg-white dark:bg-slate-900 px-4 py-2.5 shadow-md">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              lang === 'te'
                ? "ప్రశ్నను ఇక్కడ టైప్ చేయండి (ఉదా: పార్కింగ్ ఎక్కడ ఉంది?)..."
                : lang === 'hi'
                ? "यहाँ प्रश्न लिखें (उदा: पार्किंग कहाँ उपलब्ध है?)..."
                : "Type your question here (e.g. Where can pilgrims park?)..."
            }
            className="flex-1 bg-transparent text-sm sm:text-base outline-none text-[#111827] dark:text-white placeholder:text-slate-500 font-bold px-2"
          />
          <button
            type="submit"
            aria-label="Send question"
            className="grid h-10 w-10 place-items-center rounded-full bg-[#172554] hover:bg-[#1e3a8a] text-white shadow hover:scale-105 transition cursor-pointer"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>

        {/* Active Voice Engine Status with Dark Navy Text */}
        {activeVoiceInfo && (
          <div className="mt-4 text-xs text-slate-700 dark:text-slate-400 text-center font-bold">
            Voice engine: <span className="font-black text-[#172554] dark:text-white">{activeVoiceInfo}</span>
            {latencyMs !== null && (
              <span> · Response latency: <strong className="text-emerald-800 dark:text-emerald-400 font-black">{latencyMs}ms</strong></span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
