import spellsData from './data/spells.json';

export interface Spell {
  name: string
  level: number
  school: string
  castingTime: string
  range: string
  components: string[]
  concentration: boolean
  ritual: boolean
  description: string
  source: string
}

// Convert JSON data into typed Spell objects
export const spells: Spell[] = spellsData
  .map(row => ({
    name: row.Spell,
    level: row.Lvl,
    school: row.School,
    castingTime: row['Casting Time'],
    range: row.Range,
    components: row['V,S,M'].split(',').map((c: string) => c.trim()),
    concentration: row.Concentration === 'Concentration',
    ritual: row.Ritual === 'Ritual',
    description: row.Description,
    source: row.Source
  }))
  .filter(spell => spell.name)

export function searchSpells(query: string): Spell[] {
  const searchTerms = query.toLowerCase().split(' ')
  
  return spells.filter(spell => {
    const searchableText = [
      spell.name,
      spell.school,
      spell.description,
      spell.level.toString(),
      spell.castingTime,
      spell.range
    ].join(' ').toLowerCase()
    
    return searchTerms.every(term => searchableText.includes(term))
  })
} 