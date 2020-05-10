export const SWITCH_CATEGORY = 'SWITCH_CATEGORY'

export function switchCategory(category) {
  return {
    type: SWITCH_CATEGORY,
    category
  }
}