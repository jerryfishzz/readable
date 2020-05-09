import Axios from 'axios'

const baseURL = process.env.REACT_APP_BACKEND ||  'http://localhost:3001'

function getCategories() {
  const url = `${baseURL}/categories`

  console.log('fetching from url', url)
  return Axios({
    method: 'get',
    url,
    headers: {'Authorization': 'whatever-you-want'},
  }).then(res => res.data.categories)
}

function getPosts() {
  const url = `${baseURL}/posts`

  console.log('fetching from url', url)
  return Axios({
    method: 'get',
    url,
    headers: {'Authorization': 'whatever-you-want'},
  }).then(res => res.data)
}

export function getInitialData() {
  return Promise.all([
    getCategories(),
    getPosts()
  ]).then(([categories, posts]) => ({
    categories,
    posts
  }))
}
