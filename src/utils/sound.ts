// Retro Sci-Fi Sound Synthesizer using Web Audio API

class SoundManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private humOsc: OscillatorNode | null = null;
  private humGain: GainNode | null = null;

  constructor() {
    // Initialize on user interaction usually, but we'll try to init lazily
  }

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.3; // Master volume
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playTypingSound() {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    // Random pitch for variety
    osc.frequency.setValueAtTime(800 + Math.random() * 200, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  public playBootSequence() {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    
    // Arpeggio
    [440, 554, 659, 880].forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0, now + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.1, now + i * 0.1 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.4);
      
      osc.connect(gain);
      gain.connect(this.masterGain!);
      
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.5);
    });
  }

  public playClawSound() {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(50, this.ctx.currentTime + 1.5); // Slide down

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, this.ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(200, this.ctx.currentTime + 1.5);

    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 1.5);
  }

  public playSuccessChime() {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(880, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.0);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 1.0);
  }

  public startAmbientHum() {
    this.init();
    if (!this.ctx || !this.masterGain || this.humOsc) return;

    // Create a low drone
    this.humOsc = this.ctx.createOscillator();
    this.humGain = this.ctx.createGain();

    this.humOsc.type = 'sine';
    this.humOsc.frequency.value = 60; // 60Hz hum
    
    this.humGain.gain.value = 0.02; // Very quiet

    this.humOsc.connect(this.humGain);
    this.humGain.connect(this.masterGain);

    this.humOsc.start();
  }

  public stopAmbientHum() {
    if (this.humOsc) {
      this.humOsc.stop();
      this.humOsc.disconnect();
      this.humOsc = null;
    }
    if (this.humGain) {
      this.humGain.disconnect();
      this.humGain = null;
    }
  }
}

export const soundManager = new SoundManager();
