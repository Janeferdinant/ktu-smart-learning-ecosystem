import { describe, it, expect } from 'vitest';
import { speechService } from '../services/speechNarration';

describe('Task 9: Early Learning Mode & Narration Validation', () => {
  it('speechService should implement speech controls without throwing', () => {
    expect(typeof speechService.speak).toBe('function');
    expect(typeof speechService.stop).toBe('function');
    expect(typeof speechService.toggleMute).toBe('function');
    expect(typeof speechService.getIsMuted).toBe('function');

    const initialMute = speechService.getIsMuted();
    const toggled = speechService.toggleMute();
    expect(toggled).toBe(!initialMute);
    speechService.toggleMute(); // reset
  });
});
