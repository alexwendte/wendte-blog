import * as axios from 'axios'
import { IPost, IImage } from '../types'

let api: axios.AxiosInstance
const envBaseURL = process.env.REACT_APP_API_URL

const getData = (res: { data: object }) => res.data

const requests = {
  delete: (url: string): Promise<any> => api.delete(url).then(getData),
  get: (url: string): Promise<any> => api.get(url).then(getData),
  post: (url: string, body: object): Promise<any> => api.post(url, body).then(getData),
  put: (url: string, body: object): Promise<any> => api.put(url, body).then(getData),
}

const posts = {
  get: (): Promise<IPost[]> => requests.get(`${process.env.REACT_APP_WORDPRESS_API}/wp-json/wp/v2/posts/?_embed`),
  getById: (id: string): Promise<IPost> => requests.get(`/resources/${id}`),
  getBySlug: (slug: string): Promise<IPost> => requests.get(`/resources/slug/${slug}`),
}
const media = {
  get: (): Promise<IImage[]> =>
    requests.get(`${process.env.REACT_APP_WORDPRESS_API}/wp-json/wp/v2/media/?per_page=100`),
  getById: (id: string): Promise<IImage> => requests.get(`/resources/${id}`),
}

function init({ baseURL = (api && api.defaults.baseURL) || envBaseURL, axiosOptions = { headers: {} } } = {}) {
  api = (axios as any).create({
    baseURL,
    ...axiosOptions,
    headers: {
      ...axiosOptions.headers,
    },
  })
}

const restApi = {
  init,
  posts,
  media,
}

export default restApi
