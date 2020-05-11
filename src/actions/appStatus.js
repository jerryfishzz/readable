export const SWITCH_CATEGORY = 'SWITCH_CATEGORY'
export const GET_READY = 'GET_READY'
export const SWITCH_SORT = 'SWITCH_SORT'

export function switchCategory(category) {
  return {
    type: SWITCH_CATEGORY,
    category
  }
}

export function getReady() {
  return {
    type: GET_READY
  }
}

export function switchSort(sort) {
  return {
    type: SWITCH_SORT,
    sort
  }
}