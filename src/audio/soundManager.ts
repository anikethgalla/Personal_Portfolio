/**
 * Pure Web Audio API Sound Synthesizer
 * Generates motor hum, impact pops, and discovery chimes with zero external audio assets.
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private engineOsc: OscillatorNode | null = null;
  private engineGain: GainNode | null = null;
  private engineFilter: BiquadFilterNode | null = null;
  private isEngineRunning: boolean = false;

  constructor() {
    const saved = localStorage.getItem('sound_muted');
    if (saved !== null) {
      this.isMuted = saved === 'true';
    }
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    localStorage.setItem('sound_muted', String(muted));
    if (muted && this.engineGain) {
      this.engineGain.gain.setValueAtTime(0, this.ctx?.currentTime || 0);
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  /**
   * Continuous dynamic engine sound with pitch shifting based on speed
   */
  public updateEngine(speedNormalized: number) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      if (!this.isEngineRunning) {
        this.engineOsc = this.ctx.createOscillator();
        this.engineGain = this.ctx.createGain();
        this.engineFilter = this.ctx.createBiquadFilter();

        this.engineOsc.type = 'sawtooth';
        this.engineFilter.type = 'lowpass';
        this.engineFilter.frequency.setValueAtTime(140, this.ctx.currentTime);

        this.engineGain.gain.setValueAtTime(0.015, this.ctx.currentTime);

        this.engineOsc.connect(this.engineFilter);
        this.engineFilter.connect(this.engineGain);
        this.engineGain.connect(this.ctx.destination);

        this.engineOsc.start();
        this.isEngineRunning = true;
      }

      if (this.engineOsc && this.engineFilter && this.engineGain) {
        // Base idle at 55Hz, revs up to 180Hz
        const targetFreq = 55 + speedNormalized * 110;
        const targetFilter = 120 + speedNormalized * 220;
        const targetVol = 0.015 + speedNormalized * 0.035;

        const now = this.ctx.currentTime;
        this.engineOsc.frequency.setTargetAtTime(targetFreq, now, 0.1);
        this.engineFilter.frequency.setTargetAtTime(targetFilter, now, 0.1);
        this.engineGain.gain.setTargetAtTime(this.isMuted ? 0 : targetVol, now, 0.1);
      }
    } catch {
      // AudioContext policy fallback
    }
  }

  /**
   * Tactile impact sound when the car bumps into blocks or boundaries
   */
  public playImpact(force: number = 1) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      const intensity = Math.min(Math.max(force, 0.2), 1.5);
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160 * intensity, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.12);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, now);

      gain.gain.setValueAtTime(0.08 * intensity, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    } catch {
      // AudioContext policy fallback
    }
  }

  /**
   * Harmonious chord when entering a zone or opening a modal
   */
  public playChime() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        gain.gain.setValueAtTime(0.04, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4 + idx * 0.04);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + idx * 0.04);
        osc.stop(now + 0.5 + idx * 0.04);
      });
    } catch {
      // AudioContext policy fallback
    }
  }
}

export const soundManager = new SoundManager();

