import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Monster } from './monster-config'
import { MONSTERS as defaultMonsters } from './monster-config'

interface MonsterStore {
  monsters: Monster[]
  addMonster: (monster: Monster) => void
  updateMonster: (monster: Monster) => void
  removeMonster: (id: string) => void
}

export const useMonsterStore = create<MonsterStore>()(
  persist(
    (set) => ({
      monsters: defaultMonsters,
      
      addMonster: (monster) => set((state) => ({
        monsters: [...state.monsters, monster]
      })),
      
      updateMonster: (monster) => set((state) => ({
        monsters: state.monsters.map((m) => 
          m.id === monster.id ? monster : m
        )
      })),
      
      removeMonster: (id) => set((state) => ({
        monsters: state.monsters.filter((m) => m.id !== id)
      }))
    }),
    {
      name: 'monster-storage'
    }
  )
) 