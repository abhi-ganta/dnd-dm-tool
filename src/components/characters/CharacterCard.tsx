'use client'

import { useState } from 'react'
import { Character } from './character-config'
import { cn } from '@/lib/utils'
import { ChevronDown, Shield, Heart, Trash2, Edit } from 'lucide-react'
import { useCharacterStore } from './character-store'
import { Button } from '../ui/button'
import { CHARACTERS as defaultCharacters } from './character-config'
import { CharacterDialog } from './CharacterDialog'

interface CharacterCardProps {
  character: Character
  onSave: (character: Character) => void
}

// Add utility function for modifier calculation
function getModifier(score: number) {
  const modifier = Math.floor((score - 10) / 2)
  return modifier >= 0 ? `+${modifier}` : modifier.toString()
}

export function CharacterCard({ character, onSave }: CharacterCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const removeCharacter = useCharacterStore(state => state.removeCharacter)
  const isCustomCharacter = !defaultCharacters.find(c => c.id === character.id)

  return (
    <div className="group bg-card border border-border/50 rounded-lg overflow-hidden shadow-lg">
      <div className="p-4 relative">
        {/* Card Content */}
        <div 
          className="cursor-pointer hover:bg-accent/50 transition-colors rounded-md"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-lg">{character.name}</h3>
              <span className="px-2 py-1 rounded-full bg-secondary text-xs">
                {character.type === 'player' ? '👤 Player' : '🎭 NPC'}
              </span>
            </div>
            <ChevronDown
              className={cn(
                'w-5 h-5 transition-transform duration-200',
                isExpanded && 'transform rotate-180'
              )}
            />
          </div>
          <div className="flex gap-2 mt-2 text-sm text-muted-foreground">
            <span>{character.race}</span>
            <span>•</span>
            <span>{character.class}</span>
            {character.level && (
              <>
                <span>•</span>
                <span>Level {character.level}</span>
              </>
            )}
          </div>
        </div>

        {/* Action buttons - moved to bottom right */}
        <div className="absolute bottom-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <CharacterDialog
            character={character}
            type={character.type}
            onSave={onSave}
          >
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Edit className="h-4 w-4" />
            </Button>
          </CharacterDialog>
          {isCustomCharacter && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation()
                removeCharacter(character.id)
              }}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          )}
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4 border-t border-border/50 space-y-4">
          {/* Stats Row */}
          {character.stats && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm">AC: {character.ac}</span>
              </div>
              {character.hp && (
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-destructive" />
                  <span className="text-sm">
                    HP: {character.hp.current}/{character.hp.max}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Ability Scores */}
          {character.stats && (
            <div className="grid grid-cols-6 gap-4">
              {Object.entries(character.stats).map(([stat, value]) => (
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
          )}

          {/* Description */}
          <div className="space-y-2">
            <h4 className="font-semibold">Description</h4>
            <p className="text-sm text-muted-foreground">{character.description}</p>
          </div>

          {/* Notes */}
          {character.notes && character.notes.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold">Notes</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {character.notes.map((note, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 