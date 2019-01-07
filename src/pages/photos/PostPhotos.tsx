import { Link } from '@reach/router'
import Spinner from 'components/Spinner'
import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { monthsToInt } from 'utils/date'
import Fixed from '../../components/cloudinary/Fixed'
import { elevation, transition } from '../../mixins'

function filterByMonth({ arr, month }) {
  return arr.filter(obj => obj.date.month === monthsToInt[month])
}

class PostPhotos extends Component {
  state = {
    filteredPosts: filterByMonth({ arr: this.props.posts, month: this.props.month }),
    postsAreLoaded: false,
  }

  numPostsLoaded = 0

  handleImageChange = e => {
    this.numPostsLoaded += 1
    if (this.numPostsLoaded === this.state.filteredPosts.length) {
      this.setState(() => ({ postsAreLoaded: true }))
    }

    const { naturalHeight: height, naturalWidth: width } = e.target
    const link = e.target.closest('a')

    const vert = height > width ? 3 : 2
    const hor = width > height ? 3 : 2
    link.style.gridColumn = `span ${hor}`
    link.style.gridRow = `span ${vert}`
  }

  /* componentDidUpdate(prevProps, prevState) {
    if (prevState.picsAreLoaded === false && this.state.picsAreLoaded) this.state.loadedFunction();
  } */

  render() {
    const { month, pics } = this.props
    const { filteredPosts, postsAreLoaded } = this.state
    const postPicture = { width: 250, height: 200 }
    // I can get Posts by id doing media?parent=postId

    const getCountById = ({ arrPics, id }) => arrPics.filter(pic => pic.post === id).length

    return (
      <Gallery>
        <Spinner loading={!postsAreLoaded}>
          {() => (
            <Fragment>
              <h2 className="heading__gallery">{month} Posts</h2>
              {filteredPosts.map(post => {
                const pic = post.featuredImage
                const numPics = getCountById({ arrPics: pics, id: post.id })
                return (
                  <PictureLink to={post.slug} key={pic.src}>
                    <h4 className="heading__post">{post.title}</h4>
                    <Fixed
                      className="picture"
                      modifiers={postPicture}
                      fluid={true}
                      keepMeta={true}
                      source={pic.src}
                      alt={pic.alt}
                      gridClasses={true}
                      handleImageChange={this.handleImageChange}
                    />
                    {/* This number is Wrong */}
                    <p className="pictureCount">{`${numPics} Photos`}</p>
                  </PictureLink>
                )
              })}
            </Fragment>
          )}
        </Spinner>
      </Gallery>
    )
  }
}
export default PostPhotos

PostPhotos.propTypes = {
  posts: PropTypes.array.isRequired,
  month: PropTypes.string.isRequired,
  pics: PropTypes.array.isRequired,
}

const Gallery = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 3rem 2rem;
  .heading__gallery {
    padding-bottom: 2rem;
    text-align: center;
    color: ${colors.seaGreen};
    width: 100%;
  }
`

const PictureLink = styled(Link)`
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 1.5rem;
  margin: 0 2rem;
  border-radius: 5px;
  ${elevation({ level: 4 })};
  ${transition({ name: 'easeOutCubic', prop: 'all', time: 0.3 })};
  .heading__post {
    color: ${colors.coral};
    padding-bottom: 1.5rem;
    font-size: 2rem;
  }
  .picture {
    display: block;
    object-fit: cover;
    object-position: center;
    border-radius: 20px;
  }
  .pictureCount {
    padding-top: 1.5rem;
    font-size: 1.8rem;
    color: #a2a2a2;
    font-weight: 600;
  }
  &:hover {
    transform: rotate(1deg) translateX(-10px) translateY(-10px);
    ${transition({ name: 'easeInCubic', prop: 'all', time: 0.2 })};
  }
`
