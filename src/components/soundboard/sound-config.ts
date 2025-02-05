export type SoundCategory = 'ambient' | 'monster' | 'effects' | 'music' | 'funny'

interface SoundConfig {
  id: string
  name: string
  file: string
  category: SoundCategory
  icon: string
  image?: string
  timestamps: {
    id: string
    start: number
    end: number | null
    label: string
  }[]
}

export const SOUNDS: SoundConfig[] = [
  {
    id: 'dragonvale-theme',
    name: 'Dragonvale Theme',
    file: '/sounds/dragonvale-theme.mp3',
    category: 'music',
    icon: '🎵',
    image: '/images/dragonvale.png',
    timestamps: [
      {
        id: 'dragonvale-theme-start',
        start: 0,
        end: 20,
        label: 'Dragonvale Theme'
      }
    ]
  },
  {
    id: 'magic-hour',
    name: 'Magic Hour',
    file: '/sounds/magic-hour.mp3',
    category: 'music',
    icon: '🌟',
    timestamps: [
      {
        id: 'magic-hour-full',
        start: 0,
        end: null,
        label: 'Magic Hour'
      }
    ]
  },
  {
    id: 'among-us',
    name: 'Among Us',
    file: '/sounds/among-us.mp3',
    category: 'funny',
    icon: '👾',
    image: '/images/among-us.png',
    timestamps: [
      {
        id: 'among-us-full',
        start: 0,
        end: null,
        label: 'Among Us'
      }
    ]
  },
  {
    id: 'sad-meow-song',
    name: 'Sad Meow Song',
    file: '/sounds/sad-meow-song.mp3',
    category: 'funny',
    icon: '😿',
    image: '/images/sad-cat.jpg',
    timestamps: [
      {
        id: 'sad-meow-song-full',
        start: 0,
        end: null,
        label: 'Sad Meow Song'
      }
    ]
  },
  {
    id: 'chill-guy',
    name: 'Chill Guy',
    file: '/sounds/chill-guy.mp3',
    category: 'funny',
    icon: '😎',
    image: '/images/chill-guy.jpg',
    timestamps: [
      {
        id: 'chill-guy-full',
        start: 0,
        end: null,
        label: 'Chill Guy'
      }
    ]
  },
  {
    id: 'monster-scream',
    name: 'Monster Scream',
    file: '/sounds/monster-scream.mp3',
    category: 'monster',
    icon: '👹',
    timestamps: [
      {
        id: 'monster-scream-full',
        start: 0,
        end: null,
        label: 'Monster Scream'
      }
    ]
  },
  {
    id: 'wendigo-long-roar',
    name: 'Wendigo Long Roar',
    file: '/sounds/wendigo-long-roar.mp3',
    category: 'monster',
    icon: '👻',
    image: '/images/wendigo-1.png',
    timestamps: [
      {
        id: 'wendigo-long-roar-full',
        start: 0,
        end: null,
        label: 'Wendigo Long Roar'
      }
    ]
  },
  {
    id: 'wendigo-metallic-screech',
    name: 'Wendigo Metallic Screech',
    file: '/sounds/wendigo-metallic-screech.mp3',
    category: 'monster',
    icon: '💀',
    image: '/images/wendigo-2.jpg',
    timestamps: [
      {
        id: 'wendigo-metallic-screech-full',
        start: 0,
        end: null,
        label: 'Wendigo Metallic Screech'
      }
    ]
  },
  {
    id: 'door-squeak',
    name: 'Door Squeak',
    file: '/sounds/door-squeak.mp3',
    category: 'effects',
    icon: '🚪',
    timestamps: [
      {
        id: 'door-squeak-full',
        start: 0,
        end: null,
        label: 'Door Squeak'
      }
    ]
  },
  {
    id: 'laser-beam',
    name: 'Laser Beam',
    file: '/sounds/laser-beam.mp3',
    category: 'effects',
    icon: '⚡',
    timestamps: [
      {
        id: 'laser-beam-full',
        start: 0,
        end: null,
        label: 'Laser Beam'
      }
    ]
  },
] as const

export type SoundId = typeof SOUNDS[number]['id']

export const CATEGORY_LABELS: Record<SoundCategory, string> = {
  ambient: '🌲',
  monster: '👹',
  effects: '🎭',
  music: '🎵',
  funny: '😄'
} 