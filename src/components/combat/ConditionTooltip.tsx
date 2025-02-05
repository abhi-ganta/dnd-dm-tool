'use client'

import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { CONDITIONS } from './combat-conditions'
import { CombatCondition } from './combat-types'

interface ConditionTooltipProps {
  condition: CombatCondition
  children: React.ReactNode
}

export function ConditionTooltip({ condition, children }: ConditionTooltipProps) {
  const conditionData = CONDITIONS[condition]

  return (
    <TooltipProvider>
      <TooltipRoot>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent 
          className="max-w-sm bg-slate-900 p-3 shadow-lg"
          side="top"
        >
          <div className="space-y-2 text-slate-50">
            <p className="font-medium">{conditionData.description}</p>
            <ul className="text-sm space-y-1 list-disc pl-4">
              {conditionData.effects.map((effect, i) => (
                <li key={i}>{effect}</li>
              ))}
            </ul>
          </div>
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  )
} 