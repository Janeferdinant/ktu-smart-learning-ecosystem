class SpeechNarrationService {
  private isMuted: boolean = false;
  private speechRate: number = 0.95; // Gentle pace for children
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  public speak(text: string, onEnd?: () => void): void {
    if (this.isMuted) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this environment');
      return;
    }

    // Cancel any previous active speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = this.speechRate;
    utterance.pitch = 1.1; // Friendly warm pitch

    if (onEnd) {
      utterance.onend = onEnd;
    }

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  public stop(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stop();
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setRate(rate: number): void {
    this.speechRate = Math.max(0.5, Math.min(1.5, rate));
  }
}

export const speechService = new SpeechNarrationService();
