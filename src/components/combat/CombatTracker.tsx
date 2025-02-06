'use client'

import { Button } from '@/components/ui/button'
import { useCombatStore } from './combat-store'
import { AddCombatant } from './AddCombatant'
import { Play, RotateCcw } from 'lucide-react'
import { CombatParticipantCard } from './CombatParticipantCard'
import { CombatCondition } from './combat-types'

export function CombatTracker() {
  const {
    participants,
    currentTurn,
    round,
    isActive,
    startCombat,
    endCombat,
    nextTurn,
    removeParticipant,
    updateParticipant
  } = useCombatStore()

  const handleToggleCondition = (id: string, condition: CombatCondition) => {
    const participant = participants.find(p => p.id === id)
    if (!participant) return

    const conditions = participant.conditions || []
    const newConditions = conditions.includes(condition)
      ? conditions.filter(c => c !== condition)
      : [...conditions, condition]

    updateParticipant(id, { conditions: newConditions })
  }

  const handleUpdateHealth = (id: string, change: number) => {
    const participant = participants.find(p => p.id === id)
    if (!participant) return

    const newHp = Math.max(0, Math.min(participant.maxHp, participant.currentHp + change))
    
    // Handle unconscious condition
    const conditions = participant.conditions || []
    let newConditions = [...conditions]
    
    if (newHp === 0 && !conditions.includes('unconscious')) {
      newConditions.push('unconscious')
    } else if (newHp > 0 && conditions.includes('unconscious')) {
      newConditions = newConditions.filter(c => c !== 'unconscious')
    }

    updateParticipant(id, { 
      currentHp: newHp,
      conditions: newConditions
    })
  }

  return (
    <div className="space-y-6 bg-card border border-border/50 rounded-lg p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Combat Tracker</h2>
        {isActive ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Round {round}</span>
            <Button onClick={endCombat} variant="destructive" size="sm">
              End Combat
            </Button>
          </div>
        ) : (
          <Button onClick={startCombat} size="sm">
            <Play className="w-4 h-4 mr-2" />
            Start Combat
          </Button>
        )}
      </div>

      {/* Add Combatants */}
      {!isActive && (
        <div className="grid gap-6">
          {/* Add Players */}
          <div className="space-y-4">
            <h3 className="font-semibold">Add Players</h3>
            <div className="grid gap-2">
              <AddCombatant type="player" />
            </div>
          </div>

          {/* Add NPCs */}
          <div className="space-y-4">
            <h3 className="font-semibold">Add NPCs</h3>
            <AddCombatant type="npc" />
          </div>

          {/* Add Monsters */}
          <div className="space-y-4">
            <h3 className="font-semibold">Add Monsters</h3>
            <AddCombatant type="monster" />
          </div>
        </div>
      )}

      {/* Initiative Order */}
      <div className="space-y-4">
        <h3 className="font-semibold">Initiative Order</h3>
        <div className="grid gap-2">
          {participants.map((participant, index) => (
            <CombatParticipantCard
              key={participant.id}
              participant={participant}
              isActive={isActive}
              isCurrent={index === currentTurn}
              onRemove={removeParticipant}
              onToggleCondition={handleToggleCondition}
              onUpdateHealth={handleUpdateHealth}
            />
          ))}
        </div>
      </div>

      {/* Next Turn Button */}
      {isActive && participants.length > 0 && (
        <Button onClick={nextTurn} className="w-full">
          <RotateCcw className="w-4 h-4 mr-2" />
          Next Turn
        </Button>
      )}
    </div>
  )
} 