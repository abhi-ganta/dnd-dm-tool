'use client'

import { useState } from 'react'
import { Monster } from './monster-config'
import { cn } from '@/lib/utils'
import { ChevronDown, Shield, Heart, Trash2 } from 'lucide-react'
import { useMonsterStore } from './monster-store'
import { Button } from '../ui/button'
import { MONSTER_SIZE_LABELS, MONSTER_TYPE_LABELS } from './monster-config'
import { MonsterDialog } from './MonsterDialog'

interface MonsterCardProps {
  monster: Monster
  onSave: (monster: Monster) => void
}

export function MonsterCard({ monster, onSave }: MonsterCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const removeMonster = useMonsterStore(state => state.removeMonster)

  const getModifier = (score: number) => {
    const modifier = Math.floor((score - 10) / 2)
    return modifier >= 0 ? `+${modifier}` : modifier.toString()
  }

  return (
    <div className="group bg-card border border-border/50 rounded-lg overflow-hidden shadow-lg">
      <div className="p-4 relative">
        {/* Header */}
        <div 
          className="cursor-pointer hover:bg-accent/50 transition-colors rounded-md"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-lg">{monster.name}</h3>
              <div className="flex gap-2">
                <span className="px-2 py-1 rounded-full bg-secondary text-xs">
                  {MONSTER_SIZE_LABELS[monster.size]}
                </span>
                <span className="px-2 py-1 rounded-full bg-secondary text-xs">
                  {MONSTER_TYPE_LABELS[monster.type]}
                </span>
              </div>
            </div>
            <ChevronDown
              className={cn(
                'w-5 h-5 transition-transform duration-200',
                isExpanded && 'transform rotate-180'
              )}
            />
          </div>
          
          <div className="flex gap-2 mt-2 text-sm text-muted-foreground">
            <span>CR {monster.challenge.rating}</span>
            <span>•</span>
            <span>{monster.alignment}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="absolute bottom-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <MonsterDialog
            monster={monster}
            onSave={onSave}
          >
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Shield className="h-4 w-4" />
            </Button>
          </MonsterDialog>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation()
              removeMonster(monster.id)
            }}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4 border-t border-border/50 space-y-4">
          {/* Core Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm">AC: {monster.ac}</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-destructive" />
              <span className="text-sm">
                HP: {monster.hp.current} / {monster.hp.max}
              </span>
            </div>
          </div>

          {/* Speed */}
          <div className="space-y-1">
            <h4 className="font-semibold text-sm">Speed</h4>
            <div className="flex flex-wrap gap-2 text-sm">
              {Object.entries(monster.speed).map(([type, speed]) => (
                <span key={type} className="text-muted-foreground">
                  {type}: {speed}ft.
                </span>
              ))}
            </div>
          </div>

          {/* Ability Scores */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {Object.entries(monster.stats).map(([stat, value]) => (
              <div
                key={stat}
                className="bg-secondary/50 p-2 rounded-lg text-center"
              >
                <div className="text-xs uppercase text-muted-foreground">
                  {stat}
                </div>
                <div className="font-semibold">
                  {value} ({getModifier(value)})
                </div>
              </div>
            ))}
          </div>

          {/* Skills & Abilities */}
          {monster.skills && (
            <div className="space-y-1">
              <h4 className="font-semibold text-sm">Skills</h4>
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                {Object.entries(monster.skills).map(([skill, bonus]) => (
                  <span key={skill}>
                    {skill}: +{bonus}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Traits */}
          {monster.traits && monster.traits.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Traits</h4>
              <div className="space-y-2">
                {monster.traits.map((trait, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-medium">{trait.name}.</span>{' '}
                    <span className="text-muted-foreground">{trait.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          {monster.actions && monster.actions.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Actions</h4>
              <div className="space-y-2">
                {monster.actions.map((action, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-medium">{action.name}.</span>{' '}
                    <span className="text-muted-foreground">{action.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legendary Actions */}
          {monster.legendaryActions && monster.legendaryActions.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Legendary Actions</h4>
              <div className="space-y-2">
                {monster.legendaryActions.map((action, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-medium">{action.name}.</span>{' '}
                    <span className="text-muted-foreground">{action.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 