export type CharacterClass = 
  | 'barbarian'
  | 'bard'
  | 'cleric'
  | 'druid'
  | 'fighter'
  | 'monk'
  | 'paladin'
  | 'ranger'
  | 'rogue'
  | 'sorcerer'
  | 'warlock'
  | 'wizard'

export type CharacterRace = 
  | 'dragonborn'
  | 'dwarf'
  | 'elf'
  | 'gnome'
  | 'half-elf'
  | 'halfling'
  | 'half-orc'
  | 'human'
  | 'tiefling'

export interface Character {
  id: string
  name: string
  type: 'player' | 'npc' | 'monster'
  race: CharacterRace
  class: CharacterClass
  level?: number
  ac?: number
  hp?: {
    current: number
    max: number
  }
  stats?: {
    str: number
    dex: number
    con: number
    int: number
    wis: number
    cha: number
  }
  description: string
  notes?: string[]
  imageUrl?: string
}

export const CHARACTERS: Character[] = [
  {
    id: 'eldrin',
    name: 'Weldrin Moonshadow',
    type: 'player',
    race: 'elf',
    class: 'wizard',
    level: 1,
    ac: 13,
    hp: {
      current: 28,
      max: 28
    },
    stats: {
      str: 8,
      dex: 14,
      con: 12,
      int: 18,
      wis: 13,
      cha: 10
    },
    description: 'A studious high elf wizard from the Moonweave Academy',
    notes: [
      'Searching for rare arcane artifacts',
      'Has a familiar named Pip (owl)',
      'Afraid of the dark ironically'
    ]
  },
  {
    id: 'default-guy',
    name: 'Default Guy',
    type: 'npc',
    race: 'tiefling',
    class: 'sorcerer',
    level: 1,
    ac: 13,
    hp: {
      current: 28,
      max: 28
    },
    stats: {
      str: 8,
      dex: 14,
      con: 12,
      int: 18,
      wis: 13,
      cha: 10
    },
    description: 'A default guy',
    notes: [
      'Default guy',
      'Default guy',
      'Default guy'
    ]
  },
] 