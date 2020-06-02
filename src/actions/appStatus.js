export const GET_CATEGORIES_READY = 'GET_CATEGORIES_READY'
export const GET_POSTS_READY = 'GET_POSTS_READY'
export const SWITCH_SORT = 'SWITCH_SORT'
export const LOADING_POSTS = 'LOADING_POSTS'
export const LOADING_CATEGORIES = 'LOADING_CATEGORIES'
export const SHOW_LOADING_BAR = 'SHOW_LOADING_BAR'
export const HIDE_LOADING_BAR = 'HIDE_LOADING_BAR'
export const START_DELETING = 'START_DELETING'
export const STOP_DELETING = 'STOP_DELETING'

export function getCategoriesReady() {
  return {
    type: GET_CATEGORIES_READY
  }
}

export function getPostsReady() {
  return {
    type: GET_POSTS_READY
  }
}

export function switchSort(sort) {
  return {
    type: SWITCH_SORT,
    sort
  }
}

export function loadingPosts() {
  return {
    type: LOADING_POSTS,
  }
}

export function loadingCategories() {
  return {
    type: LOADING_CATEGORIES
  }
}

export function showLoadingBar() {
  return {
    type: SHOW_LOADING_BAR
  }
}

export function hideLoadingBar() {
  return {
    type: HIDE_LOADING_BAR
  }
}

export function startDeleting() {
  return {
    type: START_DELETING
  }
}

export function stopDeleting() {
  return {
    type: STOP_DELETING
  }
}