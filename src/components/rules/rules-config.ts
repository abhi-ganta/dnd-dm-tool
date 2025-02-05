import { actionData } from './data/action'
import { bonusActionData } from './data/bonusAction'
import { reactionData } from './data/reaction'
import { movementData } from './data/movement'
import { 
  environmentCoverData,
  environmentLightData,
  environmentObscuranceData,
  environmentVisionData 
} from './data/environment'
import { conditionData } from './data/condition'

// Helper to convert data to RuleItem format
function convertToRuleItem(data: any): RuleItem {
  return {
    id: data.title.toLowerCase().replace(/\s+/g, '-'),
    title: data.title,
    icon: data.icon,
    description: data.description,
    bullets: data.bullets?.map((text: string) => `• ${text}`) || [],
    reference: data.reference
  }
}
``
export const RULES: RuleSection[] = [
  {
    id: 'movement',
    title: 'Movement',
    frequency: 'limited by movement speed',
    subtitle: 'You can move at any time during your turn (before, after, or during actions).',
    items: movementData.map(convertToRuleItem)
  },
  {
    id: 'action',
    title: 'Action',
    frequency: '1/turn',
    subtitle: 'You can also interact with one object or feature of the environment for free.',
    items: actionData.map(convertToRuleItem)
  },
  {
    id: 'bonus-action',
    title: 'Bonus Action',
    frequency: 'max. 1/turn',
    subtitle: 'You can take a bonus action only when a special ability, spell, or feature states that you can do something as a bonus action.',
    items: bonusActionData.map(convertToRuleItem)
  },
  {
    id: 'reaction',
    title: 'Reaction',
    frequency: 'max. 1/round',
    subtitle: 'A reaction is an instant response to a trigger of some kind, which can occur on your turn or on someone else\'s.',
    items: reactionData.map(convertToRuleItem)
  },
  {
    id: 'environment',
    title: 'Environment',
    subtitle: 'Rules for different environmental conditions and effects.',
    items: [
      ...environmentLightData.map(convertToRuleItem),
      ...environmentObscuranceData.map(convertToRuleItem),
      ...environmentVisionData.map(convertToRuleItem),
      ...environmentCoverData.map(convertToRuleItem)
    ]
  },
  {
    id: 'condition',
    title: 'Conditions',
    subtitle: 'Conditions alter your capabilities in a variety of ways, and can arise as a result of a spell, a class feature, a monster\'s attack, or other effect.',
    items: conditionData.map(convertToRuleItem)
  }
]

export type RuleCategory = 'movement' | 'action' | 'bonus-action' | 'reaction' | 'environment' | 'condition'

export interface RuleItem {
  id: string
  title: string
  icon: string
  description: string
  bullets: string[]
  reference?: string
}

export interface RuleSection {
  id: RuleCategory
  title: string
  subtitle: string
  frequency?: string
  items: RuleItem[]
} 