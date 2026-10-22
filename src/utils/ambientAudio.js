/**
 * Procedural Himalayan Ambient Mist Sound Synthesizer (Web Audio API)
 * Generates a soothing, gentle mountain mist breeze & distant lake ripples.
 * 100% offline, zero network requests.
 */

let audioCtx = null;
let masterGain = null;
let noiseNode = null;

export function initAmbientAudio() {
  if (typeof window === 'undefined') return null;

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;

    if (!audioCtx) {
      audioCtx = new AudioContext();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    if (!masterGain) {
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.06, audioCtx.currentTime); // gentle ambient level
      masterGain.connect(audioCtx.destination);
    }

    // Generate 4 seconds of looped pink noise
    const bufferSize = audioCtx.sampleRate * 4;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;

    // Atmospheric lowpass filter (muffled mountain wind)
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, audioCtx.currentTime);

    // Subtle LFO modulation for wind gusts
    const lfo = audioCtx.createOscillator();
    lfo.frequency.setValueAtTime(0.18, audioCtx.currentTime);
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(140, audioCtx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    noiseNode.connect(filter);
    filter.connect(masterGain);
    noiseNode.start();

    return { audioCtx, masterGain };
  } catch (err) {
    console.warn('Web Audio initialization prevented by policy or unsupported:', err);
    return null;
  }
}

export function setAmbientVolume(volume) {
  if (masterGain && audioCtx) {
    masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), audioCtx.currentTime);
  }
}

export function stopAmbientAudio() {
  if (audioCtx && audioCtx.state !== 'closed') {
    if (masterGain) {
      masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
    }
  }
}
