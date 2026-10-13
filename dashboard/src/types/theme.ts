export type GlassTheme =
  | 'light-liquid'
  | 'dark-liquid'
  | 'iridescent'
  | 'frosted'
  | 'crystal'
  | 'aurora'
  | 'soft-pastel'
  | 'burgundy'
  | 'ocean'
  | 'minimal-academic';

export type AppearanceMode = 'light' | 'dark';

export interface ThemeConfig {
  id: GlassTheme;
  name: string;
  description: string;
  previewColor: string;
  badge: string;
}

export const GLASS_THEMES: ThemeConfig[] = [
  {
    id: 'light-liquid',
    name: 'Light Liquid Glass',
    description: 'High-clarity fluid glass with soft specular highlights and clean refraction',
    previewColor: 'from-blue-100/80 to-slate-100/90',
    badge: 'Standard'
  },
  {
    id: 'dark-liquid',
    name: 'Dark Liquid Glass',
    description: 'Deep obsidian glass with luminous cyan and violet edge reflections',
    previewColor: 'from-slate-900 to-indigo-950',
    badge: 'High Contrast'
  },
  {
    id: 'iridescent',
    name: 'Iridescent Glass',
    description: 'Prismatic chromatic sheen that shifts softly with light refraction',
    previewColor: 'from-purple-300/60 via-pink-300/50 to-amber-200/50',
    badge: 'Prismatic'
  },
  {
    id: 'frosted',
    name: 'Frosted Glass',
    description: 'Silky tactile matte diffusion with subtle velvet ambient blur',
    previewColor: 'from-slate-200/70 to-zinc-300/60',
    badge: 'Diffusion'
  },
  {
    id: 'crystal',
    name: 'Crystal Glass',
    description: 'Ultra-clear gem facets with sharp diamond specular edge glints',
    previewColor: 'from-sky-200/70 via-cyan-100/60 to-white/90',
    badge: 'Crystalline'
  },
  {
    id: 'aurora',
    name: 'Aurora Glass',
    description: 'Ethereal northern lights gradient reflections with teal and emerald glows',
    previewColor: 'from-emerald-300/60 via-teal-400/50 to-indigo-400/60',
    badge: 'Luminous'
  },
  {
    id: 'soft-pastel',
    name: 'Soft Pastel Glass',
    description: 'Gentle peach, lavender and mint hues with comfortable academic warmth',
    previewColor: 'from-rose-100/80 via-purple-100/70 to-teal-100/70',
    badge: 'Calm & Warm'
  },
  {
    id: 'burgundy',
    name: 'Burgundy Glass',
    description: 'Regal wine and crimson undertones with warm bronze micro-accents',
    previewColor: 'from-red-950 via-rose-950 to-stone-900',
    badge: 'Executive'
  },
  {
    id: 'ocean',
    name: 'Ocean Glass',
    description: 'Deep maritime azure with aquatic bioluminescent cyan highlights',
    previewColor: 'from-cyan-900 via-blue-950 to-teal-950',
    badge: 'Aquatic'
  },
  {
    id: 'minimal-academic',
    name: 'Minimal Academic Glass',
    description: 'Precision slate and neutral monochrome for distraction-free study',
    previewColor: 'from-slate-100 to-gray-200',
    badge: 'Paper Focus'
  }
];
