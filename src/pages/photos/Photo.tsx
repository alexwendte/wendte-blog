// @ts-ignore
import EXIF from 'exif-js'
import React, { Component } from 'react'
import styled from 'styled-components/macro'
import Fluid from '../../components/cloudinary/Fluid'
import Icon from '../../components/Icon'
import { prettifyDate } from '../../utils/date'

// This is a page for a specific photo.
class Photo extends Component {
  state = {
    pictureInfo: null,
    loading: true,
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.loading === true && this.state.loading === false) {
      this.getExif()
    }
  }

  getExif = () => {
    const img = document.querySelector('.picture')
    if (img) {
      EXIF.getData(img, () => {
        const allMetaData = EXIF.getAllTags(img)
        const myData = {
          date: allMetaData.DateTime,
          camera: allMetaData.Model,
          latitude: allMetaData.GPSLatitude,
          longitude: allMetaData.GPSLongitude,
          bearing: allMetaData.GPSDestBearing,
          altitude: allMetaData.GPSAltitude,
          alt: img.alt,
          src: img.currentSrc,
        }
        let returnData
        if (myData.latitude) {
          returnData = {
            ...myData,
            latitude: myData.latitude[0] + myData.latitude[1] / 60 + myData.latitude[2] / 3600,
            longitude: myData.longitude[0] + myData.longitude[1] / 60 + myData.longitude[2] / 3600,
          }
        } else returnData = { ...myData, latitude: null, longitude: null }
        img.dataset.imageData = JSON.stringify(returnData)
      })
      // Gives EXIF time to put data onto image
      const interval = setInterval(() => {
        if (img.dataset.imageData) {
          this.setState({ pictureInfo: JSON.parse(img.dataset.imageData) })
          clearInterval(interval)
        }
      }, 100)
    }
  }

  handleImageChange = () => {
    this.setState({ loading: false })
  }

  render() {
    const competitionsHero = { maxWidth: 0.4, height: 400 }
    const { photoIndex } = this.props
    const { pictureInfo } = this.state

    function handleBackClick() {
      window.history.back()
    }

    return (
      <AppContext.Consumer>
        {({ state }) => {
          if (state.pictures) {
            const pic = state.pictures[photoIndex]
            if (pic) {
              return (
                <div className="page">
                  <BackButton className="back" onClick={handleBackClick}>
                    <Icon className="icon" name="back" color="#CF6776" />
                    <span className="text">Back</span>
                  </BackButton>
                  <PictureInfo className="picture-info">
                    <h3>Location</h3>
                    <p>{prettifyDate({ date: pic.date.fullDate })}</p>
                  </PictureInfo>
                  <PhotoWrapper>
                    <div className="picture-element">
                      <Fluid
                        className="picture"
                        modifiers={competitionsHero}
                        keepMeta={true}
                        source={pic.src}
                        alt={pic.alt}
                        key={pic.src}
                        handleImageChange={this.handleImageChange}
                      />
                    </div>
                    {pictureInfo &&
                      (pictureInfo.latitude ? (
                        // <div className="map" />

                        <iframe
                          className="map"
                          title="Street View"
                          width="600"
                          height="400"
                          frameBorder="0"
                          scrolling="no"
                          marginHeight={0}
                          marginWidth={0}
                          src={`https://www.google.com/maps/embed/v1/streetview?key=AIzaSyADYv2uIYX0FWPykJn_xMzFWodm-33bTIE&location=${
                            pictureInfo.latitude
                          },${pictureInfo.longitude}&fov=75`}
                          id="embed"
                          allowFullScreen={false}
                          kwframeid="1"
                        />
                      ) : (
                        <div className="map">
                          <h3>No location details available</h3>
                        </div>
                      ))}
                  </PhotoWrapper>
                </div>
              )
            }
            return <h1>Photo not found</h1>
            /* 
          const latlng = { lat: modifiedData.latitude, lng: modifiedData.longitude };
          
          window.geocoder.geocode({ location: latlng }, function(results, status) {
            console.log('Geocode!');
            if (status === 'OK') {
              if (results[0]) {
                console.log(results[0].formatted_address);
              } else {
                window.alert('No results found');
              }
            } else {
              window.alert('Geocoder failed due to: ' + status);
            }
          }); */
          }
        }}
      </AppContext.Consumer>
    )
  }
}

export default Photo

Photo.propTypes = {
  photoIndex: PropTypes.string,
}

Photo.defaultProps = {
  photoIndex: '',
}

const PhotoWrapper = styled.div`
  padding: 0 3rem 3rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .map {
    width: 600px;
    height: 400px;
    background: ${colors.lightGray};
    margin-left: 2rem;
  }
  .extra-info {
    padding-left: 3rem;
  }
  @media (max-width: 1350px) {
    .picture {
      width: 800px;
      height: 600px;
      max-width: 100%;
      margin: 0 auto;
      display: block;
    }
    .map {
      width: 800px;
      height: 533px;
      margin-left: 0rem;
      margin-top: 3rem;
    }
  }
`

const BackButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  border-radius: 5px;
  display: flex;
  margin-left: 3rem;
  margin-top: 2rem;
  transition: transform 0.2s ease-in;
  svg {
    height: 3.2rem;
    width: 3.2rem;
  }
  .text {
    color: #cf6776;
    font-size: 1.8rem;
    font-weight: 600;
    margin-left: 1rem;
  }
  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
  }
`

const PictureInfo = styled.div`
  max-width: 1200px;
  padding: 0 3rem 3rem;
  margin: 0 auto;
`
