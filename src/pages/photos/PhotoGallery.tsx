import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';

import AppContext from 'modules/AppContext';
import Fluid from 'components/cloudinary/Fluid';
import Spinner from 'components/Spinner';
import { transition, elevation, media } from 'utils/mixins';
import colors from 'utils/colors';

class PhotoGallery extends Component {
  state = {
    picsAreLoaded: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  numPicsLoaded = 0;

  handleImageChange = (e, numPics) => {
    this.numPicsLoaded += 1;
    if (this.numPicsLoaded === numPics) {
      this.setState(() => ({ picsAreLoaded: true }));
    }

    const { naturalHeight: height, naturalWidth: width } = e.target;
    const link = e.target.closest('a');

    const vert = height > width ? 3 : 2;
    const hor = width > height ? 3 : 2;
    link.style.gridColumn = `span ${hor}`;
    link.style.gridRow = `span ${vert}`;
  };

  filterPics = ({ pics, postSlug }) => pics.filter(pic => pic.postSlug === postSlug);

  render() {
    const { postSlug } = this.props;
    const { picsAreLoaded } = this.state;
    const gridPicture = { maxWidth: 0.2 };

    return (
      <AppContext.Consumer>
        {({ state }) => {
          if (state.pictures) {
            // Get the post that corresponds with the post id. (Should do this in the AppContext)
            const filteredPics = this.filterPics({ pics: state.pictures, postSlug });
            return (
              <Gallery>
                <Spinner loading={!picsAreLoaded}>
                  {() => (
                    <Fragment>
                      <h2 className="heading__gallery">
                        {/* Now I need to get the post title... */}
                        {/* Write this as a string util and unit test it to practice */}
                        {filteredPics[0].postTitle} Photos
                      </h2>
                      {filteredPics.map(pic => (
                        <PictureLink to={pic.photoIndex.toString()} key={pic.src}>
                          <Fluid
                            className="picture"
                            modifiers={gridPicture}
                            fluid
                            keepMeta
                            source={pic.src}
                            alt={pic.alt}
                            gridClasses
                            handleImageChange={ev => this.handleImageChange(ev, filteredPics.length)}
                          />
                        </PictureLink>
                      ))}
                    </Fragment>
                  )}
                </Spinner>
              </Gallery>
            );
          }
          return <h1>Loading</h1>;
        }}
      </AppContext.Consumer>
    );
  }
}
export default PhotoGallery;

PhotoGallery.propTypes = {
  postSlug: PropTypes.string,
};

PhotoGallery.defaultProps = {
  postSlug: undefined,
};

const Gallery = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  grid-template-rows: auto;
  grid-auto-rows: 150px;
  grid-auto-flow: dense;
  justify-content: center;
  padding: 3rem 2rem;
  overflow: hidden;
  .heading__gallery {
    text-align: center;
    color: ${colors.seaGreen};
    width: 100%;
    grid-column: 1 / -1;
  }

  ${media.tabletLand`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    margin: 0 auto;
  `};
`;

const PictureLink = styled(Link)`
  overflow: hidden;
  padding: 1rem;
  height: 100%;
  .picture {
    border-radius: 20px;
    ${elevation({ level: 2 })};
    ${transition({ name: 'easeOutCubic', prop: 'all', time: 0.3 })};
    display: block;
    text-align: center;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    h3 {
      color: purple;
      font-size: 2rem;
      padding-bottom: 2rem;
      padding-top: 0.5rem;
    }
    &:hover {
      transform: rotate(1deg) translateX(-10px) translateY(-10px);
      ${transition({ name: 'easeInCubic', prop: 'all', time: 0.2 })};
    }
  }
`;
