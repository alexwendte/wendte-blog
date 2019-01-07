import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import Helmet from 'react-helmet'
import useHash from '../hooks/useHash'

const AboutUs: React.FC<RouteComponentProps> = () => {
  const historyRef = React.useRef<HTMLHeadingElement>(null)
  useHash({ refToFocus: historyRef, hash: '#history', location })
  return (
    <>
      <Helmet
        title="About Us | Wendte Blog"
        meta={[
          { name: 'description', content: 'Learn about Alex Wendte and Brianna Wendte through their blog.' },
          { name: 'keywords', content: 'Wendte Blog, Alex Wendte, Brianna Wendte' },
        ]}
      />
    </>
  )
}

export default AboutUs
