class SoundManager {
  private muted: boolean = false;
  private audioContext: AudioContext | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
  }

  setMuted(muted: boolean) {
    this.muted = muted;
  }

  isMuted(): boolean {
    return this.muted;
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = "sine", volume: number = 0.3) {
    if (this.muted || !this.audioContext) return;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  playClick() {
    if (this.muted) return;
    this.playTone(800, 0.1, "square", 0.15);
    setTimeout(() => this.playTone(1200, 0.08, "sine", 0.1), 50);
  }

  playAchievement() {
    if (this.muted) return;
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.3, "sine", 0.2), i * 150);
    });
  }

  playMilestone() {
    if (this.muted) return;
    const notes = [392, 523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.4, "triangle", 0.25), i * 200);
    });
  }

  playSecretEvent() {
    if (this.muted) return;
    const notes = [220, 330, 440, 660, 880, 1320];
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.2, "sawtooth", 0.15), i * 100);
    });
  }

  playUnlock() {
    if (this.muted) return;
    const notes = [262, 330, 392, 523, 659, 784];
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.25, "sine", 0.2), i * 100);
    });
  }
}

export const soundManager = new SoundManager();
export default soundManager;
