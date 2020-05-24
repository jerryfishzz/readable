import Axios from 'axios'

const baseURL = process.env.REACT_APP_BACKEND ||  'http://localhost:3001'

export function getCategories() {
  const url = `${baseURL}/categories`

  console.log('fetching categories from url', url)
  return Axios({
    method: 'get',
    url,
    headers: {'Authorization': 'whatever-you-want'},
  }).then(res => res.data.categories)
}

export function getAllPosts() {
  const url = `${baseURL}/posts`

  console.log('fetching all the posts from url', url)
  return Axios({
    method: 'get',
    url,
    headers: {'Authorization': 'whatever-you-want'},
  }).then(res => res.data)
}

export function getCategoryPosts(category) {
  const url = `${baseURL}/${category}/posts`

  console.log('fetching all the posts from a category from url', url)
  return Axios({
    method: 'get',
    url,
    headers: {'Authorization': 'whatever-you-want'},
  }).then(res => res.data)
}

export function votePost(pid, vote) {
  const url = `${baseURL}/posts/${pid}`

  console.log('voting from url', url)
  return Axios({
    method: 'post',
    url,
    headers: {'Authorization': 'whatever-you-want'},
    data: vote
  }).then(res => res.data)
}

export function deletePost(pid) {
  const url = `${baseURL}/posts/${pid}`

  console.log('deleting a post from url', url)
  return Axios({
    method: 'delete',
    url,
    headers: {'Authorization': 'whatever-you-want'},
  }).then(res => res.data)
}

export function addPost(post) {
  const url = `${baseURL}/posts`

  console.log('adding a post from url', url)
  return Axios({
    method: 'post',
    url,
    headers: {'Authorization': 'whatever-you-want'},
    data: post
  }).then(res => {
    // console.log(res)
    return res.data
  })
}
