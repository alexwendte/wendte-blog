import * as React from 'react'

/**
 * Api
 */
export interface IApiError {
  response: { data: { message: string }; status: number; statusText: string }
}

export interface IImage {
  alt: string
  src: string
  title: string
}

export interface IHashProps {
  refToFocus: React.RefObject<HTMLElement>
  hash: string
  location: any
}

export interface IPost {
  id: string
  category: string
  content?: string
  date: string
  featuredImage: IImage
  excerpt: string
  slug: string
  title: string
}

export interface IPicture {
  alt: string
  date: string
  post: string
  photoIndex: string
  postSlug: string
  postTitle: string
  src: string
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
