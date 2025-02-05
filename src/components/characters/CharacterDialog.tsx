'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Character, CharacterClass, CharacterRace } from './character-config'
import { Textarea } from '../ui/textarea'
import { Plus, Edit } from 'lucide-react'

interface CharacterDialogProps {
  character?: Character
  onSave: (character: Character) => void
  type: 'player' | 'npc' | 'monster'
  children?: React.ReactNode
}

export function CharacterDialog({ character, onSave, type, children }: CharacterDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<Partial<Character>>(
    character ?? {
      type,
      hp: { current: 10, max: 10 },
      stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 }
    }
  )

  const handleSave = () => {
    if (!formData.name || !formData.race || !formData.class) return

    onSave({
      id: character?.id ?? crypto.randomUUID(),
      name: formData.name,
      type: type,
      race: formData.race as CharacterRace,
      class: formData.class as CharacterClass,
      level: formData.level,
      ac: formData.ac,
      hp: formData.hp,
      stats: formData.stats,
      description: formData.description ?? '',
      notes: formData.notes ?? []
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant={character ? "ghost" : "default"} size="sm">
            {character ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4 mr-2" />}
            {character ? 'Edit' : `Add ${type === 'player' ? 'Player' : 'NPC'}`}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {character ? 'Edit' : 'Add'} {type === 'player' ? 'Player' : 'NPC'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <label>Name</label>
              <Input
                value={formData.name ?? ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <label>Race</label>
              <Select
                value={formData.race}
                onValueChange={(value) => setFormData({ ...formData, race: value as CharacterRace })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select race" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    'dragonborn',
                    'dwarf',
                    'elf',
                    'gnome',
                    'half-elf',
                    'halfling',
                    'half-orc',
                    'human',
                    'tiefling'
                  ].map((race) => (
                    <SelectItem key={race} value={race}>
                      {race}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label>Class</label>
              <Select
                value={formData.class}
                onValueChange={(value) => setFormData({ ...formData, class: value as CharacterClass })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    'barbarian',
                    'bard',
                    'cleric',
                    'druid',
                    'fighter',
                    'monk',
                    'paladin',
                    'ranger',
                    'rogue',
                    'sorcerer',
                    'warlock',
                    'wizard'
                  ].map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <label>Level</label>
              <Input
                type="number"
                value={formData.level ?? ''}
                onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
              />
            </div>
            <div className="grid gap-2">
              <label>AC</label>
              <Input
                type="number"
                value={formData.ac ?? ''}
                onChange={(e) => setFormData({ ...formData, ac: Number(e.target.value) })}
              />
            </div>
            <div className="grid gap-2">
              <label>HP</label>
              <Input
                type="number"
                value={formData.hp?.max ?? ''}
                onChange={(e) => setFormData({
                  ...formData,
                  hp: { current: Number(e.target.value), max: Number(e.target.value) }
                })}
              />
            </div>
          </div>
          <div className="grid gap-4">
            <h4 className="font-medium">Ability Scores</h4>
            <div className="grid grid-cols-6 gap-4">
              {['str', 'dex', 'con', 'int', 'wis', 'cha'].map((stat) => (
                <div key={stat} className="grid gap-2">
                  <label className="text-xs uppercase text-muted-foreground text-center">
                    {stat}
                  </label>
                  <Input
                    type="number"
                    value={formData.stats?.[stat as keyof typeof formData.stats] ?? ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      stats: {
                        str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10,
                        ...formData.stats,
                        [stat]: Number(e.target.value)
                      }
                    })}
                    className="text-center w-full"
                    min={1}
                    max={20}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label>Description</label>
              <Textarea
                value={formData.description ?? ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="h-32"
              />
            </div>
            <div className="grid gap-2">
              <label>Notes</label>
              <Textarea
                value={formData.notes?.join('\n') ?? ''}
                onChange={(e) => setFormData({
                  ...formData,
                  notes: e.target.value.split('\n')
                })}
                placeholder="Enter notes (one per line)"
                className="h-32 whitespace-pre-wrap"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 