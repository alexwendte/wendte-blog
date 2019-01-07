import * as React from 'react'
import { IHashProps } from '../types'

const useHash = ({ refToFocus, hash, location }: IHashProps) => {
  React.useLayoutEffect(() => {
    if (location && location.hash === hash) {
      const node = refToFocus.current
      if (node) {
        node.scrollIntoView()
      }
    }
  })
}
export default useHash
