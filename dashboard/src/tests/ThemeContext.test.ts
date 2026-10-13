import { describe, it, expect } from 'vitest';
import { GLASS_THEMES } from '../types/theme';

describe('Task 2: Theme System Validation', () => {
  it('should define exactly 10 selectable glass themes', () => {
    expect(GLASS_THEMES).toHaveLength(10);
  });

  it('should contain all required themes from the specification', () => {
    const ids = GLASS_THEMES.map(t => t.id);
    const required = [
      'light-liquid',
      'dark-liquid',
      'iridescent',
      'frosted',
      'crystal',
      'aurora',
      'soft-pastel',
      'burgundy',
      'ocean',
      'minimal-academic'
    ];
    for (const req of required) {
      expect(ids).toContain(req);
    }
  });

  it('each theme should have a valid name, description, and previewColor', () => {
    for (const theme of GLASS_THEMES) {
      expect(theme.name.length).toBeGreaterThan(0);
      expect(theme.description.length).toBeGreaterThan(0);
      expect(theme.previewColor.length).toBeGreaterThan(0);
    }
  });
});
