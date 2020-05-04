import Axios from 'axios'

const baseURL = process.env.REACT_APP_BACKEND ||  'http://localhost:3001'

export function getCategories() {
  const url = `${baseURL}/categories`

  console.log('fetching from url', url)
  return Axios({
      method: 'get',
      url,
      headers: {'Authorization': 'whatever-you-want'},
    })
}
