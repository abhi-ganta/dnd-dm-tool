export type MonsterSize = 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'gargantuan'
export type MonsterType = 'aberration' | 'beast' | 'celestial' | 'construct' | 'dragon' | 'elemental' | 'fey' | 'fiend' | 'giant' | 'humanoid' | 'monstrosity' | 'ooze' | 'plant' | 'undead'
export type MonsterAlignment = 'lawful good' | 'neutral good' | 'chaotic good' | 'lawful neutral' | 'neutral' | 'chaotic neutral' | 'lawful evil' | 'neutral evil' | 'chaotic evil' | 'unaligned'

export interface Monster {
  id: string
  name: string
  size: MonsterSize
  type: MonsterType
  alignment: MonsterAlignment
  ac: number
  hp: {
    current: number
    max: number
  }
  speed: {
    walk?: number
    fly?: number
    swim?: number
    climb?: number
    burrow?: number
  }
  stats: {
    str: number
    dex: number
    con: number
    int: number
    wis: number
    cha: number
  }
  savingThrows?: {
    str?: number
    dex?: number
    con?: number
    int?: number
    wis?: number
    cha?: number
  }
  skills?: Record<string, number>
  vulnerabilities?: string[]
  resistances?: string[]
  immunities?: string[]
  senses?: {
    darkvision?: number
    blindsight?: number
    tremorsense?: number
    truesight?: number
    passivePerception: number
  }
  languages: string[]
  challenge: {
    rating: number
    xp: number
  }
  traits?: {
    name: string
    description: string
  }[]
  actions?: {
    name: string
    description: string
  }[]
  legendaryActions?: {
    name: string
    description: string
  }[]
  description: string
  imageUrl?: string
}

// We'll start with a few example monsters - you can add more from the website
export const MONSTERS: Monster[] = [
  {
    id: 'ancient-red-dragon',
    name: 'Ancient Red Dragon',
    size: 'gargantuan',
    type: 'dragon',
    alignment: 'chaotic evil',
    ac: 22,
    hp: {
      current: 546,
      max: 546
    },
    speed: {
      walk: 40,
      climb: 40,
      fly: 80
    },
    stats: {
      str: 30,
      dex: 10,
      con: 29,
      int: 18,
      wis: 15,
      cha: 23
    },
    savingThrows: {
      dex: 7,
      con: 16,
      wis: 9,
      cha: 13
    },
    skills: {
      perception: 16,
      stealth: 7
    },
    immunities: ['fire'],
    senses: {
      blindsight: 60,
      darkvision: 120,
      passivePerception: 26
    },
    languages: ['Common', 'Draconic'],
    challenge: {
      rating: 24,
      xp: 62000
    },
    description: 'The most powerful of the chromatic dragons, red dragons are also the most fearsome and cruel.',
    traits: [
      {
        name: 'Legendary Resistance (3/Day)',
        description: 'If the dragon fails a saving throw, it can choose to succeed instead.'
      }
    ],
    actions: [
      {
        name: 'Multiattack',
        description: 'The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.'
      },
      {
        name: 'Fire Breath (Recharge 5-6)',
        description: 'The dragon exhales fire in a 90-foot cone. Each creature in that area must make a DC 24 Dexterity saving throw, taking 91 (26d6) fire damage on a failed save, or half as much damage on a successful one.'
      }
    ]
  }
]

export const MONSTER_SIZE_LABELS: Record<MonsterSize, string> = {
  tiny: '🐁 Tiny',
  small: '🐈 Small',
  medium: '🧑 Medium',
  large: '🐎 Large',
  huge: '🐘 Huge',
  gargantuan: '🐋 Gargantuan'
}

export const MONSTER_TYPE_LABELS: Record<MonsterType, string> = {
  aberration: '👾 Aberration',
  beast: '🦁 Beast',
  celestial: '👼 Celestial',
  construct: '🤖 Construct',
  dragon: '🐲 Dragon',
  elemental: '🌪️ Elemental',
  fey: '🧚 Fey',
  fiend: '👿 Fiend',
  giant: '🗿 Giant',
  humanoid: '👤 Humanoid',
  monstrosity: '🦕 Monstrosity',
  ooze: '🫧 Ooze',
  plant: '🌿 Plant',
  undead: '💀 Undead'
} 