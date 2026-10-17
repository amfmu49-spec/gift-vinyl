/* ==========================================================================
   AuraVinyl - 16:9 Hi-Fi Record Player JavaScript
   ========================================================================== */

(function () {
  'use strict';

  // --- デモ曲「Chasing The Eclipse」用 LRC 歌詞 ---
  const DEMO_LYRICS_LRC = `
[00:00.00]♪ (Analog Needle Drops - Intro)
[00:04.50]Neon lights are fading in the twilight sky
[00:10.00]Cruising down the highway, watching stars drift by
[00:16.80]Signals in the distance, pulsing through the haze
[00:23.20]Memories of summer in a purple daze
[00:30.00]Chasing the eclipse into the midnight glow
[00:37.00]Turn the vinyl spinning, let the music flow
[00:43.50]Bassline resonating in the city breeze
[00:50.00]Feel the analog warmth, putting hearts at ease
[00:56.50]Echoes of tomorrow dancing in our eyes
[01:03.20]Underneath the neon of the cyber skies
[01:10.00]Spinning at thirty-three, lost in harmony
[01:17.50]Stay with me forever in this melody
[01:25.00]♪ (Synthesizer Solo & Chill Out)
[01:38.00]Fading gently as the dawn arrives...
`;

  // --- ギフト受取曲「涙を集めるバケツ」用 LRC 歌詞 ---
  const NAMIDA_BUCKET_LYRICS_LRC = `
[00:00.00]♪ (Acoustic Intro)
[00:04.20]バケツを持って　歩いた道
[00:09.80]今日も誰かの　涙をすくう
[00:15.50]カナシミのあと　浮かぶ笑顔
[00:21.20]それだけで僕は　満たされてた
[00:27.50]♪
[00:30.20]しずくの音が　ポツリポツリ
[00:36.00]やさしい音に　包まれながら
[00:41.80]自分の涙　どこかに置いて
[00:47.50]それにも気づかず　進んでた
[00:54.00]「ありがとう」って　笑ってくれる
[00:59.80]その声だけが　僕のごほうび
[01:05.50]でもある日ふと　気づいたんだ
[01:11.20]胸の奥が　何も言わなかった
[01:18.50]みんなの涙を　僕にちょうだい
[01:24.50]それで笑顔になれるのなら
[01:30.50]バケツの中は　カナシミで満ちて
[01:36.50]まわりはいつも　輝いていた
[01:43.00]いつからだろう　僕の心が
[01:49.00]カナシミさえも　忘れてたこと
[01:55.00]笑ってるのに　なんだか苦しくて
[02:01.50]僕は僕を　置いてきた
[02:09.50]♪ (Interlude)
[02:22.50]泣いていいよって　言われたとき
[02:28.50]僕はどうしていいか　分からなかった
[02:34.50]「大丈夫？」の声が　あたたかくて
[02:40.50]バケツの底に　光がさした
[02:46.50]みんなの涙も　僕の涙も
[02:52.50]どちらもきっと　大事なものさ
[02:58.50]カナシミだけが　知ってる場所で
[03:04.50]はじめて僕は　笑えたんだ
[03:10.50]頼ることって　弱さじゃないね
[03:16.50]誰かにそっと　手を伸ばすこと
[03:22.50]ひとりきりじゃ　届かなかった
[03:28.50]僕の心が　ここにある
[03:38.00]♪ (Outro)
`;

  const DEFAULT_LYRICS_LRC = DEMO_LYRICS_LRC;

  // --- DOM Elements ---
  const els = {
    ambientBackdrop: document.getElementById('ambientBackdrop'),
    coverArtImg: document.getElementById('coverArtImg'),
    labelCoverImg: document.getElementById('labelCoverImg'),
    lyricsContainer: document.getElementById('lyricsContainer'),
    trackTitle: document.getElementById('trackTitle'),
    trackArtist: document.getElementById('trackArtist'),
    sourceBadge: document.getElementById('sourceBadge'),
    formatBadge: document.getElementById('formatBadge'),
    strobeLight: document.getElementById('strobeLight'),
    platterRim: document.getElementById('platterRim'),
    visualHalo: document.getElementById('visualHalo'),
    vinylDisc: document.getElementById('vinylDisc'),
    tonearmWand: document.getElementById('tonearmWand'),
    powerLamp: document.getElementById('powerLamp'),
    turntablePowerBtn: document.getElementById('turntablePowerBtn'),
    btnPlayPause: document.getElementById('btnPlayPause'),
    iconPlay: document.getElementById('iconPlay'),
    iconPause: document.getElementById('iconPause'),
    progressTrack: document.getElementById('progressTrack'),
    progressFill: document.getElementById('progressFill'),
    progressThumb: document.getElementById('progressThumb'),
    currentTime: document.getElementById('currentTime'),
    durationTime: document.getElementById('durationTime'),
    volumeSlider: document.getElementById('volumeSlider'),
    volumeFill: document.getElementById('volumeFill'),
    btnMute: document.getElementById('btnMute'),
    btnRpm33: document.getElementById('btnRpm33'),
    btnRpm45: document.getElementById('btnRpm45'),
    pitchSlider: document.getElementById('pitchSlider'),
    pitchValue: document.getElementById('pitchValue'),
    btnToggleNoise: document.getElementById('btnToggleNoise'),
    crackleBadge: document.getElementById('crackleBadge'),
    btnFullscreen: document.getElementById('btnFullscreen'),
    audioFileInput: document.getElementById('audioFileInput'),
    btnOpenLyricsModal: document.getElementById('btnOpenLyricsModal'),
    btnCloseLyricsModal: document.getElementById('btnCloseLyricsModal'),
    lyricsModal: document.getElementById('lyricsModal'),
    lrcFileInput: document.getElementById('lrcFileInput'),
    lrcFileName: document.getElementById('lrcFileName'),
    lyricsTextarea: document.getElementById('lyricsTextarea'),
    btnApplyLyrics: document.getElementById('btnApplyLyrics'),
    btnResetLyrics: document.getElementById('btnResetLyrics'),
    albumSleeve: document.getElementById('albumSleeve'),
    lyricsOverlay: document.getElementById('lyricsOverlay'),
    lyricsSyncStatus: document.getElementById('lyricsSyncStatus'),
    dropZone: document.getElementById('dropZone'),
    btnPrev: document.getElementById('btnPrev'),
    btnNext: document.getElementById('btnNext'),
    // タブ＆ギャラリー関連
    tabPlayer: document.getElementById('tabPlayer'),
    tabGallery: document.getElementById('tabGallery'),
    stagePlayer: document.getElementById('stagePlayer'),
    stageGallery: document.getElementById('stageGallery'),
    galleryCount: document.getElementById('galleryCount'),
    shelfRecordsGrid: document.getElementById('shelfRecordsGrid'),
    btnClearHistory: document.getElementById('btnClearHistory'),
    // GIFT SNS 関連
    btnOpenGiftModal: document.getElementById('btnOpenGiftModal'),
    giftModal: document.getElementById('giftModal'),
    btnCloseGiftModal: document.getElementById('btnCloseGiftModal'),
    btnCancelGift: document.getElementById('btnCancelGift'),
    giftAudioInput: document.getElementById('giftAudioInput'),
    giftAudioFileName: document.getElementById('giftAudioFileName'),
    giftTitleInput: document.getElementById('giftTitleInput'),
    giftLyricsInput: document.getElementById('giftLyricsInput'),
    btnSubmitGift: document.getElementById('btnSubmitGift'),
    giftQuotaBadge: document.getElementById('giftQuotaBadge'),
    // Google Auth 関連
    btnGoogleLogin: document.getElementById('btnGoogleLogin'),
    googleAuthModal: document.getElementById('googleAuthModal'),
    btnCloseGoogleModal: document.getElementById('btnCloseGoogleModal'),
    btnSelectGoogleAccount: document.getElementById('btnSelectGoogleAccount'),
    userProfile: document.getElementById('userProfile'),
    userAvatar: document.getElementById('userAvatar'),
    userName: document.getElementById('userName'),
    btnLogout: document.getElementById('btnLogout'),
    // 届いた手紙（通知）関連
    btnLetterNotifications: document.getElementById('btnLetterNotifications'),
    notiDot: document.getElementById('notiDot'),
    letterModal: document.getElementById('letterModal'),
    btnCloseLetterModal: document.getElementById('btnCloseLetterModal'),
    btnCloseLetterModalBtn: document.getElementById('btnCloseLetterModalBtn'),
    lettersList: document.getElementById('lettersList'),
    // 交換アニメーション演出 ＆ 優しい通知トースト
    exchangeOverlay: document.getElementById('exchangeOverlay'),
    exchangeTitle: document.getElementById('exchangeTitle'),
    exchangeDesc: document.getElementById('exchangeDesc'),
    gentleToast: document.getElementById('gentleToast'),
    toastMessage: document.getElementById('toastMessage'),
    btnCloseToast: document.getElementById('btnCloseToast'),
    // コメントGIFT (感想を贈って次の曲を受け取る)
    btnOpenCommentModal: document.getElementById('btnOpenCommentModal'),
    commentGiftModal: document.getElementById('commentGiftModal'),
    btnCloseCommentModal: document.getElementById('btnCloseCommentModal'),
    btnCancelComment: document.getElementById('btnCancelComment'),
    btnSubmitComment: document.getElementById('btnSubmitComment'),
    commentTextInput: document.getElementById('commentTextInput'),
    commentModalCover: document.getElementById('commentModalCover'),
    commentModalTitle: document.getElementById('commentModalTitle'),
    commentModalArtist: document.getElementById('commentModalArtist'),
    // スプラッシュ画面 ＆ オープニングムービー
    giftSplashOverlay: document.getElementById('giftSplashOverlay'),
    splashTotalUsers: document.getElementById('splashTotalUsers'),
    splashTotalTracks: document.getElementById('splashTotalTracks'),
    giftMovieOverlay: document.getElementById('giftMovieOverlay'),
    openingVideo: document.getElementById('openingVideo'),
    btnSkipMovie: document.getElementById('btnSkipMovie'),
    movieTouchOverlay: document.getElementById('movieTouchOverlay'),
  };

  // --- State ---
  const state = {
    activeTab: 'player', // 'player' or 'gallery'
    isPlaying: false,
    isMuted: false,
    volume: 0.85,
    rpm: 33.33,
    pitch: 1.0,
    crackleEnabled: true,
    currentTime: 0,
    duration: 92, // デモ曲の長さ(秒)
    audioSourceType: 'demo', // 'demo' or 'gift' or 'file'
    audioUrl: null,
    lyrics: [],
    currentLyricIndex: -1,
    currentCollectionIndex: 0,
    currentTrackInfo: {
      id: 'demo-track',
      title: 'Chasing The Eclipse',
      artist: '見知らぬ誰かからの贈り物',
      coverUrl: 'assets/default_cover.jpg',
      sourceType: 'demo',
      file: null,
      lyrics: DEMO_LYRICS_LRC,
      duration: 92,
      durationStr: '01:32',
    },
    // 一度再生したレコードのコレクション（棚に飾られる）
    collection: [
      {
        id: 'demo-track',
        title: 'Chasing The Eclipse',
        artist: '見知らぬ誰かからの贈り物',
        coverUrl: 'assets/default_cover.jpg',
        sourceType: 'demo',
        file: null,
        durationStr: '01:32',
        duration: 92,
        lyrics: DEMO_LYRICS_LRC,
      }
    ],
  };

  // --- Audio Context & Nodes ---
  let audioCtx = null;
  let masterGain = null;
  let analyser = null;
  let crackleGain = null;
  let crackleSource = null;
  let audioElement = new Audio();
  audioElement.crossOrigin = 'anonymous';
  audioElement.preload = 'auto';
  let mediaElementSource = null;
  let demoSynthTimer = null;
  let animFrameId = null;

  // --- トーンアーム角度の定数 ---
  const ARM_REST_ANGLE = -22;      // アームレスト静止位置 (度)
  const ARM_LEAD_IN_ANGLE = 9;      // レコード盤外周の開始位置 (度)
  const ARM_LEAD_OUT_ANGLE = 34;   // レコード盤内周の終了位置 (度)

  // ==========================================================================
  // 1. Web Audio API 初期化 & スマホ用オーディオアンロック
  // ==========================================================================
  function initAudioContext() {
    if (audioCtx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();

    // Master Gain
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(state.volume, audioCtx.currentTime);

    // Analyser Node for Visualizer
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 64;
    masterGain.connect(analyser);
    analyser.connect(audioCtx.destination);

    // Connect audioElement (HTML5 Audio: iOS/Androidでマナーモードでも音が出る)
    try {
      if (!mediaElementSource) {
        mediaElementSource = audioCtx.createMediaElementSource(audioElement);
        mediaElementSource.connect(masterGain);
      }
    } catch (err) {
      console.warn('MediaElementSource error:', err);
    }

    // Setup Crackle Noise Generator
    setupVinylCrackle();

    // Setup Visualizer loop
    startVisualizerLoop();
  }

  // スマホ（iOS Safari / Android Chrome）用オーディオアンロック
  function unlockMobileAudio() {
    initAudioContext();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    // ダミーバッファ再生 (iOS WebAudio アンロック)
    if (audioCtx) {
      try {
        const dummyBuf = audioCtx.createBuffer(1, 1, 22050);
        const dummySrc = audioCtx.createBufferSource();
        dummySrc.buffer = dummyBuf;
        dummySrc.connect(audioCtx.destination);
        dummySrc.start(0);
      } catch (e) {}
    }
  }

  ['touchstart', 'touchend', 'click'].forEach(evt => {
    document.addEventListener(evt, unlockMobileAudio, { once: true, passive: true });
  });

  // アナログレコード特有のクラックル（プチプチ音）ジェネレータ
  function setupVinylCrackle() {
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const isPop = Math.random() < 0.0018;
      if (isPop) {
        output[i] = (Math.random() * 2 - 1) * (0.35 + Math.random() * 0.45);
      } else {
        output[i] = (Math.random() * 2 - 1) * 0.012;
      }
    }

    crackleSource = audioCtx.createBufferSource();
    crackleSource.buffer = noiseBuffer;
    crackleSource.loop = true;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, audioCtx.currentTime);
    filter.Q.setValueAtTime(0.7, audioCtx.currentTime);

    crackleGain = audioCtx.createGain();
    crackleGain.gain.setValueAtTime(state.crackleEnabled ? 0.35 : 0.0, audioCtx.currentTime);

    crackleSource.connect(filter);
    filter.connect(crackleGain);
    crackleGain.connect(masterGain);
    try {
      crackleSource.start();
    } catch(e) {}
  }

  // ==========================================================================
  // 2. 高音質デモ曲のオフラインWAVレンダリング (スマホ対応)
  // ==========================================================================
  let demoAudioBlobUrl = null;

  function renderDemoWav(callback) {
    const sampleRate = 44100;
    const duration = 92; // 92秒
    const OfflineCtxClass = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    const offlineCtx = new OfflineCtxClass(2, sampleRate * duration, sampleRate);

    const bpm = 84;
    const secPerBeat = 60 / bpm;
    const secPer16th = secPerBeat / 4;
    const total16ths = Math.floor(duration / secPer16th);

    const chords = [
      [130.81, 164.81, 196.00, 246.94], // Cmaj7
      [110.00, 138.59, 164.81, 207.65], // Am7
      [146.83, 174.61, 220.00, 261.63], // Dm7
      [98.00, 123.47, 146.83, 196.00]   // G7
    ];
    const bassNotes = [65.41, 55.00, 73.42, 49.00];

    // ドラム＆ベース＆シンセをオフラインコンテキストにスケジューリング
    for (let step = 0; step < total16ths; step++) {
      const time = step * secPer16th;
      const bar = Math.floor(step / 16) % chords.length;
      const s = step % 16;

      // Kick
      if (s === 0 || s === 8 || s === 14) {
        const osc = offlineCtx.createOscillator();
        const gain = offlineCtx.createGain();
        osc.frequency.setValueAtTime(140, time);
        osc.frequency.exponentialRampToValueAtTime(38, time + 0.12);
        gain.gain.setValueAtTime(0.8, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);
        osc.connect(gain);
        gain.connect(offlineCtx.destination);
        osc.start(time);
        osc.stop(time + 0.25);
      }

      // Snare
      if (s === 4 || s === 12) {
        const bufLen = Math.floor(sampleRate * 0.15);
        const buf = offlineCtx.createBuffer(1, bufLen, sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < bufLen; i++) data[i] = Math.random() * 2 - 1;
        const noise = offlineCtx.createBufferSource();
        noise.buffer = buf;
        const filter = offlineCtx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(1000, time);
        const gain = offlineCtx.createGain();
        gain.gain.setValueAtTime(0.35, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(offlineCtx.destination);
        noise.start(time);
      }

      // HiHat
      if (s % 2 === 0) {
        const vol = s % 4 === 2 ? 0.08 : 0.04;
        const bufLen = Math.floor(sampleRate * 0.04);
        const buf = offlineCtx.createBuffer(1, bufLen, sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < bufLen; i++) data[i] = Math.random() * 2 - 1;
        const noise = offlineCtx.createBufferSource();
        noise.buffer = buf;
        const filter = offlineCtx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(7000, time);
        const gain = offlineCtx.createGain();
        gain.gain.setValueAtTime(vol, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.035);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(offlineCtx.destination);
        noise.start(time);
      }

      // Bass
      if (s === 0 || s === 3 || s === 6 || s === 10) {
        const osc = offlineCtx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(bassNotes[bar], time);
        const filter = offlineCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, time);
        filter.Q.setValueAtTime(3, time);
        const gain = offlineCtx.createGain();
        gain.gain.setValueAtTime(0.35, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(offlineCtx.destination);
        osc.start(time);
        osc.stop(time + 0.38);
      }

      // Pad Chords
      if (s === 0 || s === 8) {
        chords[bar].forEach(freq => {
          const osc = offlineCtx.createOscillator();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, time);
          const gain = offlineCtx.createGain();
          gain.gain.setValueAtTime(0.001, time);
          gain.gain.linearRampToValueAtTime(0.06, time + 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, time + 1.2);
          osc.connect(gain);
          gain.connect(offlineCtx.destination);
          osc.start(time);
          osc.stop(time + 1.25);
        });
      }
    }

    offlineCtx.startRendering().then(renderedBuffer => {
      const wavBlob = bufferToWave(renderedBuffer, renderedBuffer.length);
      demoAudioBlobUrl = URL.createObjectURL(wavBlob);
      if (callback) callback(demoAudioBlobUrl);
    }).catch(err => {
      console.warn('Offline render error:', err);
    });
  }

  // AudioBuffer -> WAV (16-bit PCM Blob) 変換ヘルパー
  function bufferToWave(abuffer, len) {
    const numOfChan = abuffer.numberOfChannels;
    const length = len * numOfChan * 2 + 44;
    const out = new DataView(new ArrayBuffer(length));
    const channels = [];
    let sample = 0;
    let offset = 0;
    let pos = 0;

    function setUint16(data) { out.setUint16(pos, data, true); pos += 2; }
    function setUint32(data) { out.setUint32(pos, data, true); pos += 4; }

    // RIFF chunk
    setUint32(0x46464952); // "RIFF"
    setUint32(length - 8); // file length - 8
    setUint32(0x45564157); // "WAVE"
    // FMT chunk
    setUint32(0x20746d66); // "fmt "
    setUint32(16);         // format size
    setUint16(1);          // format type (1 = PCM)
    setUint16(numOfChan);
    setUint32(abuffer.sampleRate);
    setUint32(abuffer.sampleRate * 2 * numOfChan); // byte rate
    setUint16(numOfChan * 2); // block align
    setUint16(16);            // bits per sample
    // DATA chunk
    setUint32(0x61746164); // "data"
    setUint32(length - pos - 4);

    for (let i = 0; i < numOfChan; i++) {
      channels.push(abuffer.getChannelData(i));
    }

    while (pos < length) {
      for (let i = 0; i < numOfChan; i++) {
        sample = Math.max(-1, Math.min(1, channels[i][offset]));
        sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
        out.setInt16(pos, sample, true);
        pos += 2;
      }
      offset++;
    }

    return new Blob([out.buffer], { type: 'audio/wav' });
  }

  function playKick(time) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(38, time + 0.12);
    gain.gain.setValueAtTime(0.8, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(time);
    osc.stop(time + 0.25);
  }

  function playSnare(time) {
    // ノイズ成分
    const bufferSize = audioCtx.sampleRate * 0.15;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1000, time);
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.35, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    noise.start(time);
  }

  function playHiHat(time, vol = 0.05) {
    const bufferSize = audioCtx.sampleRate * 0.04;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7000, time);
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.035);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    noise.start(time);
  }

  function playBass(time, freq) {
    const osc = audioCtx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq * state.pitch, time);
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, time);
    filter.Q.setValueAtTime(3, time);
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.35, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    osc.start(time);
    osc.stop(time + 0.38);
  }

  function playPad(time, chordNotes) {
    chordNotes.forEach((freq) => {
      const osc = audioCtx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq * state.pitch, time);
      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.06, time + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 1.2);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(time);
      osc.stop(time + 1.25);
    });
  }

  // ==========================================================================
  // 3. 歌詞パーサー & ハイライト同期システム (LRC)
  // ==========================================================================
  function parseLRC(lrcText) {
    const lines = lrcText.split('\n');
    const result = [];
    const timeRegex = /\[(\d{2}):(\d{2}(?:\.\d+)?)\]/;

    lines.forEach((line) => {
      const match = timeRegex.exec(line);
      if (match) {
        const min = parseInt(match[1], 10);
        const sec = parseFloat(match[2]);
        const time = min * 60 + sec;
        const text = line.replace(timeRegex, '').trim();
        if (text) {
          result.push({ time, text });
        }
      }
    });

    result.sort((a, b) => a.time - b.time);
    return result;
  }

  function renderLyrics(lyrics) {
    els.lyricsContainer.innerHTML = '';
    state.lyrics = lyrics || [];
    state.currentLyricIndex = -1;

    // 歌詞が入っていない曲: カバーアートのみを表示！
    if (!lyrics || lyrics.length === 0) {
      if (els.lyricsOverlay) {
        els.lyricsOverlay.classList.add('hidden-lyrics');
      }
      if (els.albumSleeve) {
        els.albumSleeve.classList.add('no-lyrics');
      }
      if (els.lyricsSyncStatus) {
        els.lyricsSyncStatus.textContent = 'NO LYRICS';
      }
      return;
    }

    // 歌詞がある曲: オーバーレイを表示
    if (els.lyricsOverlay) {
      els.lyricsOverlay.classList.remove('hidden-lyrics');
    }
    if (els.albumSleeve) {
      els.albumSleeve.classList.remove('no-lyrics');
    }
    if (els.lyricsSyncStatus) {
      els.lyricsSyncStatus.textContent = 'SYNCED';
    }

    lyrics.forEach((item, index) => {
      const lineEl = document.createElement('div');
      lineEl.className = 'lyric-line';
      lineEl.dataset.index = index;
      lineEl.dataset.time = item.time;
      lineEl.textContent = item.text;

      // クリックでその歌詞のタイムにシーク
      lineEl.addEventListener('click', () => {
        seekToTime(item.time);
      });

      els.lyricsContainer.appendChild(lineEl);
    });
  }

  function updateLyricsHighlight(currentSec) {
    if (!state.lyrics.length) return;

    let activeIdx = -1;
    for (let i = 0; i < state.lyrics.length; i++) {
      if (currentSec >= state.lyrics[i].time) {
        activeIdx = i;
      } else {
        break;
      }
    }

    if (activeIdx !== state.currentLyricIndex) {
      state.currentLyricIndex = activeIdx;
      const lines = els.lyricsContainer.querySelectorAll('.lyric-line');

      lines.forEach((line, idx) => {
        line.classList.remove('active', 'past');
        if (idx === activeIdx) {
          line.classList.add('active');
          // スムーズスクロールでアクティブ行を中央に
          line.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (idx < activeIdx) {
          line.classList.add('past');
        }
      });
    }
  }

  // ==========================================================================
  // 4. トーンアーム & レコード回転アニメーション
  // ==========================================================================
  function updateTonearmPosition() {
    if (!state.isPlaying) {
      els.tonearmWand.style.transform = `rotate(${ARM_REST_ANGLE}deg)`;
      return;
    }

    // 再生進捗率 0.0 〜 1.0 に応じて、外周から内周へ徐々に移動
    const progress = state.duration > 0 ? (state.currentTime / state.duration) : 0;
    const clampedProgress = Math.min(Math.max(progress, 0), 1);
    const angle = ARM_LEAD_IN_ANGLE + clampedProgress * (ARM_LEAD_OUT_ANGLE - ARM_LEAD_IN_ANGLE);

    els.tonearmWand.style.transform = `rotate(${angle.toFixed(2)}deg)`;
  }

  function startTurntableVisuals() {
    els.vinylDisc.classList.add('spinning');
    els.platterRim.classList.add('spinning');
    els.strobeLight.classList.add('playing');
    els.powerLamp.classList.add('on');
    updateTonearmPosition();
  }

  function stopTurntableVisuals() {
    els.vinylDisc.classList.remove('spinning');
    els.platterRim.classList.remove('spinning');
    els.strobeLight.classList.remove('playing');
    els.powerLamp.classList.remove('on');
    updateTonearmPosition();
  }

  // ==========================================================================
  // 5. 再生 / 一時停止 コントロール
  // ==========================================================================
  function togglePlayPause() {
    initAudioContext();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    if (state.isPlaying) {
      pausePlayback();
    } else {
      startPlayback();
    }
  }

  function startPlayback() {
    initAudioContext();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    state.isPlaying = true;
    els.iconPlay.style.display = 'none';
    els.iconPause.style.display = 'block';

    startTurntableVisuals();

    if (state.audioSourceType === 'demo') {
      if ((!audioElement.src || audioElement.src === '' || !audioElement.src.startsWith('blob:')) && demoAudioBlobUrl) {
        audioElement.src = demoAudioBlobUrl;
        audioElement.loop = true;
      }
    }

    // HTML5 Audio 再生（iOS/Android スマホでマナーモードでも鳴る標準パイプライン）
    if (audioElement && audioElement.src) {
      const playPromise = audioElement.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.warn('Audio play error, falling back:', e);
        });
      }
    }
  }

  function pausePlayback() {
    state.isPlaying = false;
    els.iconPlay.style.display = 'block';
    els.iconPause.style.display = 'none';

    stopTurntableVisuals();

    if (audioElement) {
      audioElement.pause();
    }
    if (demoSynthTimer) {
      clearTimeout(demoSynthTimer);
    }
  }

  function seekToTime(targetSec) {
    state.currentTime = Math.min(Math.max(targetSec, 0), state.duration);
    if (audioElement && audioElement.src) {
      try {
        audioElement.currentTime = state.currentTime;
      } catch (e) {
        console.warn('Audio seek error:', e);
      }
    }
    updateTimeDisplay();
    updateTonearmPosition();
    updateLyricsHighlight(state.currentTime);
  }

  // ==========================================================================
  // 6. メイン再生ループ & オーディオビジュアライザー
  // ==========================================================================
  function startVisualizerLoop() {
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function loop() {
      animFrameId = requestAnimationFrame(loop);

      if (state.isPlaying) {
        // 時間進行の更新: audioElementが存在する場合は常に実オーディオ時間と同期
        if (audioElement && audioElement.src && !isNaN(audioElement.currentTime)) {
          state.currentTime = audioElement.currentTime;
          if (audioElement.duration && !isNaN(audioElement.duration) && audioElement.duration > 0) {
            state.duration = audioElement.duration;
          }
        } else {
          // タイマーフォールバック
          state.currentTime += (1 / 60) * state.pitch;
          if (state.currentTime >= state.duration) {
            state.currentTime = 0; // ループ
          }
        }

        updateTimeDisplay();
        updateTonearmPosition();
        updateLyricsHighlight(state.currentTime);

        // オーディオビジュアライザーの光量計算
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length; // 0 〜 255
        const intensity = avg / 255;

        if (intensity > 0.08) {
          els.visualHalo.classList.add('active');
          const glowPx = Math.floor(18 + intensity * 45);
          const cyanIntensity = (0.2 + intensity * 0.7).toFixed(2);
          els.visualHalo.style.boxShadow = `0 0 ${glowPx}px rgba(56, 189, 248, ${cyanIntensity}), inset 0 0 ${glowPx * 0.6}px rgba(168, 85, 247, ${cyanIntensity * 0.5})`;
        } else {
          els.visualHalo.classList.remove('active');
        }
      } else {
        els.visualHalo.classList.remove('active');
      }
    }

    loop();
  }

  function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function updateTimeDisplay() {
    els.currentTime.textContent = formatTime(state.currentTime);
    els.durationTime.textContent = formatTime(state.duration);

    const percent = state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0;
    els.progressFill.style.width = `${percent}%`;
    els.progressThumb.style.left = `${percent}%`;
  }

  // ==========================================================================
  // 7. ファイルローダー (MP3 / WAV / 画像 / LRC) & ID3 解析
  // ==========================================================================
  function handleAudioFile(file) {
    if (!file) return;

    initAudioContext();

    const fileUrl = URL.createObjectURL(file);
    state.audioUrl = fileUrl;
    state.audioSourceType = 'file';
    audioElement.src = fileUrl;
    audioElement.playbackRate = state.pitch * (state.rpm / 33.33);

    // タイトル推定
    let cleanName = file.name.replace(/\.[^/.]+$/, '');
    if (els.trackTitle) els.trackTitle.textContent = cleanName;
    if (els.trackArtist) els.trackArtist.textContent = 'Local Audio File';
    if (els.sourceBadge) els.sourceBadge.textContent = file.type.toUpperCase().includes('WAV') ? 'WAV Audio' : 'MP3 Audio';
    if (els.formatBadge) els.formatBadge.textContent = `${file.name.split('.').pop().toUpperCase()} • ${Math.round(state.rpm)} RPM`;

    // 歌詞が入っていない曲はカバーアートのみを表示！
    renderLyrics([]);

    // ID3 タグからアートワーク抽出を試みる (簡易バイナリ抽出)
    extractId3Cover(file, (coverUrl) => {
      // コレクションに追加
      addToCollection({
        id: 'file-' + Date.now(),
        title: cleanName,
        artist: 'Local Audio File',
        coverUrl: coverUrl || 'assets/default_cover.jpg',
        sourceType: 'file',
        file: file,
        durationStr: formatTime(audioElement.duration || 180),
      });
    });

    audioElement.onloadedmetadata = () => {
      state.duration = audioElement.duration;
      state.currentTime = 0;
      updateTimeDisplay();
      startPlayback();
      renderShelfGallery();
    };

    audioElement.onended = () => {
      pausePlayback();
      seekToTime(0);
    };
  }

  // MP3 ID3v2 APICフレーム簡易パーサー
  function extractId3Cover(file, callback) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const buffer = e.target.result;
      const view = new DataView(buffer);

      if (view.getUint8(0) === 0x49 && view.getUint8(1) === 0x44 && view.getUint8(2) === 0x33) {
        const u8 = new Uint8Array(buffer);
        for (let i = 0; i < u8.length - 10; i++) {
          if (u8[i] === 0x41 && u8[i+1] === 0x50 && u8[i+2] === 0x49 && u8[i+3] === 0x43) {
            for (let j = i; j < Math.min(i + 200, u8.length - 4); j++) {
              if (u8[j] === 0xFF && u8[j+1] === 0xD8) {
                const imgBlob = new Blob([u8.subarray(j)], { type: 'image/jpeg' });
                const imgUrl = URL.createObjectURL(imgBlob);
                applyCoverArtwork(imgUrl);
                if (callback) callback(imgUrl);
                return;
              }
              if (u8[j] === 0x89 && u8[j+1] === 0x50 && u8[j+2] === 0x4E && u8[j+3] === 0x47) {
                const imgBlob = new Blob([u8.subarray(j)], { type: 'image/png' });
                const imgUrl = URL.createObjectURL(imgBlob);
                applyCoverArtwork(imgUrl);
                if (callback) callback(imgUrl);
                return;
              }
            }
          }
        }
      }
      if (callback) callback(null);
    };
    reader.readAsArrayBuffer(file.slice(0, 500000));
  }

  function applyCoverArtwork(url) {
    els.coverArtImg.src = url;
    els.labelCoverImg.src = url;
    els.ambientBackdrop.style.backgroundImage = `url('${url}')`;
  }

  // ==========================================================================
  // 8. ギャラリー＆コレクション（棚に飾る機能）
  // ==========================================================================
  function addToCollection(item) {
    const existingIndex = state.collection.findIndex(x => x.id === item.id || (x.title === item.title && x.artist === item.artist));
    if (existingIndex !== -1) {
      state.collection.splice(existingIndex, 1);
    }
    state.collection.unshift(item);
    updateGalleryCount();
    renderShelfGallery();
  }

  function updateGalleryCount() {
    if (els.galleryCount) {
      els.galleryCount.textContent = state.collection.length;
    }
  }

  function renderShelfGallery() {
    if (!els.shelfRecordsGrid) return;
    els.shelfRecordsGrid.innerHTML = '';

    state.collection.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'shelf-record-card';
      const isNowPlaying = state.isPlaying && (els.trackTitle.textContent === item.title);

      card.innerHTML = `
        <div class="shelf-jacket-wrapper">
          ${isNowPlaying ? '<div class="shelf-playing-badge"><span>●</span> PLAYING</div>' : ''}
          <img src="${item.coverUrl || 'assets/default_cover.jpg'}" alt="${item.title}" class="shelf-jacket-img">
          <div class="shelf-peeking-disc">
            <div class="shelf-peeking-label">
              <img src="${item.coverUrl || 'assets/default_cover.jpg'}" alt="Label">
            </div>
          </div>
          <div class="shelf-play-overlay">
            <div class="shelf-play-btn">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="shelf-card-meta">
          <div class="shelf-card-title" title="${item.title}">${item.title}</div>
          <div class="shelf-card-artist" title="${item.artist}">${item.artist}</div>
        </div>
      `;

      card.addEventListener('click', () => {
        playCollectionItem(index);
      });

      els.shelfRecordsGrid.appendChild(card);
    });
  }

  function playCollectionItem(index) {
    const item = state.collection[index];
    if (!item) return;

    // PLAYER タブに切り替え
    switchTab('player');

    if (item.sourceType === 'demo') {
      state.audioSourceType = 'demo';
      state.duration = item.duration || 92;
      state.currentTime = 0;
      els.trackTitle.textContent = item.title;
      els.trackArtist.textContent = item.artist || '見知らぬ誰かからの贈り物';
      if (els.sourceBadge) els.sourceBadge.textContent = 'Preset Track';
      if (els.formatBadge) els.formatBadge.textContent = 'DEMO • 33⅓ RPM';
      applyCoverArtwork(item.coverUrl);
      const lyricsLrc = item.lyrics || DEMO_LYRICS_LRC;
      if (els.lyricsTextarea) els.lyricsTextarea.value = lyricsLrc;
      renderLyrics(parseLRC(lyricsLrc));

      if (demoAudioBlobUrl) {
        audioElement.src = demoAudioBlobUrl;
        audioElement.loop = true;
        audioElement.onloadedmetadata = () => {
          state.duration = audioElement.duration || item.duration || 92;
          updateTimeDisplay();
          startPlayback();
        };
        startPlayback();
      } else {
        renderDemoWav((blobUrl) => {
          demoAudioBlobUrl = blobUrl;
          audioElement.src = blobUrl;
          audioElement.loop = true;
          startPlayback();
        });
      }
    } else if (item.sourceType === 'gift') {
      state.audioSourceType = 'gift';
      state.currentTime = 0;
      els.trackTitle.textContent = item.title;
      els.trackArtist.textContent = item.artist || '見知らぬ誰かからの贈り物';
      if (els.sourceBadge) els.sourceBadge.textContent = 'GIFT VINYL';
      if (els.formatBadge) els.formatBadge.textContent = 'ANONYMOUS • 33⅓ RPM';
      applyCoverArtwork(item.coverUrl);

      if (item.lyrics && item.lyrics.trim().length > 0) {
        if (els.lyricsTextarea) els.lyricsTextarea.value = item.lyrics;
        renderLyrics(parseLRC(item.lyrics));
      } else {
        renderLyrics([]);
      }

      if (item.file) {
        handleAudioFile(item.file);
      } else if (item.localAudioUrl || item.audioUrl) {
        audioElement.src = item.localAudioUrl || item.audioUrl;
        audioElement.loop = true;
        audioElement.onerror = () => {
          if (item.audioUrl && audioElement.src !== item.audioUrl) {
            audioElement.src = item.audioUrl;
          }
        };
        audioElement.onloadedmetadata = () => {
          state.duration = audioElement.duration || 239.92;
          updateTimeDisplay();
          startPlayback();
        };
        startPlayback();
      } else {
        // デモ曲のWAVをストリーム再生
        renderDemoWav((blobUrl) => {
          audioElement.src = blobUrl;
          audioElement.loop = true;
          startPlayback();
        });
      }
    } else if (item.file) {
      handleAudioFile(item.file);
    }
    state.currentCollectionIndex = index;
    state.currentTrackInfo = item;
    updateCommentGiftButton();
    renderShelfGallery();
  }

  function switchTab(tabName) {
    state.activeTab = tabName;
    if (tabName === 'player') {
      els.tabPlayer.classList.add('active');
      els.tabGallery.classList.remove('active');
      if (cinemaBox) cinemaBox.classList.remove('gallery-mode-active');
      els.stagePlayer.style.display = '';
      els.stageGallery.style.display = 'none';
    } else {
      els.tabGallery.classList.add('active');
      els.tabPlayer.classList.remove('active');
      if (cinemaBox) cinemaBox.classList.add('gallery-mode-active');
      els.stagePlayer.style.display = 'none';
      els.stageGallery.style.display = 'flex';
      renderShelfGallery();
    }
  }

  function handleLrcFile(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const text = e.target.result;
      els.lyricsTextarea.value = text;
      els.lrcFileName.textContent = file.name;
      const parsed = parseLRC(text);
      renderLyrics(parsed);
    };
    reader.readAsText(file);
  }

  // ==========================================================================
  // 8. イベントリスナー登録
  // ==========================================================================
  function setupEventListeners() {
    // 再生/一時停止
    if (els.btnPlayPause) els.btnPlayPause.addEventListener('click', togglePlayPause);
    if (els.turntablePowerBtn) els.turntablePowerBtn.addEventListener('click', togglePlayPause);

    // シークバートラッククリック
    if (els.progressTrack) {
      els.progressTrack.addEventListener('click', (e) => {
        const rect = els.progressTrack.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const ratio = clickX / rect.width;
        seekToTime(ratio * state.duration);
      });
    }

    // 前へ / 次へ (感想のGIFTで次の曲を受け取る仕組み)
    if (els.btnPrev) {
      els.btnPrev.addEventListener('click', () => {
        if (state.currentTime > 3) {
          seekToTime(0);
        } else if (state.currentCollectionIndex < state.collection.length - 1) {
          playCollectionItem(state.currentCollectionIndex + 1);
        } else {
          seekToTime(0);
        }
      });
    }

    if (els.btnNext) {
      els.btnNext.addEventListener('click', () => {
        const curTrack = state.currentTrackInfo || (state.collection && state.collection[state.currentCollectionIndex]);
        const curId = curTrack ? curTrack.id : 'demo-track';

        // 現在の曲にまだ感想をGIFTしていない場合はモーダルを促す
        if (!isTrackCommented(curId)) {
          openCommentModal('この曲に感想をGIFTすると、空から次の音楽が風船に乗って届きます 🎈');
          return;
        }

        // 既に感想GIFT済みの場合、コレクション内に次の曲があれば再生
        if (state.currentCollectionIndex > 0) {
          playCollectionItem(state.currentCollectionIndex - 1);
        } else {
          // コレクションの最新曲にいる場合、感想をGIFTして新しい曲を受け取る
          openCommentModal('あなたの温かい感想を風船に結んで作者へ届けると、空から次の音楽が舞い降ります 🎈');
        }
      });
    }

    // 音量スライダー
    if (els.volumeSlider) {
      els.volumeSlider.addEventListener('input', (e) => {
        state.volume = parseFloat(e.target.value);
        state.isMuted = state.volume === 0;
        if (els.volumeFill) els.volumeFill.style.width = `${state.volume * 100}%`;
        if (masterGain && audioCtx) {
          masterGain.gain.setValueAtTime(state.volume, audioCtx.currentTime);
        }
      });
    }

    // ミュートボタン
    if (els.btnMute) {
      els.btnMute.addEventListener('click', () => {
        initAudioContext();
        state.isMuted = !state.isMuted;
        const targetVol = state.isMuted ? 0 : state.volume;
        if (masterGain && audioCtx) {
          masterGain.gain.setValueAtTime(targetVol, audioCtx.currentTime);
        }
        if (els.volumeFill) els.volumeFill.style.width = state.isMuted ? '0%' : `${state.volume * 100}%`;
      });
    }

    // RPM 33 / 45 切替
    if (els.btnRpm33) els.btnRpm33.addEventListener('click', () => setRPM(33.33));
    if (els.btnRpm45) els.btnRpm45.addEventListener('click', () => setRPM(45));

    function setRPM(targetRpm) {
      state.rpm = targetRpm;
      if (targetRpm === 45) {
        if (els.btnRpm45) els.btnRpm45.classList.add('active');
        if (els.btnRpm33) els.btnRpm33.classList.remove('active');
        if (els.vinylDisc) els.vinylDisc.classList.add('speed-45');
        if (els.formatBadge) els.formatBadge.textContent = `${state.audioSourceType === 'demo' ? 'DEMO' : 'AUDIO'} • 45 RPM`;
      } else {
        if (els.btnRpm33) els.btnRpm33.classList.add('active');
        if (els.btnRpm45) els.btnRpm45.classList.remove('active');
        if (els.vinylDisc) els.vinylDisc.classList.remove('speed-45');
        if (els.formatBadge) els.formatBadge.textContent = `${state.audioSourceType === 'demo' ? 'DEMO' : 'AUDIO'} • 33⅓ RPM`;
      }
      applyPitchAndSpeed();
    }

    // ピッチコントロール
    if (els.pitchSlider) {
      els.pitchSlider.addEventListener('input', (e) => {
        state.pitch = parseFloat(e.target.value);
        const percent = Math.round((state.pitch - 1.0) * 100);
        if (els.pitchValue) els.pitchValue.textContent = (percent >= 0 ? `+${percent}%` : `${percent}%`);
        applyPitchAndSpeed();
      });
    }

    function applyPitchAndSpeed() {
      const speedMultiplier = state.pitch * (state.rpm / 33.33);
      if (audioElement) {
        audioElement.playbackRate = speedMultiplier;
      }
    }

    // ビニールクラックルノイズ ON/OFF
    const toggleNoiseHandler = () => {
      initAudioContext();
      state.crackleEnabled = !state.crackleEnabled;
      if (crackleGain && audioCtx) {
        crackleGain.gain.setValueAtTime(state.crackleEnabled ? 0.35 : 0.0, audioCtx.currentTime);
      }
      if (els.btnToggleNoise) els.btnToggleNoise.classList.toggle('active', state.crackleEnabled);
      if (els.crackleBadge) els.crackleBadge.classList.toggle('active', state.crackleEnabled);
    };
    if (els.btnToggleNoise) els.btnToggleNoise.addEventListener('click', toggleNoiseHandler);
    if (els.crackleBadge) els.crackleBadge.addEventListener('click', toggleNoiseHandler);

    // フルスクリーントグル
    if (els.btnFullscreen) {
      els.btnFullscreen.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(err => alert(err.message));
        } else {
          document.exitFullscreen();
        }
      });
    }

    // 音声ファイル選択ダイアログ
    if (els.audioFileInput) {
      els.audioFileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          handleAudioFile(e.target.files[0]);
        }
      });
    }

    // ドラッグ＆ドロップ対応
    const sleeve = els.albumSleeve;
    const dropZone = els.dropZone;

    ['dragenter', 'dragover'].forEach(eventName => {
      window.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      window.addEventListener(eventName, (e) => {
        e.preventDefault();
        if (e.type === 'drop') {
          dropZone.classList.remove('drag-over');
          const files = e.dataTransfer.files;
          if (files.length > 0) {
            for (let f of files) {
              if (f.type.startsWith('audio/') || f.name.endsWith('.mp3') || f.name.endsWith('.wav')) {
                handleAudioFile(f);
              } else if (f.name.endsWith('.lrc') || f.name.endsWith('.txt')) {
                handleLrcFile(f);
              } else if (f.type.startsWith('image/')) {
                applyCoverArtwork(URL.createObjectURL(f));
              }
            }
          }
        } else if (e.target === dropZone || !e.relatedTarget) {
          dropZone.classList.remove('drag-over');
        }
      });
    });

    // 歌詞モーダル開閉
    if (els.btnOpenLyricsModal && els.lyricsModal) {
      els.btnOpenLyricsModal.addEventListener('click', () => {
        els.lyricsModal.style.display = 'flex';
      });
    }
    if (els.btnCloseLyricsModal && els.lyricsModal) {
      els.btnCloseLyricsModal.addEventListener('click', () => {
        els.lyricsModal.style.display = 'none';
      });
    }
    if (els.lyricsModal) {
      els.lyricsModal.addEventListener('click', (e) => {
        if (e.target === els.lyricsModal) {
          els.lyricsModal.style.display = 'none';
        }
      });
    }

    // 歌詞ファイルインポート
    if (els.lrcFileInput) {
      els.lrcFileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          handleLrcFile(e.target.files[0]);
        }
      });
    }

    // 歌詞反映
    if (els.btnApplyLyrics && els.lyricsTextarea) {
      els.btnApplyLyrics.addEventListener('click', () => {
        const text = els.lyricsTextarea.value;
        const parsed = parseLRC(text);
        renderLyrics(parsed);
        if (els.lyricsModal) els.lyricsModal.style.display = 'none';
      });
    }

    // デモ歌詞リセット
    if (els.btnResetLyrics && els.lyricsTextarea) {
      els.btnResetLyrics.addEventListener('click', () => {
        els.lyricsTextarea.value = DEFAULT_LYRICS_LRC;
        if (els.lrcFileName) els.lrcFileName.textContent = 'デフォルト (デモ曲同期)';
        renderLyrics(parseLRC(DEFAULT_LYRICS_LRC));
      });
    }

    // カバーアート（ジャケット）タップで歌詞の表示/非表示をトグル
    if (els.albumSleeve) {
      els.albumSleeve.addEventListener('click', (e) => {
        // ドロップゾーンドラッグ中やボタン類は除外
        if (e.target.closest('#dropZone') || e.target.closest('button') || e.target.closest('input')) return;
        if (state.lyrics && state.lyrics.length > 0 && els.lyricsOverlay) {
          els.lyricsOverlay.classList.toggle('hidden-lyrics');
        }
      });
    }

    // タブ切替 (PLAYER / GALLERY)
    if (els.tabPlayer && els.tabGallery) {
      els.tabPlayer.addEventListener('click', () => switchTab('player'));
      els.tabGallery.addEventListener('click', () => switchTab('gallery'));
    }

    // 棚のリセット
    if (els.btnClearHistory) {
      els.btnClearHistory.addEventListener('click', () => {
        state.collection = [
          {
            id: 'demo-track',
            title: 'Chasing The Eclipse',
            artist: '見知らぬ誰かからの贈り物',
            coverUrl: 'assets/default_cover.jpg',
            sourceType: 'demo',
            file: null,
            durationStr: '01:45',
          }
        ];
        updateGalleryCount();
        renderShelfGallery();
      });
    }
  }

  // ==========================================================================
  // 9. GIFT SNS システム (Firebase 認証 & Firestore データベース / Bunny CDN 配信)
  // ==========================================================================
  const firebaseConfig = {
    apiKey: "AIzaSyCtmfqERJsTxsDAC-J4tlXGr5w3T6ZFYVA",
    authDomain: "gift-2b619.firebaseapp.com",
    projectId: "gift-2b619",
    storageBucket: "gift-2b619.firebasestorage.app",
    messagingSenderId: "699305514051",
    appId: "1:699305514051:web:4cbfcc529225a2bf50f0f6",
    measurementId: "G-G7J8J1FZMJ"
  };

  let fbApp = null;
  let fbAuth = null;
  let fbDb = null;
  let fbUser = null;

  try {
    if (typeof firebase !== 'undefined') {
      fbApp = firebase.initializeApp(firebaseConfig);
      fbAuth = firebase.auth();
      fbDb = firebase.firestore();
      console.log('Firebase Initialized Successfully');
    }
  } catch (err) {
    console.warn('Firebase init error:', err);
  }

  const BUNNY_CONFIG = {
    storageZone: 'gift-music',
    hostName: 'sg.storage.bunnycdn.com',
    apiKey: 'ba8f8921-f2d9-4c7a-8720e2b87f91-41dd-474f',
    cdnBaseUrl: 'https://amugift.b-cdn.net',
  };

  /**
   * Bunny Storage へ音楽ファイルを直接アップロードし、CDN配信URLを返す
   */
  async function uploadAudioToBunny(file, title) {
    if (!file) return null;
    try {
      const ext = file.name ? file.name.split('.').pop() : 'mp3';
      const cleanTitle = (title || 'track').replace(/[^a-zA-Z0-9_\-\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/g, '_');
      const fileName = `${Date.now()}_${cleanTitle}.${ext}`;
      const uploadUrl = `https://${BUNNY_CONFIG.hostName}/${BUNNY_CONFIG.storageZone}/tracks/${encodeURIComponent(fileName)}`;

      const res = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'AccessKey': BUNNY_CONFIG.apiKey,
          'Content-Type': file.type || 'audio/mpeg',
        },
        body: file,
      });

      if (!res.ok) {
        console.warn('Bunny Storage upload warning:', res.statusText);
        return null;
      }

      const cdnUrl = `${BUNNY_CONFIG.cdnBaseUrl}/tracks/${encodeURIComponent(fileName)}`;
      console.log('Bunny CDN Upload Success:', cdnUrl);
      return cdnUrl;
    } catch (err) {
      console.error('Bunny Storage Upload Error:', err);
      return null;
    }
  }

  const COVER_PRESETS = [
    'assets/covers/cover_1.jpg',
    'assets/covers/cover_2.jpg',
    'assets/covers/cover_3.jpg',
    'assets/covers/cover_4.jpg',
  ];

  const NAMIDA_BUCKET_TRACK = {
    id: 'gift-namida-bucket',
    title: '涙を集めるバケツ',
    artist: '見知らぬ誰かからの贈り物',
    coverUrl: 'assets/covers/cover_4.jpg',
    lyrics: NAMIDA_BUCKET_LYRICS_LRC,
    sourceType: 'gift',
    audioUrl: 'https://amugift.b-cdn.net/tracks/namida_bucket.mp3',
    localAudioUrl: 'assets/namida_bucket.mp3',
    file: null,
    durationStr: '03:59',
    duration: 239.92,
  };

  const EXCHANGE_POOL = [
    NAMIDA_BUCKET_TRACK,
    {
      title: '雨の日のノクターン',
      artist: '見知らぬ誰かからの贈り物',
      coverUrl: 'assets/covers/cover_2.jpg',
      lyrics: `[00:00.00]♪ 静かな雨音と遠い街の灯り
[00:15.00]誰かの窓辺に落ちた雨粒が
[00:30.00]この音になって届きますように
[00:45.00]♪ 静かに暮れてゆく夜`,
    },
    {
      title: '星屑のラジオ波',
      artist: '見知らぬ誰かからの贈り物',
      coverUrl: 'assets/covers/cover_1.jpg',
      lyrics: `[00:00.00]♪ 深夜2時の周波数
[00:20.00]名も知らぬあなたへ
[00:40.00]微かな温もりだけを残して
[00:55.00]♪ アナログの彼方へ消えてゆく`,
    },
    {
      title: '琥珀色の午後',
      artist: '見知らぬ誰かからの贈り物',
      coverUrl: 'assets/covers/cover_3.jpg',
      lyrics: `[00:00.00]♪ 陽だまりと古書の香り
[00:25.00]通り過ぎる風の旋律
[00:50.00]♪ 穏やかな時間`,
    },
    {
      title: '深海からの手紙',
      artist: '見知らぬ誰かからの贈り物',
      coverUrl: 'assets/covers/cover_4.jpg',
      lyrics: `[00:00.00]♪ 波の底で生まれた音色
[00:30.00]誰かの心へ静かに届く
[01:00.00]♪ 揺らめく光の粒`,
    }
  ];

  // ギフト曲の配達（初回は必ず「涙を集めるバケツ」が届く）
  function deliverGiftTrack() {
    const hasNamidaBucket = state.collection.some(t => t.title === '涙を集めるバケツ');
    let receivedItem;

    if (!hasNamidaBucket) {
      // ユーザー要望: 「涙を集めるバケツ」はデフォルトではなくギフトで届く！
      receivedItem = {
        id: 'gift-namida-bucket-' + Date.now(),
        title: NAMIDA_BUCKET_TRACK.title,
        artist: NAMIDA_BUCKET_TRACK.artist,
        coverUrl: NAMIDA_BUCKET_TRACK.coverUrl,
        lyrics: NAMIDA_BUCKET_TRACK.lyrics,
        sourceType: 'gift',
        audioUrl: NAMIDA_BUCKET_TRACK.audioUrl,
        localAudioUrl: NAMIDA_BUCKET_TRACK.localAudioUrl,
        file: null,
        durationStr: NAMIDA_BUCKET_TRACK.durationStr,
        duration: NAMIDA_BUCKET_TRACK.duration,
      };
    } else {
      // 既に受け取り済みの場合は、EXCHANGE_POOL からまだ持っていない曲、またはランダム
      const existingTitles = state.collection.map(c => c.title);
      let candidates = EXCHANGE_POOL.filter(p => !existingTitles.includes(p.title));
      if (candidates.length === 0) candidates = EXCHANGE_POOL;
      const giftTrack = candidates[Math.floor(Math.random() * candidates.length)];

      receivedItem = {
        id: 'gift-received-' + Date.now(),
        title: giftTrack.title,
        artist: giftTrack.artist || '見知らぬ誰かからの贈り物',
        coverUrl: giftTrack.coverUrl,
        lyrics: giftTrack.lyrics,
        sourceType: 'gift',
        audioUrl: giftTrack.audioUrl || null,
        localAudioUrl: giftTrack.localAudioUrl || null,
        file: null,
        durationStr: giftTrack.durationStr || '02:00',
        duration: giftTrack.duration || 120,
      };
    }

    // コレクション棚の先頭に追加
    addToCollection(receivedItem);

    // すぐにプレイヤーで再生開始（ターンテーブルに乗せられ、針が落ちて再生開始！）
    playCollectionItem(0);

    // 優しい通知トーストを表示
    setTimeout(() => {
      showGentleToast(
        '風船に乗って音楽が届きました 🎈',
        `見知らぬ誰かからの贈り物「${receivedItem.title}」があなたのターンテーブルへ届きました。`
      );
    }, 800);
  }

  function getTodayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function getDailyGiftCount() {
    const today = getTodayKey();
    const storedDate = localStorage.getItem('amu_gift_date');
    if (storedDate !== today) {
      localStorage.setItem('amu_gift_date', today);
      localStorage.setItem('amu_gift_count', '0');
      return 0;
    }
    return parseInt(localStorage.getItem('amu_gift_count') || '0', 10);
  }

  function incrementDailyGiftCount() {
    const today = getTodayKey();
    const current = getDailyGiftCount();
    const next = current + 1;
    localStorage.setItem('amu_gift_date', today);
    localStorage.setItem('amu_gift_count', String(next));
    updateGiftQuotaBadge();
    return next;
  }

  function updateGiftQuotaBadge() {
    if (!els.giftQuotaBadge) return;
    const count = getDailyGiftCount();
    const remaining = Math.max(0, 2 - count);
    if (remaining > 0) {
      els.giftQuotaBadge.textContent = `残り ${remaining}/2`;
      els.giftQuotaBadge.style.color = '#e6c875';
      els.giftQuotaBadge.style.background = 'rgba(212, 168, 83, 0.2)';
    } else {
      els.giftQuotaBadge.textContent = '本日終了 (0/2)';
      els.giftQuotaBadge.style.color = '#888';
      els.giftQuotaBadge.style.background = 'rgba(255, 255, 255, 0.08)';
    }
  }

  function getGoogleUser() {
    try {
      const data = localStorage.getItem('amu_google_user');
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  function setGoogleUser(user) {
    if (user) {
      localStorage.setItem('amu_google_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('amu_google_user');
    }
    renderAuthUI();
  }

  /**
   * Firestore から自分宛て（または全員宛て）の手紙をリアルタイム監視
   */
  let unsubscribeLetters = null;
  function listenToUserLetters(uid) {
    if (!fbDb) return;
    if (unsubscribeLetters) unsubscribeLetters();

    try {
      unsubscribeLetters = fbDb.collection('letters')
        .orderBy('createdAt', 'desc')
        .limit(20)
        .onSnapshot((snapshot) => {
          let hasNew = false;
          snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
              const data = change.doc.data();
              // 自分が送ったものでない場合、通知トーストを表示
              if (fbUser && data.fromUserId !== fbUser.uid) {
                hasNew = true;
                showGentleToast(
                  '風船に乗った感想が届きました 🎈',
                  `「${data.trackTitle || '曲'}」へ感想が届きました：「${(data.body || '').slice(0, 30)}...」`
                );
              }
            }
          });

          // 手紙モーダル用にマッピング
          const onlineLetters = [];
          snapshot.forEach(doc => {
            const d = doc.data();
            onlineLetters.push({
              id: doc.id,
              timestamp: d.createdAt ? new Date(d.createdAt.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'たった今',
              title: `「${d.trackTitle || '曲'}」への感想 🎈`,
              body: `${d.fromUserName || '見知らぬリスナー'} より：「${d.body}」`,
              read: false,
            });
          });

          if (onlineLetters.length > 0) {
            localStorage.setItem('amu_letters', JSON.stringify(onlineLetters));
            updateLetterBadge();
          }
        }, (err) => {
          console.warn('Firestore letters listener:', err);
        });
    } catch (err) {
      console.warn('Firestore snapshot setup error:', err);
    }
  }

  function renderAuthUI() {
    const user = getGoogleUser();
    if (user) {
      if (els.btnGoogleLogin) els.btnGoogleLogin.style.display = 'none';
      if (els.userProfile) {
        els.userProfile.style.display = 'flex';
        if (els.userName) els.userName.textContent = user.name || 'Amu Listener';
        if (els.userAvatar) els.userAvatar.src = user.avatar || 'assets/user_walnut.jpg';
      }
    } else {
      if (els.btnGoogleLogin) els.btnGoogleLogin.style.display = 'inline-flex';
      if (els.userProfile) els.userProfile.style.display = 'none';
    }
  }

  function getLetterNotifications() {
    try {
      const data = localStorage.getItem('amu_letters');
      return data ? JSON.parse(data) : [
        {
          id: 'welcome-letter',
          timestamp: 'GIFT 案内',
          title: '静かな音楽の交換所へようこそ',
          body: 'ここでは誰の曲かという評価や数字はありません。音楽を1曲GIFTすると、世界の誰かから1曲が届きます。',
          read: true
        }
      ];
    } catch (e) {
      return [];
    }
  }

  function saveLetterNotification(letter) {
    const letters = getLetterNotifications();
    letters.unshift(letter);
    localStorage.setItem('amu_letters', JSON.stringify(letters));
    updateLetterBadge();
  }

  function updateLetterBadge() {
    const letters = getLetterNotifications();
    const hasUnread = letters.some(l => !l.read);
    if (els.notiDot) {
      els.notiDot.style.display = hasUnread ? 'block' : 'none';
    }
  }

  function renderLetterModal() {
    if (!els.lettersList) return;
    const letters = getLetterNotifications();
    els.lettersList.innerHTML = '';
    letters.forEach(letter => {
      const item = document.createElement('div');
      item.className = 'letter-item';
      item.innerHTML = `
        <div class="letter-top">
          <span class="letter-badge-icon">🎈</span>
          <strong class="letter-subject">${letter.title}</strong>
          <span class="letter-time">${letter.timestamp}</span>
        </div>
        <p class="letter-content">${letter.body}</p>
      `;
      els.lettersList.appendChild(item);
    });

    // 閲覧したら既読
    const updated = letters.map(l => ({ ...l, read: true }));
    localStorage.setItem('amu_letters', JSON.stringify(updated));
    updateLetterBadge();
  }

  function showGentleToast(title, message) {
    if (!els.gentleToast) return;
    if (els.toastMessage) {
      els.toastMessage.textContent = message || '世界のどこかの街で、あなたの音楽がレコードに針を落とされました。';
    }
    els.gentleToast.style.display = 'block';
    els.gentleToast.classList.remove('fade-out');
    els.gentleToast.classList.add('slide-in');

    setTimeout(() => {
      if (els.gentleToast) {
        els.gentleToast.classList.remove('slide-in');
        els.gentleToast.classList.add('fade-out');
        setTimeout(() => {
          if (els.gentleToast) els.gentleToast.style.display = 'none';
        }, 600);
      }
    }, 9000);
  }

  function getCommentedTrackIds() {
    try {
      const data = localStorage.getItem('amu_commented_tracks');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function isTrackCommented(trackId) {
    if (!trackId) return false;
    const list = getCommentedTrackIds();
    return list.includes(trackId);
  }

  function markTrackCommented(trackId) {
    if (!trackId) return;
    const list = getCommentedTrackIds();
    if (!list.includes(trackId)) {
      list.push(trackId);
      localStorage.setItem('amu_commented_tracks', JSON.stringify(list));
    }
  }

  function updateCommentGiftButton() {
    if (!els.btnOpenCommentModal) return;
    const curTrack = state.currentTrackInfo || (state.collection && state.collection[state.currentCollectionIndex]);
    const curId = curTrack ? curTrack.id : 'demo-track';
    const isCommented = isTrackCommented(curId);

    if (isCommented) {
      els.btnOpenCommentModal.classList.add('commented');
      els.btnOpenCommentModal.innerHTML = `
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>感想GIFT済み ✓</span>
      `;
      els.btnOpenCommentModal.title = 'この曲には既に温かい感想をGIFT済みです（タップして再送・閲覧も可能）';
    } else {
      els.btnOpenCommentModal.classList.remove('commented');
      els.btnOpenCommentModal.innerHTML = `
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <span>感想をGIFT (次の曲へ)</span>
      `;
      els.btnOpenCommentModal.title = 'この曲の作者へ感想をGIFTして、世界の誰かから次の曲を受け取ります';
    }
  }

  function openCommentModal(optionalNotice) {
    if (!els.commentGiftModal) return;

    const curTrack = state.currentTrackInfo || (state.collection && state.collection[state.currentCollectionIndex]);
    const curTitle = curTrack ? curTrack.title : 'Chasing The Eclipse';
    const curArtist = curTrack ? (curTrack.artist || '見知らぬ誰かからの贈り物') : '見知らぬ誰かからの贈り物';
    const curCover = curTrack ? (curTrack.coverUrl || 'assets/default_cover.jpg') : 'assets/default_cover.jpg';

    if (els.commentModalTitle) els.commentModalTitle.textContent = curTitle;
    if (els.commentModalArtist) els.commentModalArtist.textContent = curArtist;
    if (els.commentModalCover) els.commentModalCover.src = curCover;

    const headerP = els.commentGiftModal.querySelector('.modal-title-group p');
    if (headerP) {
      headerP.textContent = optionalNotice || 'この曲の作者へ感想を贈りましょう。あなたの言葉が届くと、世界の誰かから次の音楽がGIFTされます。';
    }

    els.commentGiftModal.style.display = 'flex';
    if (els.commentTextInput) {
      els.commentTextInput.focus();
    }
  }

  function initGiftSNS() {
    // 1. Google 認証状態の初期化 (Firebase Auth 連携)
    if (fbAuth) {
      fbAuth.onAuthStateChanged((user) => {
        if (user) {
          fbUser = user;
          setGoogleUser({
            uid: user.uid,
            name: user.displayName || 'Google Listener',
            email: user.email,
            avatar: user.photoURL || 'assets/user_walnut.jpg'
          });
          listenToUserLetters(user.uid);
        } else {
          fbUser = null;
          setGoogleUser(null);
          listenToUserLetters('guest');
        }
      });
    } else {
      renderAuthUI();
    }

    if (els.btnGoogleLogin) {
      els.btnGoogleLogin.addEventListener('click', async () => {
        if (fbAuth) {
          try {
            const provider = new firebase.auth.GoogleAuthProvider();
            await fbAuth.signInWithPopup(provider);
            if (els.googleAuthModal) els.googleAuthModal.style.display = 'none';
          } catch (e) {
            console.warn('Firebase popup sign-in fallback:', e);
            if (els.googleAuthModal) els.googleAuthModal.style.display = 'flex';
          }
        } else {
          if (els.googleAuthModal) els.googleAuthModal.style.display = 'flex';
        }
      });
    }
    if (els.btnCloseGoogleModal) {
      els.btnCloseGoogleModal.addEventListener('click', () => {
        if (els.googleAuthModal) els.googleAuthModal.style.display = 'none';
      });
    }
    if (els.btnSelectGoogleAccount) {
      els.btnSelectGoogleAccount.addEventListener('click', () => {
        setGoogleUser({
          name: 'Amu Listener',
          email: 'amu.listener@gmail.com',
          avatar: 'assets/user_walnut.jpg'
        });
        if (els.googleAuthModal) els.googleAuthModal.style.display = 'none';
        if (els.giftModal) els.giftModal.style.display = 'flex';
      });
    }
    if (els.btnLogout) {
      els.btnLogout.addEventListener('click', () => {
        if (confirm('ログアウトしますか？')) {
          if (fbAuth) fbAuth.signOut();
          setGoogleUser(null);
        }
      });
    }

    // 2. 1日2曲のGIFT制限クォータ表示
    updateGiftQuotaBadge();

    // 3. GIFTモーダル開閉
    if (els.btnOpenGiftModal) {
      els.btnOpenGiftModal.addEventListener('click', () => {
        // 未ログインの場合はGoogle登録モーダルを促す
        if (!getGoogleUser()) {
          if (els.googleAuthModal) els.googleAuthModal.style.display = 'flex';
          return;
        }

        // 1日2曲の上限チェック
        if (getDailyGiftCount() >= 2) {
          alert('本日のGIFT上限（1日2曲まで）に達しました。明日また誰かへ届けてください。');
          return;
        }

        if (els.giftModal) els.giftModal.style.display = 'flex';
      });
    }

    if (els.btnCloseGiftModal) {
      els.btnCloseGiftModal.addEventListener('click', () => {
        if (els.giftModal) els.giftModal.style.display = 'none';
      });
    }
    if (els.btnCancelGift) {
      els.btnCancelGift.addEventListener('click', () => {
        if (els.giftModal) els.giftModal.style.display = 'none';
      });
    }

    // 4. 音声ファイル選択時のファイル名表示 ＆ ドロップボックスクリック
    const giftDropBox = document.getElementById('giftDropBox');
    if (giftDropBox && els.giftAudioInput) {
      giftDropBox.addEventListener('click', (e) => {
        if (e.target !== els.giftAudioInput) {
          els.giftAudioInput.click();
        }
      });
      ['dragenter', 'dragover'].forEach(eventName => {
        giftDropBox.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          giftDropBox.classList.add('drag-over');
        });
      });
      ['dragleave', 'drop'].forEach(eventName => {
        giftDropBox.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          giftDropBox.classList.remove('drag-over');
        });
      });
      giftDropBox.addEventListener('drop', (e) => {
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
          els.giftAudioInput.files = e.dataTransfer.files;
          els.giftAudioInput.dispatchEvent(new Event('change'));
        }
      });
    }

    if (els.giftAudioInput) {
      els.giftAudioInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (els.giftAudioFileName) {
          els.giftAudioFileName.textContent = file ? file.name : '選択されていません';
        }
      });
    }

    // サンプル音源セットボタン
    const btnUseDemoAudioGift = document.getElementById('btnUseDemoAudioGift');
    if (btnUseDemoAudioGift) {
      btnUseDemoAudioGift.addEventListener('click', () => {
        const dt = new DataTransfer();
        const dummyFile = new File(['sample audio wav data'], 'ambient_gift_sample.wav', { type: 'audio/wav' });
        dt.items.add(dummyFile);
        if (els.giftAudioInput) {
          els.giftAudioInput.files = dt.files;
        }
        if (els.giftAudioFileName) {
          els.giftAudioFileName.textContent = '🎵 ambient_gift_sample.wav (サンプル音源)';
        }
        if (els.giftTitleInput && !els.giftTitleInput.value) {
          els.giftTitleInput.value = '夜明けの周波数';
        }
        if (els.giftLyricsInput && !els.giftLyricsInput.value) {
          els.giftLyricsInput.value = `[00:00.00]♪ 静かな夜明けの風\n[00:20.00]世界の誰かへ届くメロディ\n[00:40.00]♪ 穏やかに響く`;
        }
      });
    }

    // 5. GIFT送信 (1対1交換 & ランダムカバー自動適用 & Bunny CDNアップロード)
    if (els.btnSubmitGift) {
      els.btnSubmitGift.addEventListener('click', async () => {
        const file = els.giftAudioInput && els.giftAudioInput.files && els.giftAudioInput.files[0];
        if (!file) {
          alert('GIFTする音楽ファイル（MP3またはWAV）を選択してください。');
          return;
        }

        const songTitle = (els.giftTitleInput && els.giftTitleInput.value.trim()) || '無題の贈り物';
        const lyricsText = (els.giftLyricsInput && els.giftLyricsInput.value.trim()) || null;

        // 1日の上限をインクリメント
        incrementDailyGiftCount();

        // モーダルを閉じる
        if (els.giftModal) els.giftModal.style.display = 'none';

        // フォームリセット
        if (els.giftAudioInput) els.giftAudioInput.value = '';
        if (els.giftAudioFileName) els.giftAudioFileName.textContent = '選択されていません';
        if (els.giftTitleInput) els.giftTitleInput.value = '';
        if (els.giftLyricsInput) els.giftLyricsInput.value = '';

        // 交換アニメーション演出を表示
        if (els.exchangeOverlay) {
          els.exchangeOverlay.style.display = 'flex';
          if (els.exchangeTitle) els.exchangeTitle.textContent = 'あなたの音楽を風船に結んで、空へ放ちました... 🎈';
          if (els.exchangeDesc) els.exchangeDesc.textContent = '風に乗って、遠い誰かの街へ旅立っていきます (Bunny CDN 配信中)';

          // バックグラウンドでBunny Storageへ非同期アップロード
          let uploadedCdnUrl = null;
          try {
            uploadedCdnUrl = await uploadAudioToBunny(file, songTitle);
            // Firestore の tracks コレクションへ保存
            if (fbDb && uploadedCdnUrl) {
              await fbDb.collection('tracks').add({
                title: songTitle,
                artist: '見知らぬ誰かからの贈り物',
                audioUrl: uploadedCdnUrl,
                coverUrl: COVER_PRESETS[Math.floor(Math.random() * COVER_PRESETS.length)],
                lyrics: lyricsText || '',
                creatorUid: fbUser ? fbUser.uid : 'guest',
                creatorName: fbUser ? fbUser.displayName : '匿名クリエイター',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              });
              console.log('Saved to Firestore tracks successfully');
            }
          } catch (e) {
            console.warn('Bunny / Firestore upload fallback:', e);
          }

          setTimeout(() => {
            if (els.exchangeTitle) els.exchangeTitle.textContent = 'そして、どこかの空から新しい音楽の風船が舞い降りました 🎈';
            if (els.exchangeDesc) els.exchangeDesc.textContent = '届いたレコードが棚に飾られ、ターンテーブルへ乗せられます';
          }, 1800);

          setTimeout(() => {
            if (els.exchangeOverlay) els.exchangeOverlay.style.display = 'none';

            // ギフト曲の配達（初回は「涙を集めるバケツ」が届く）
            deliverGiftTrack();
          }, 3600);
        }

        // 6.5秒後に優しい通知を表示 ("風船に乗った音楽が届きました")
        setTimeout(() => {
          showGentleToast(
            '風船に乗った音楽が誰かに届きました 🎈',
            `空を旅したあなたの「${songTitle}」が、どこかの街で針を落とされました。`
          );

          saveLetterNotification({
            id: 'letter-' + Date.now(),
            timestamp: 'たった今',
            title: '風船に乗った音楽が誰かに届きました',
            body: `世界のどこかで、見知らぬ誰かが空から届いたあなたの「${songTitle}」を針に乗せました。静かに心を通わせる音の風船です。`,
            read: false
          });
        }, 6500);
      });
    }

    // 6. 届いた手紙モーダル
    if (els.btnLetterNotifications) {
      els.btnLetterNotifications.addEventListener('click', () => {
        if (els.letterModal) {
          els.letterModal.style.display = 'flex';
          renderLetterModal();
        }
      });
    }
    if (els.btnCloseLetterModal) {
      els.btnCloseLetterModal.addEventListener('click', () => {
        if (els.letterModal) els.letterModal.style.display = 'none';
      });
    }
    if (els.btnCloseLetterModalBtn) {
      els.btnCloseLetterModalBtn.addEventListener('click', () => {
        if (els.letterModal) els.letterModal.style.display = 'none';
      });
    }

    // 7. 優しいトーストのクローズ
    if (els.btnCloseToast) {
      els.btnCloseToast.addEventListener('click', () => {
        if (els.gentleToast) els.gentleToast.style.display = 'none';
      });
    }

    // ========================================================================
    // 8. コメントGIFT機能 (感想を作者へ届けて次の曲を受け取るリスナー参加型)
    // ========================================================================
    if (els.btnOpenCommentModal) {
      els.btnOpenCommentModal.addEventListener('click', () => {
        openCommentModal();
      });
    }

    if (els.btnCloseCommentModal) {
      els.btnCloseCommentModal.addEventListener('click', () => {
        if (els.commentGiftModal) els.commentGiftModal.style.display = 'none';
      });
    }

    if (els.btnCancelComment) {
      els.btnCancelComment.addEventListener('click', () => {
        if (els.commentGiftModal) els.commentGiftModal.style.display = 'none';
      });
    }

    // 感想GIFT送信ボタン
    if (els.btnSubmitComment) {
      els.btnSubmitComment.addEventListener('click', () => {
        const commentText = els.commentTextInput ? els.commentTextInput.value.trim() : '';
        if (!commentText) {
          alert('作者へ届ける感想を一言入力してください 🎈');
          if (els.commentTextInput) els.commentTextInput.focus();
          return;
        }

        const curTrack = state.currentTrackInfo || (state.collection && state.collection[state.currentCollectionIndex]);
        const curId = curTrack ? curTrack.id : 'demo-track';
        const curTitle = curTrack ? curTrack.title : 'この曲';

        // 1. コメント済みとして登録
        markTrackCommented(curId);

        // 2. 届いた手紙（記録）に追加 ＆ Firestore へ送信
        saveLetterNotification({
          id: 'letter-comment-' + Date.now(),
          timestamp: 'たった今',
          title: `「${curTitle}」へ風船の感想を届けました`,
          body: `あなたが風船に託した言葉:「${commentText}」\n世界のどこかで、作者が温かい気持ちでこの風船を受け取りました。`,
          read: true
        });

        if (fbDb) {
          try {
            fbDb.collection('letters').add({
              trackTitle: curTitle,
              trackId: curId,
              fromUserId: fbUser ? fbUser.uid : 'guest',
              fromUserName: fbUser ? (fbUser.displayName || '見知らぬリスナー') : '見知らぬリスナー',
              body: commentText,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
            console.log('Firestore: Letter added successfully');
          } catch (err) {
            console.warn('Firestore letter write error:', err);
          }
        }

        // 3. モーダルを閉じ、フォームをリセット
        if (els.commentGiftModal) els.commentGiftModal.style.display = 'none';
        if (els.commentTextInput) els.commentTextInput.value = '';

        // 4. ボタン表示を更新
        updateCommentGiftButton();

        // 5. 交換演出アニメーション
        if (els.exchangeOverlay) {
          els.exchangeOverlay.style.display = 'flex';
          if (els.exchangeTitle) els.exchangeTitle.textContent = 'あなたの温かい言葉を風船につけて、空へ放ちました... 🎈';
          if (els.exchangeDesc) els.exchangeDesc.textContent = '風に乗って、見知らぬ作者の街へ旅立っていきます';

          setTimeout(() => {
            if (els.exchangeTitle) els.exchangeTitle.textContent = 'そして、どこかの空から新しい音楽の風船が舞い降りました 🎈';
            if (els.exchangeDesc) els.exchangeDesc.textContent = '届いたレコードに針を落とします';
          }, 1800);

          setTimeout(() => {
            if (els.exchangeOverlay) els.exchangeOverlay.style.display = 'none';

            // ギフト曲の配達（初回は「涙を集めるバケツ」が届く）
            deliverGiftTrack();
          }, 3600);
        }

        // 6. 5秒後に優しい通知トースト
        setTimeout(() => {
          showGentleToast(
            '風船に乗った感想が作者へ届きました 🎈',
            `風船に乗せたあなたの温かい言葉が、「${curTitle}」の作者のもとへふわりと舞い降りました。`
          );
        }, 5500);
      });
    }

    updateLetterBadge();
    updateCommentGiftButton();
  }

  // ==========================================================================
  // 10. 16:9 スケーリング & 初期起動
  // ==========================================================================
  const cinemaBox = document.getElementById('cinemaBox');

  function fitCinemaToScreen() {
    if (!cinemaBox) return;

    // 1. スマホを立てた場合 (ポートレート: 幅820px以下 かつ 縦長)
    const isPortrait = window.innerWidth <= 820 && window.innerHeight > window.innerWidth;
    if (isPortrait) {
      cinemaBox.classList.add('mobile-portrait');
      cinemaBox.classList.remove('mobile-landscape');
      cinemaBox.style.transform = '';
      return;
    }

    // 2. スマホを横にした場合 (ランドスケープ: 高さ560px以下 または 幅960px以下かつ横長)
    const isMobileLandscape = (window.innerHeight <= 560 && window.innerWidth > window.innerHeight) ||
                              (window.innerWidth <= 960 && window.innerHeight < 600 && window.innerWidth > window.innerHeight);
    if (isMobileLandscape) {
      cinemaBox.classList.add('mobile-landscape');
      cinemaBox.classList.remove('mobile-portrait');
      cinemaBox.style.transform = '';
      return;
    }

    // 3. PC画面 / デスクトップ (16:9 シネマティック比率を厳密維持)
    cinemaBox.classList.remove('mobile-portrait');
    cinemaBox.classList.remove('mobile-landscape');
    const padding = 20;
    const availW = window.innerWidth - padding * 2;
    const availH = window.innerHeight - padding * 2;
    const baseW = 1280;
    const baseH = 720;

    // 画面に収まる最大スケール倍率を計算 (16:9 厳密維持)
    const scale = Math.min(availW / baseW, availH / baseH, 1.25);
    cinemaBox.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(4)})`;
  }

  // ==========================================================================
  // 11. オープニングスプラッシュ ＆ ムービー再生フロー
  // ==========================================================================
  function initOpeningFlow() {
    if (!els.giftSplashOverlay) return;

    // 1. 総参加人数・総楽曲数の実データ集計（デモ値ではなく実際のものを使用）
    const defaultAvailableTracks = (typeof EXCHANGE_POOL !== 'undefined' ? EXCHANGE_POOL.length : 5);
    const userGifts = getDailyGiftCount();
    let currentTracks = defaultAvailableTracks + userGifts;
    let currentUsers = 1;

    if (els.splashTotalUsers) els.splashTotalUsers.textContent = currentUsers.toLocaleString();
    if (els.splashTotalTracks) els.splashTotalTracks.textContent = currentTracks.toLocaleString();

    // Firestoreから実データをリアルタイム取得して反映
    if (fbDb) {
      Promise.all([
        fbDb.collection('tracks').get().catch(e => {
          console.warn('Tracks fetch error:', e);
          return null;
        }),
        fbDb.collection('letters').get().catch(e => {
          console.warn('Letters fetch error:', e);
          return null;
        })
      ]).then(([tracksSnap, lettersSnap]) => {
        const participantSet = new Set();
        let firestoreTrackCount = 0;

        if (tracksSnap && !tracksSnap.empty) {
          firestoreTrackCount = tracksSnap.size;
          tracksSnap.forEach(doc => {
            const data = doc.data();
            if (data.creatorUid) participantSet.add(data.creatorUid);
            if (data.fromUserId) participantSet.add(data.fromUserId);
          });
        }

        if (lettersSnap && !lettersSnap.empty) {
          lettersSnap.forEach(doc => {
            const data = doc.data();
            if (data.fromUserId) participantSet.add(data.fromUserId);
            if (data.toUserId) participantSet.add(data.toUserId);
          });
        }

        // ログイン中ユーザーまたはローカルユーザーを加算
        const localUser = getGoogleUser();
        if (localUser && localUser.uid) participantSet.add(localUser.uid);
        if (fbUser && fbUser.uid) participantSet.add(fbUser.uid);

        currentUsers = Math.max(1, participantSet.size);
        currentTracks = defaultAvailableTracks + firestoreTrackCount + userGifts;

        if (els.splashTotalUsers) els.splashTotalUsers.textContent = currentUsers.toLocaleString();
        if (els.splashTotalTracks) els.splashTotalTracks.textContent = currentTracks.toLocaleString();
      }).catch(err => {
        console.warn('Real stats calculation fallback:', err);
      });
    }

    // 2. スプラッシュ画面タップ -> ムービー再生開始 (ターンテーブルを一切映さず即座に動画へ移行)
    let isTransitioning = false;

    function handleSplashTap() {
      if (isTransitioning) return;
      isTransitioning = true;

      // オーディオコンテキストの初期化（ブラウザの自動再生ポリシー解除）
      initAudioContext();
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      // ムービーオーバーレイを即座に表示してターンテーブルの露出を完全遮断
      if (els.giftMovieOverlay && els.openingVideo) {
        els.giftMovieOverlay.style.display = 'flex';
        els.giftMovieOverlay.style.opacity = '1';
        els.openingVideo.currentTime = 0;

        const playPromise = els.openingVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.warn('Unmuted play blocked, retrying with muted fallback:', err);
            els.openingVideo.muted = true;
            els.openingVideo.play().catch(e => {
              console.warn('Video playback notice (skipping to gallery):', e);
              skipMovieToGallery();
            });
          });
        }
      }

      // スプラッシュ画面を動画の前面でスムーズにフェードアウト
      els.giftSplashOverlay.style.transition = 'opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1)';
      els.giftSplashOverlay.style.opacity = '0';
      els.giftSplashOverlay.style.pointerEvents = 'none';

      setTimeout(() => {
        els.giftSplashOverlay.style.display = 'none';
        if (!els.giftMovieOverlay || !els.openingVideo) {
          skipMovieToGallery();
        }
      }, 280);
    }

    els.giftSplashOverlay.addEventListener('click', handleSplashTap);

    // 3. ムービースキップ -> ギャラリーの棚画面へ
    let hasSkipped = false;

    function skipMovieToGallery() {
      if (hasSkipped) return;
      hasSkipped = true;

      if (els.openingVideo) {
        try {
          els.openingVideo.pause();
        } catch (e) {}
      }

      if (els.giftMovieOverlay) {
        els.giftMovieOverlay.style.opacity = '0';
        els.giftMovieOverlay.style.pointerEvents = 'none';
        setTimeout(() => {
          els.giftMovieOverlay.style.display = 'none';
        }, 350);
      }

      // ギャラリーの棚の画面（SHELF GALLERY）に切り替え！
      switchTab('gallery');
    }

    if (els.btnSkipMovie) {
      els.btnSkipMovie.addEventListener('click', (e) => {
        e.stopPropagation();
        skipMovieToGallery();
      });
    }

    if (els.giftMovieOverlay) {
      els.giftMovieOverlay.addEventListener('click', skipMovieToGallery);
    }

    if (els.openingVideo) {
      els.openingVideo.addEventListener('ended', skipMovieToGallery);
      els.openingVideo.addEventListener('error', () => {
        console.warn('Opening video not found or error. Transitioning to shelf gallery.');
        skipMovieToGallery();
      });
    }
  }

  function init() {
    fitCinemaToScreen();
    window.addEventListener('resize', fitCinemaToScreen);
    window.addEventListener('orientationchange', () => setTimeout(fitCinemaToScreen, 120));
    setupEventListeners();
    initGiftSNS();
    initOpeningFlow();

    // デフォルト歌詞のセットアップ (Chasing The Eclipse)
    if (els.lyricsTextarea) els.lyricsTextarea.value = DEMO_LYRICS_LRC;
    renderLyrics(parseLRC(DEMO_LYRICS_LRC));
    updateTimeDisplay();
    els.btnToggleNoise.classList.add('active');
    els.crackleBadge.classList.add('active');
    updateGalleryCount();
    renderShelfGallery();

    // デモ曲のオフラインWAVレンダリングを行いaudioElementにプリロード
    renderDemoWav((blobUrl) => {
      demoAudioBlobUrl = blobUrl;
      if (state.audioSourceType === 'demo') {
        audioElement.src = blobUrl;
        audioElement.loop = true;
        audioElement.onloadedmetadata = () => {
          state.duration = audioElement.duration || 92;
          updateTimeDisplay();
        };
      }
    });

    applyCoverArtwork(state.currentTrackInfo.coverUrl);
    if (els.trackTitle) els.trackTitle.textContent = state.currentTrackInfo.title;
    if (els.trackArtist) els.trackArtist.textContent = state.currentTrackInfo.artist;
    if (els.sourceBadge) els.sourceBadge.textContent = 'Preset Track';
    if (els.formatBadge) els.formatBadge.textContent = 'DEMO • 33⅓ RPM';
    updateCommentGiftButton();
  }

  window.addEventListener('DOMContentLoaded', init);

})();
