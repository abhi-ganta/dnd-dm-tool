'use client'

import { MonsterCard } from './MonsterCard'
import { MonsterDialog } from './MonsterDialog'
import { useMonsterStore } from './monster-store'
import type { Monster, MonsterType } from './monster-config'
import { Button } from '@/components/ui/button'
import { Plus, Search } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MONSTER_TYPE_LABELS } from './monster-config'

export function MonsterSection() {
  const store = useMonsterStore()
  const monsters = store.monsters
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<MonsterType | 'all'>('all')
  const [selectedCR, setSelectedCR] = useState<string>('all')

  const handleSaveMonster = (monster: Monster) => {
    if (monsters.find(m => m.id === monster.id)) {
      store.updateMonster(monster)
    } else {
      store.addMonster(monster)
    }
  }

  const challengeRatings = Array.from(new Set(monsters.map(m => m.challenge.rating)))
    .sort((a, b) => a - b)

  const filteredMonsters = monsters.filter(monster => {
    const matchesSearch = monster.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || monster.type === selectedType
    const matchesCR = selectedCR === 'all' || monster.challenge.rating === Number(selectedCR)
    return matchesSearch && matchesType && matchesCR
  })

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Monsters</h2>
          <MonsterDialog onSave={handleSaveMonster}>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Monster
            </Button>
          </MonsterDialog>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search monsters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <Select
            value={selectedType}
            onValueChange={(value) => setSelectedType(value as MonsterType | 'all')}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {Object.entries(MONSTER_TYPE_LABELS).map(([type, label]) => (
                <SelectItem key={type} value={type}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedCR}
            onValueChange={setSelectedCR}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by CR" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All CRs</SelectItem>
              {challengeRatings.map(cr => (
                <SelectItem key={cr} value={cr.toString()}>
                  CR {cr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Monster Grid */}
      <div className="grid gap-4">
        {filteredMonsters.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No monsters found matching your criteria
          </div>
        ) : (
          filteredMonsters.map(monster => (
            <div key={monster.id} className="relative group">
              <MonsterCard monster={monster} onSave={handleSaveMonster} />
            </div>
          ))
        )}
      </div>
    </div>
  )
} 