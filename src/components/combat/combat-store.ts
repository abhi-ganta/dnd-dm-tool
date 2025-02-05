import { create } from 'zustand'
import { CombatParticipant, CombatState } from './combat-types'

interface CombatStore extends CombatState {
  addParticipant: (participant: CombatParticipant) => void
  removeParticipant: (id: string) => void
  updateParticipant: (id: string, updates: Partial<CombatParticipant>) => void
  sortByInitiative: () => void
  nextTurn: () => void
  startCombat: () => void
  endCombat: () => void
}

export const useCombatStore = create<CombatStore>((set) => ({
  participants: [],
  currentTurn: 0,
  round: 1,
  isActive: false,

  addParticipant: (participant) => {
    set((state) => ({
      participants: [...state.participants, participant]
    }))
  },

  removeParticipant: (id) => {
    set((state) => ({
      participants: state.participants.filter(p => p.id !== id)
    }))
  },

  updateParticipant: (id, updates) => {
    set((state) => ({
      participants: state.participants.map(p => 
        p.id === id ? { ...p, ...updates } : p
      )
    }))
  },

  sortByInitiative: () => {
    set((state) => ({
      participants: [...state.participants].sort((a, b) => b.initiative - a.initiative)
    }))
  },

  nextTurn: () => {
    set((state) => {
      const nextTurn = (state.currentTurn + 1) % state.participants.length
      return {
        currentTurn: nextTurn,
        round: nextTurn === 0 ? state.round + 1 : state.round
      }
    })
  },

  startCombat: () => {
    set((state) => {
      state.sortByInitiative()
      return {
        isActive: true,
        currentTurn: 0,
        round: 1
      }
    })
  },

  endCombat: () => {
    set({
      isActive: false,
      currentTurn: 0,
      round: 1,
      participants: []
    })
  }
})) 