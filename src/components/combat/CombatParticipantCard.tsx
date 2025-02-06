'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { MinusCircle, PlusCircle, Shield, Sword } from 'lucide-react'
import { CombatParticipant, CombatCondition } from './combat-types'
import { CONDITIONS, CONDITION_COLORS } from './combat-conditions'
import { cn } from '@/lib/utils'
import { PopoverRoot, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { ConditionTooltip } from './ConditionTooltip'
import { useState } from 'react'

interface CombatParticipantCardProps {
  participant: CombatParticipant
  isActive: boolean
  isCurrent: boolean
  onRemove: (id: string) => void
  onToggleCondition: (id: string, condition: CombatCondition) => void
  onUpdateHealth: (id: string, change: number) => void
}

export function CombatParticipantCard({
  participant,
  isActive,
  isCurrent,
  onRemove,
  onToggleCondition,
  onUpdateHealth
}: CombatParticipantCardProps) {
  const [healthChange, setHealthChange] = useState('')
  const healthPercentage = (participant.currentHp / participant.maxHp) * 100

  const handleHealthChange = (modifier: number) => {
    const change = parseInt(healthChange) || 0
    if (change > 0) {
      onUpdateHealth(participant.id, change * modifier)
      setHealthChange('')
    }
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 rounded-lg border",
        isCurrent && isActive
          ? "bg-accent border-primary"
          : "border-border/50"
      )}
    >
      <div className="flex items-center gap-3">
        {participant.isAlly ? (
          <Shield className="w-4 h-4 text-primary" />
        ) : (
          <Sword className="w-4 h-4 text-destructive" />
        )}
        <div className="flex flex-col">
          <span className="font-medium">{participant.name}</span>
          <div className="flex gap-1">
            <span className="text-sm text-muted-foreground">
              Initiative: {participant.initiative}
            </span>
            {participant.conditions && participant.conditions.length > 0 && (
              <>
                <span className="text-sm text-muted-foreground">•</span>
                <div className="flex gap-1">
                  {participant.conditions.map(condition => (
                    <ConditionTooltip key={condition} condition={condition}>
                      <span className={cn(
                        "text-sm cursor-help",
                        CONDITION_COLORS[condition]
                      )}>
                        {condition}
                      </span>
                    </ConditionTooltip>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isActive && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Progress value={healthPercentage} className="flex-1" />
              <span className="text-sm whitespace-nowrap">
                {participant.currentHp}/{participant.maxHp} HP
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => handleHealthChange(-1)}
              >
                <MinusCircle className="h-4 w-4" />
              </Button>
              
              <Input
                type="number"
                value={healthChange}
                onChange={(e) => setHealthChange(e.target.value)}
                className="w-20"
                placeholder="HP"
              />
              
              <Button
                size="icon"
                variant="outline"
                onClick={() => handleHealthChange(1)}
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>

            <PopoverRoot>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  Conditions
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(CONDITIONS).map((condition) => (
                    <Button
                      key={condition}
                      variant={participant.conditions?.includes(condition as CombatCondition) ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => onToggleCondition(participant.id, condition as CombatCondition)}
                      disabled={condition === 'unconscious' && participant.currentHp === 0}
                    >
                      {condition}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </PopoverRoot>
          </div>
        )}
        {!isActive && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(participant.id)}
          >
            Remove
          </Button>
        )}
      </div>
    </div>
  )
} 