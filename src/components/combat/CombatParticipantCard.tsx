'use client'

import { Button } from '@/components/ui/button'
import { Shield, Sword } from 'lucide-react'
import { CombatParticipant, CombatCondition } from './combat-types'
import { CONDITIONS, CONDITION_COLORS } from './combat-conditions'
import { cn } from '@/lib/utils'
import { PopoverRoot, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { ConditionTooltip } from './ConditionTooltip'

interface CombatParticipantCardProps {
  participant: CombatParticipant
  isActive: boolean
  isCurrent: boolean
  onRemove: (id: string) => void
  onToggleCondition: (id: string, condition: CombatCondition) => void
}

export function CombatParticipantCard({
  participant,
  isActive,
  isCurrent,
  onRemove,
  onToggleCondition
}: CombatParticipantCardProps) {
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
          <PopoverRoot>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                Conditions
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-slate-900 p-4">
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(CONDITIONS).map((condition) => (
                  <Button
                    key={condition}
                    variant={participant.conditions?.includes(condition as CombatCondition) ? "secondary" : "outline"}
                    size="sm"
                    className="text-slate-50 hover:text-slate-50"
                    onClick={() => onToggleCondition(participant.id, condition as CombatCondition)}
                  >
                    {condition}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </PopoverRoot>
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