'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CharacterSection } from '@/components/characters/CharacterSection'
import { CombatTracker } from '@/components/combat/CombatTracker'
import { RulesReference } from '@/components/rules/RulesReference'
import { Soundboard } from '@/components/soundboard/Soundboard'
import { MonsterSection } from '@/components/monsters/MonsterSection'
import { SpellList } from '@/components/spells/SpellList'

export function MainTabs() {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-bold">Ultimate D&D Dungeon Master Tool</h1>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="characters" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-12">
          <TabsTrigger value="characters" className="text-base">Characters & Combat</TabsTrigger>
          <TabsTrigger value="soundboard" className="text-base">Soundboard</TabsTrigger>
          <TabsTrigger value="rules" className="text-base">Rules</TabsTrigger>
          <TabsTrigger value="spells" className="text-base">Spells</TabsTrigger>
        </TabsList>

        <TabsContent value="characters" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-[minmax(500px,1fr),450px]">
            <div className="max-w-3xl">
              <CombatTracker />
            </div>
            <div className="space-y-6">
              <CharacterSection />
              <MonsterSection />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="soundboard" className="mt-6">
          <div className="p-4 bg-background rounded-lg border border-border/50">
            <Soundboard />
          </div>
        </TabsContent>

        <TabsContent value="rules" className="mt-6">
          <div className="bg-background rounded-lg">
            <RulesReference />
          </div>
        </TabsContent>

        <TabsContent value="spells" className="mt-6">
          <div className="p-4 bg-background rounded-lg border border-border/50">
            <SpellList />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 