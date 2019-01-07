import * as React from 'react'

interface IProps {
  source: string
  modifiers?: any
  alt?: string
  className?: string
  keepMeta?: boolean
  handleImageChange?: () => void
}

interface ITransformationUrlArgs {
  transformations: string
  remoteUrl: string
  keepMeta: boolean
}

function getTransformationUrl({ transformations, remoteUrl, keepMeta }: ITransformationUrlArgs) {
  const parsedRemoteUrl = remoteUrl.split('wp-content/uploads/').pop()
  let optimParams
  if (keepMeta) {
    optimParams = 'q_80,fl_keep_iptc'
  } else optimParams = 'f_auto,q_auto'
  return `https://res.cloudinary.com/wendte-digital-designs/image/upload/${transformations},${optimParams}/remote-media/${parsedRemoteUrl}`
}

const Fixed: React.FC<IProps> = ({
  source,
  modifiers,
  alt = '',
  className = '',
  keepMeta = false,
  handleImageChange,
}) => {
  // !Add in a very very low quality fuzzy picture to load first!
  // These are the screen widths we serve different images at
  const breakPoints = [1600, 1366, 1024, 640]
  // the maxWidth is the maximum width that the image can be
  // Ex : Image is only 50% of the screen size, so for a 640px wide device, the image only needs to be 320px
  const scaled = breakPoints.map(point => Math.floor(point * modifiers.maxWidth))
  // Returns the Fluid transformations we need for the breakpoints. Height is optional.
  const fluidUrls = scaled.map(point =>
    getTransformationUrl({
      // Width for the break point, optional height, if we need to keep metadata, we can't use c_fill currently
      keepMeta,
      remoteUrl: source,
      transformations: `w_${point}${modifiers.height ? `,h_${modifiers.height}` : ''}${keepMeta ? '' : ',c_fill'}`,
    })
  )

  const getSizes = () => `(max-width: ${scaled[0]}px) 100vw, ${scaled[0]}px`
  const getSourceSet = () => fluidUrls.map((url, i) => `${url} ${scaled[i]}w, `).join('')

  return (
    <img
      src={fluidUrls[0]}
      className={className}
      alt={alt}
      sizes={getSizes()}
      srcSet={getSourceSet()}
      onLoad={handleImageChange}
      onError={handleImageChange}
    />
  )
}
export default Fixed
