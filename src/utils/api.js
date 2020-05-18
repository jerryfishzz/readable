import Axios from 'axios'

const baseURL = process.env.REACT_APP_BACKEND ||  'http://localhost:3001'

export function getCategories() {
  const url = `${baseURL}/categories`

  console.log('fetching from url', url)
  return Axios({
    method: 'get',
    url,
    headers: {'Authorization': 'whatever-you-want'},
  }).then(res => res.data.categories)
}

export function getAllPosts() {
  const url = `${baseURL}/posts`

  console.log('fetching from url', url)
  return Axios({
    method: 'get',
    url,
    headers: {'Authorization': 'whatever-you-want'},
  }).then(res => res.data)
}

export function getCategoryPosts(category) {
  const url = `${baseURL}/${category}/posts`

  console.log('fetching from url', url)
  return Axios({
    method: 'get',
    url,
    headers: {'Authorization': 'whatever-you-want'},
  }).then(res => res.data)
}
