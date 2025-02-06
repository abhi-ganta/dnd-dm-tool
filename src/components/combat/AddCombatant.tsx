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
  type: 'player' | 'npc' | 'monster'
}

type Entity = Character | Monster

export function AddCombatant({ existingCharacter, type }: AddCombatantProps) {
  const [name, setName] = useState('')
  const [initiative, setInitiative] = useState('')
  const [maxHp, setMaxHp] = useState('')
  const addParticipant = useCombatStore(state => state.addParticipant)
  const characters = useCharacterStore(state => state.characters)
  const monsters = useMonsterStore(state => state.monsters)

  const availableEntities: Entity[] = existingCharacter ? [] : 
    type === 'monster' ? monsters :
    characters.filter(char => char.type === type)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !initiative || !maxHp) return

    addParticipant({
      id: crypto.randomUUID(),
      name,
      initiative: parseInt(initiative),
      type,
      conditions: [],
      maxHp: parseInt(maxHp),
      currentHp: parseInt(maxHp),
      isAlly: type === 'player'
    })

    setName('')
    setInitiative('')
    setMaxHp('')
  }

  const handleEntitySelect = (entityId: string) => {
    const entity = availableEntities.find(e => e.id === entityId)
    if (entity) {
      setName(entity.name)
      // Optionally set other fields if they exist on the entity
      if ('maxHp' in entity) {
        setMaxHp(String(entity.maxHp))
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1"
      />
      {!existingCharacter && availableEntities.length > 0 && (
        <Select onValueChange={handleEntitySelect}>
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
      <Input
        type="number"
        placeholder="Initiative"
        value={initiative}
        onChange={(e) => setInitiative(e.target.value)}
        className="w-24"
      />
      <Input
        type="number"
        placeholder="Max HP"
        value={maxHp}
        onChange={(e) => setMaxHp(e.target.value)}
        className="w-24"
      />
      <Button type="submit">Add</Button>
    </form>
  )
} 