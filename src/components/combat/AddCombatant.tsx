'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Character } from '../characters/character-config'
import { Monster } from '../monsters/monster-config'
import { useCombatStore } from './combat-store'
import { CombatParticipant } from './combat-types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCharacterStore } from '../characters/character-store'
import { useMonsterStore } from '../monsters/monster-store'

interface AddCombatantProps {
  existingCharacter?: Character | Monster
  type?: 'player' | 'npc' | 'monster'
}

export function AddCombatant({ existingCharacter, type }: AddCombatantProps) {
  const [initiative, setInitiative] = useState('')
  const [selectedId, setSelectedId] = useState<string>('')
  const addParticipant = useCombatStore(state => state.addParticipant)
  const characters = useCharacterStore(state => state.characters)
  const monsters = useMonsterStore(state => state.monsters)

  const availableEntities = existingCharacter ? [] : 
    type === 'monster' ? monsters :
    characters.filter(char => char.type === type)

  const handleAdd = () => {
    if (!initiative || isNaN(Number(initiative))) return

    const baseEntity = existingCharacter ?? 
      (selectedId ? (
        type === 'monster' 
          ? monsters.find(m => m.id === selectedId)
          : characters.find(c => c.id === selectedId)
      ) : null)

    if (!baseEntity) return

    const participant: CombatParticipant = {
      ...baseEntity,
      initiative: Number(initiative),
      isAlly: type === 'player',
      type: type ?? 'npc'
    }

    addParticipant(participant)
    setInitiative('')
    setSelectedId('')
  }

  return (
    <div className="flex gap-2 items-center">
      <Input
        type="number"
        placeholder="Initiative"
        value={initiative}
        onChange={(e) => setInitiative(e.target.value)}
        className="w-24"
      />
      {!existingCharacter && availableEntities.length > 0 && (
        <Select value={selectedId} onValueChange={setSelectedId}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={`Select ${type === 'player' ? 'Player' : type === 'monster' ? 'Monster' : 'NPC'}`} />
          </SelectTrigger>
          <SelectContent>
            {availableEntities.map(entity => (
              <SelectItem key={entity.id} value={entity.id}>
                {entity.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <Button onClick={handleAdd}>
        Add {existingCharacter ? existingCharacter.name : 
          (selectedId ? 'Selected' : type === 'monster' ? 'Monster' : type === 'player' ? 'Player' : 'NPC')}
      </Button>
    </div>
  )
} 