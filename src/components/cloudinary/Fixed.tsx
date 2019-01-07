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
  const modifiersArray = [
    { ...modifiers },
    { width: modifiers.width * 2, height: modifiers.height * 2, borderRadius: modifiers.borderRadius * 2 },
  ]
  const urls = modifiersArray.map(mod =>
    getTransformationUrl({
      keepMeta,
      remoteUrl: source,
      transformations: `w_${mod.width},h_${mod.height}${mod.borderRadius ? `,r_${mod.borderRadius}` : ''}${
        keepMeta ? '' : ',c_fill'
      }`,
    })
  )
  const getSrcSet = () => `${urls[0]}, ${urls[1]} 2x`

  return (
    <img
      className={className}
      src={urls[0]}
      alt={alt}
      srcSet={getSrcSet()}
      onLoad={handleImageChange}
      onError={handleImageChange}
    />
  )
}
export default Fixed
