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
] 