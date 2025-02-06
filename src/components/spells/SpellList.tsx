'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { spells, searchSpells, Spell } from './spells-config'

// Get unique schools from spells
const schools = Array.from(new Set(spells.map(spell => spell.school)))
const levels = Array.from(new Set(spells.map(spell => spell.level))).sort((a, b) => a - b)

export function SpellList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLevels, setSelectedLevels] = useState<number[]>([])
  const [selectedSchools, setSelectedSchools] = useState<string[]>([])
  const [showConcentration, setShowConcentration] = useState(false)
  const [showRitual, setShowRitual] = useState(false)

  const filteredSpells = spells
    .filter(spell => {
      if (searchQuery) {
        const searchResult = searchSpells(searchQuery)
        if (!searchResult.includes(spell)) return false
      }
      if (selectedLevels.length && !selectedLevels.includes(spell.level)) return false
      if (selectedSchools.length && !selectedSchools.includes(spell.school)) return false
      if (showConcentration && !spell.concentration) return false
      if (showRitual && !spell.ritual) return false
      return true
    })

  return (
    <div className="space-y-4">
      <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 pb-4 space-y-4">
        <Input
          placeholder="Search spells by name, school, level..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-2xl"
        />
        
        <div className="flex flex-wrap gap-4">
          <div className="space-y-2">
            <div className="font-medium">Level</div>
            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <Badge
                  key={level}
                  variant={selectedLevels.includes(level) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedLevels(prev =>
                      prev.includes(level)
                        ? prev.filter(l => l !== level)
                        : [...prev, level]
                    )
                  }}
                >
                  {level === 0 ? 'Cantrip' : level}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-medium">School</div>
            <div className="flex flex-wrap gap-2">
              {schools.map((school) => (
                <Badge
                  key={school}
                  variant={selectedSchools.includes(school) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedSchools(prev =>
                      prev.includes(school)
                        ? prev.filter(s => s !== school)
                        : [...prev, school]
                    )
                  }}
                >
                  {school}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-medium">Properties</div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={showConcentration}
                  onCheckedChange={(checked) => setShowConcentration(!!checked)}
                />
                Concentration
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={showRitual}
                  onCheckedChange={(checked) => setShowRitual(!!checked)}
                />
                Ritual
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredSpells.map((spell) => (
          <SpellCard key={spell.name} spell={spell} />
        ))}
      </div>
    </div>
  )
}

function SpellCard({ spell }: { spell: Spell }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold">{spell.name}</h3>
          <div className="flex gap-1">
            {spell.concentration && (
              <Badge variant="secondary">Concentration</Badge>
            )}
            {spell.ritual && (
              <Badge variant="outline">Ritual</Badge>
            )}
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`} • {spell.school}
        </div>
      </CardHeader>
      <CardContent className="text-sm space-y-2">
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <div><strong>Casting Time:</strong> {spell.castingTime}</div>
          <div><strong>Range:</strong> {spell.range}</div>
          <div><strong>Components:</strong> {spell.components.join(', ')}</div>
        </div>
        <p className="text-sm">{spell.description}</p>
        <div className="text-xs text-muted-foreground">
          Source: {spell.source}
        </div>
      </CardContent>
    </Card>
  )
} 