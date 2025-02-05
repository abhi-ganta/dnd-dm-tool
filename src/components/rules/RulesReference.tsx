'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { RULES, type RuleCategory, type RuleItem } from './rules-config'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

function formatDescription(item: RuleItem) {
  return (
    <>
      <p className="mb-4">{item.description}</p>
      {item.bullets.map((bullet, i) => (
        <p key={i} className="mb-2 ml-4">{bullet}</p>
      ))}
      {item.reference && (
        <p className="text-muted-foreground text-sm mt-4">{item.reference}</p>
      )}
    </>
  )
}

export function RulesReference() {
  const [activeCategory, setActiveCategory] = useState<RuleCategory>('movement')
  const [selectedRule, setSelectedRule] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const activeSection = RULES.find(section => section.id === activeCategory)
  
  // Filter rules based on search query
  const filteredRules = useMemo(() => {
    if (!searchQuery.trim()) {
      return activeSection?.items || []
    }

    const query = searchQuery.toLowerCase()
    
    if (activeSection) {
      // Search within active category
      return activeSection.items.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      )
    }

    // Search across all categories when no active section
    return RULES.flatMap(section => 
      section.items.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      )
    )
  }, [activeSection, searchQuery])

  const selectedRuleItem = activeSection?.items.find(item => item.id === selectedRule)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sticky top-4 z-10 bg-background/80 backdrop-blur-lg p-4 rounded-lg border border-border/50 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Quick Rules</h2>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search rules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {RULES.map(section => (
            <Button
              key={section.id}
              variant={activeCategory === section.id ? 'default' : 'secondary'}
              onClick={() => {
                setActiveCategory(section.id)
                setSearchQuery('') // Clear search when changing category
              }}
              className={cn(
                'font-medium',
                activeCategory === section.id && 'ring-2 ring-primary/50'
              )}
            >
              <span className="capitalize">{section.title}</span>
              {section.frequency && (
                <span className="ml-2 text-xs opacity-70">
                  ({section.frequency})
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Rules Grid */}
      {(activeSection || searchQuery) && (
        <div className="space-y-4">
          {!searchQuery && <p className="text-sm text-muted-foreground">{activeSection?.subtitle}</p>}
          {searchQuery && filteredRules.length === 0 && (
            <p className="text-sm text-muted-foreground">No rules found matching "{searchQuery}"</p>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredRules.map(item => (
              <Button
                key={item.id}
                variant="secondary"
                className="h-auto py-4 flex flex-col gap-2"
                onClick={() => setSelectedRule(item.id)}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium">{item.title}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Rule Details Dialog */}
      <Dialog open={!!selectedRule} onOpenChange={() => setSelectedRule(null)}>
        {selectedRuleItem && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <span className="text-2xl">{selectedRuleItem.icon}</span>
                {selectedRuleItem.title}
              </DialogTitle>
              <DialogDescription className="space-y-2 pt-4 text-foreground">
                {formatDescription(selectedRuleItem)}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
} 