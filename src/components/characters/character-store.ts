import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Character } from './character-config'
import { CHARACTERS as defaultCharacters } from './character-config'

interface CharacterStore {
  characters: Character[]
  addCharacter: (character: Character) => void
  updateCharacter: (character: Character) => void
  removeCharacter: (id: string) => void
}

export const useCharacterStore = create<CharacterStore>()(
  persist(
    (set) => ({
      characters: defaultCharacters,
      
      addCharacter: (character) => set((state) => ({
        characters: [...state.characters, character]
      })),
      
      updateCharacter: (character) => set((state) => ({
        characters: state.characters.map((c) => 
          c.id === character.id ? character : c
        )
      })),
      
      removeCharacter: (id) => set((state) => ({
        characters: state.characters.filter((c) => c.id !== id)
      }))
    }),
    {
      name: 'character-storage'
    }
  )
) 