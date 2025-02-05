'use client'

import { CharacterCard } from './CharacterCard'
import { CharacterDialog } from './CharacterDialog'
import { useCharacterStore } from './character-store'
import type { Character } from './character-config'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export function CharacterSection() {
  const store = useCharacterStore()
  const characters = store.characters

  const handleSaveCharacter = (character: Character) => {
    if (characters.find(c => c.id === character.id)) {
      store.updateCharacter(character)
    } else {
      store.addCharacter(character)
    }
  }

  const players = characters.filter(char => char.type === 'player')
  const npcs = characters.filter(char => char.type === 'npc')

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Players</h2>
          <CharacterDialog type="player" onSave={handleSaveCharacter}>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Player
            </Button>
          </CharacterDialog>
        </div>
        <div className="grid gap-4">
          {players.map(character => (
            <div key={character.id} className="relative group">
              <CharacterCard character={character} onSave={handleSaveCharacter} />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">NPCs</h2>
          <CharacterDialog type="npc" onSave={handleSaveCharacter}>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add NPC
            </Button>
          </CharacterDialog>
        </div>
        <div className="grid gap-4">
          {npcs.map(character => (
            <div key={character.id} className="relative group">
              <CharacterCard character={character} onSave={handleSaveCharacter} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 