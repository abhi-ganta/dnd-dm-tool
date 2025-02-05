import { CombatCondition } from './combat-types'

export interface ConditionEffect {
  name: CombatCondition
  description: string
  effects: string[]
}

export const CONDITIONS: Record<CombatCondition, ConditionEffect> = {
  blinded: {
    name: 'blinded',
    description: 'The creature cannot see.',
    effects: [
      'A blinded creature can\'t see and automatically fails any ability check that requires sight.',
      'Attack rolls against the creature have advantage, and the creature\'s attack rolls have disadvantage.'
    ]
  },
  charmed: {
    name: 'charmed',
    description: 'The creature is charmed.',
    effects: [
      'A charmed creature can\'t attack the charmer or target them with harmful abilities or magical effects.',
      'The charmer has advantage on any ability check to interact socially with the creature.'
    ]
  },
  deafened: {
    name: 'deafened',
    description: 'The creature cannot hear.',
    effects: [
      'A deafened creature can\'t hear and automatically fails any ability check that requires hearing.'
    ]
  },
  frightened: {
    name: 'frightened',
    description: 'The creature is frightened.',
    effects: [
      'A frightened creature has disadvantage on ability checks and attack rolls while the source of its fear is within line of sight.',
      'The creature can\'t willingly move closer to the source of its fear.'
    ]
  },
  grappled: {
    name: 'grappled',
    description: 'The creature is grappled.',
    effects: [
      'A grappled creature\'s speed becomes 0, and it can\'t benefit from any bonus to its speed.',
      'The condition ends if the grappler is incapacitated.',
      'The condition also ends if an effect removes the grappled creature from the reach of the grappler or grappling effect.'
    ]
  },
  incapacitated: {
    name: 'incapacitated',
    description: 'The creature is incapacitated.',
    effects: [
      'An incapacitated creature can\'t take actions or reactions.'
    ]
  },
  invisible: {
    name: 'invisible',
    description: 'The creature is invisible.',
    effects: [
      'An invisible creature is impossible to see without the aid of magic or a special sense.',
      'The creature\'s location can be detected by any noise it makes or tracks it leaves.',
      'Attack rolls against the creature have disadvantage.',
      'The creature\'s attack rolls have advantage.'
    ]
  },
  paralyzed: {
    name: 'paralyzed',
    description: 'The creature is paralyzed.',
    effects: [
      'A paralyzed creature is incapacitated and can\'t move or speak.',
      'The creature automatically fails Strength and Dexterity saving throws.',
      'Attack rolls against the creature have advantage.',
      'Any attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature.'
    ]
  },
  petrified: {
    name: 'petrified',
    description: 'The creature is transformed into stone.',
    effects: [
      'A petrified creature is transformed, along with any nonmagical objects it is wearing or carrying, into a solid inanimate substance.',
      'Its weight increases by a factor of ten, and it ceases aging.',
      'The creature is incapacitated, can\'t move or speak, and is unaware of its surroundings.',
      'Attack rolls against the creature have advantage.',
      'The creature automatically fails Strength and Dexterity saving throws.',
      'The creature has resistance to all damage.',
      'The creature is immune to poison and disease.'
    ]
  },
  poisoned: {
    name: 'poisoned',
    description: 'The creature is poisoned.',
    effects: [
      'A poisoned creature has disadvantage on attack rolls and ability checks.'
    ]
  },
  prone: {
    name: 'prone',
    description: 'The creature is prone.',
    effects: [
      'A prone creature\'s only movement option is to crawl, unless it stands up.',
      'The creature has disadvantage on attack rolls.',
      'Attack rolls against the creature have advantage if the attacker is within 5 feet.',
      'Attack rolls against the creature have disadvantage if the attacker is farther away.'
    ]
  },
  restrained: {
    name: 'restrained',
    description: 'The creature is restrained.',
    effects: [
      'A restrained creature\'s speed becomes 0, and it can\'t benefit from any bonus to its speed.',
      'Attack rolls against the creature have advantage.',
      'The creature\'s attack rolls have disadvantage.',
      'The creature has disadvantage on Dexterity saving throws.'
    ]
  },
  stunned: {
    name: 'stunned',
    description: 'The creature is stunned.',
    effects: [
      'A stunned creature is incapacitated, can\'t move, and can speak only falteringly.',
      'The creature automatically fails Strength and Dexterity saving throws.',
      'Attack rolls against the creature have advantage.'
    ]
  },
  unconscious: {
    name: 'unconscious',
    description: 'The creature is unconscious.',
    effects: [
      'An unconscious creature is incapacitated, can\'t move or speak, and is unaware of its surroundings.',
      'The creature drops whatever it\'s holding and falls prone.',
      'The creature automatically fails Strength and Dexterity saving throws.',
      'Attack rolls against the creature have advantage.',
      'Any attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature.'
    ]
  }
}

export const CONDITION_COLORS: Record<CombatCondition, string> = {
  blinded: 'text-red-400',
  charmed: 'text-pink-400',
  deafened: 'text-purple-400',
  frightened: 'text-orange-400',
  grappled: 'text-blue-400',
  incapacitated: 'text-gray-400',
  invisible: 'text-cyan-400',
  paralyzed: 'text-indigo-400',
  petrified: 'text-stone-400',
  poisoned: 'text-green-400',
  prone: 'text-amber-400',
  restrained: 'text-teal-400',
  stunned: 'text-violet-400',
  unconscious: 'text-rose-400'
} 