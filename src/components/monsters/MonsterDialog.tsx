'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Monster, MonsterSize, MonsterType, MonsterAlignment } from './monster-config'
import { Textarea } from '../ui/textarea'

interface MonsterDialogProps {
  monster?: Monster
  onSave: (monster: Monster) => void
  children?: React.ReactNode
}

export function MonsterDialog({ monster, onSave, children }: MonsterDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<Partial<Monster>>(
    monster ?? {
      stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
      hp: { current: 10, max: 10 },
      speed: { walk: 30 }
    }
  )

  const handleSave = () => {
    if (!formData.name || !formData.size || !formData.type) return

    onSave({
      id: monster?.id ?? crypto.randomUUID(),
      name: formData.name,
      size: formData.size as MonsterSize,
      type: formData.type as MonsterType,
      alignment: formData.alignment as MonsterAlignment,
      ac: formData.ac ?? 10,
      hp: formData.hp ?? { current: 10, max: 10 },
      speed: formData.speed ?? { walk: 30 },
      stats: formData.stats ?? { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
      languages: formData.languages ?? ['Common'],
      challenge: formData.challenge ?? { rating: 0, xp: 10 },
      description: formData.description ?? '',
      traits: formData.traits ?? [],
      actions: formData.actions ?? [],
      skills: formData.skills ?? {},
      senses: formData.senses ?? { passivePerception: 10 }
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {monster ? 'Edit' : 'Add'} Monster
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label>Name</label>
              <Input
                value={formData.name ?? ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <label>Size</label>
              <Select
                value={formData.size}
                onValueChange={(value) => setFormData({ ...formData, size: value as MonsterSize })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {['tiny', 'small', 'medium', 'large', 'huge', 'gargantuan'].map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Type and Alignment */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label>Type</label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value as MonsterType })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    'aberration', 'beast', 'celestial', 'construct', 'dragon',
                    'elemental', 'fey', 'fiend', 'giant', 'humanoid',
                    'monstrosity', 'ooze', 'plant', 'undead'
                  ].map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label>Alignment</label>
              <Select
                value={formData.alignment}
                onValueChange={(value) => setFormData({ ...formData, alignment: value as MonsterAlignment })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select alignment" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    'lawful good', 'neutral good', 'chaotic good',
                    'lawful neutral', 'neutral', 'chaotic neutral',
                    'lawful evil', 'neutral evil', 'chaotic evil',
                    'unaligned'
                  ].map((alignment) => (
                    <SelectItem key={alignment} value={alignment}>
                      {alignment}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-4">
            <h4 className="font-medium">Core Stats</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <label>Armor Class</label>
                <Input
                  type="number"
                  value={formData.ac ?? ''}
                  onChange={(e) => setFormData({ ...formData, ac: Number(e.target.value) })}
                />
              </div>
              <div className="grid gap-2">
                <label>HP Average</label>
                <Input
                  type="number"
                  value={formData.hp?.current ?? ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    hp: { ...formData.hp!, current: Number(e.target.value) }
                  })}
                />
              </div>
              <div className="grid gap-2">
                <label>HP Roll</label>
                <Input
                  value={formData.hp?.max ?? ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    hp: { ...formData.hp!, max: Number(e.target.value) }
                  })}
                />
              </div>
            </div>
          </div>

          {/* Ability Scores */}
          <div className="grid gap-4">
            <h4 className="font-medium">Ability Scores</h4>
            <div className="grid grid-cols-6 gap-4">
              {['str', 'dex', 'con', 'int', 'wis', 'cha'].map((stat) => (
                <div key={stat} className="grid gap-2">
                  <label className="text-xs uppercase text-center">
                    {stat}
                  </label>
                  <Input
                    type="number"
                    value={formData.stats?.[stat as keyof typeof formData.stats] ?? ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      stats: {
                        ...formData.stats!,
                        [stat]: Number(e.target.value)
                      }
                    })}
                    className="text-center"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Challenge Rating */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label>Challenge Rating</label>
              <Input
                type="number"
                value={formData.challenge?.rating ?? ''}
                onChange={(e) => setFormData({
                  ...formData,
                  challenge: { 
                    ...formData.challenge!,
                    rating: Number(e.target.value)
                  }
                })}
              />
            </div>
            <div className="grid gap-2">
              <label>XP</label>
              <Input
                type="number"
                value={formData.challenge?.xp ?? ''}
                onChange={(e) => setFormData({
                  ...formData,
                  challenge: {
                    ...formData.challenge!,
                    xp: Number(e.target.value)
                  }
                })}
              />
            </div>
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <label>Description</label>
            <Textarea
              value={formData.description ?? ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="h-32"
            />
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