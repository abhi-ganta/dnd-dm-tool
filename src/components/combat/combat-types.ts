export type CombatParticipant = {
  id: string
  name: string
  type: 'player' | 'npc' | 'monster'
  initiative: number
  temporaryHP?: number
  conditions?: CombatCondition[]
  isAlly: boolean
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
}

export type CombatCondition = 
  | 'blinded'
  | 'charmed'
  | 'deafened'
  | 'frightened'
  | 'grappled'
  | 'incapacitated'
  | 'invisible'
  | 'paralyzed'
  | 'petrified'
  | 'poisoned'
  | 'prone'
  | 'restrained'
  | 'stunned'
  | 'unconscious'

export interface CombatState {
  participants: CombatParticipant[]
  currentTurn: number
  round: number
  isActive: boolean
} 