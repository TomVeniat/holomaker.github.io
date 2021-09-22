import React from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import PropTypes from 'prop-types';
import { getImage } from 'gatsby-plugin-image';
import './PhotoGrid.scss';
import { BgImage } from 'gbimage-bridge';

const photoGridProptypes = {
  gatsbyImagesWithThumbs: PropTypes.array.isRequired,
};
export class PhotoGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false,
    };
  }

  generatePicture(gatsbyThumb, index, margin) {
    const gatsbyImg = getImage(gatsbyThumb);
    let className = margin ? `photoThumbnail marginRight` : `photoThumbnail`;
    return (
      <BgImage
        key={index}
        image={gatsbyImg}
        className={className}
        onClick={() => this.setState({ isOpen: true, photoIndex: index })}
      />
    );
  }

  //numberPerRow is a WIP, needs changes in sass too
  generateGrid(gatsbyThumbs, numberPerRow = 3) {
    let photoGrid = [];
    for (let i = 0; i < gatsbyThumbs.length; i += numberPerRow) {
      let photoRow = [];

      for (
        let columnIndex = 0;
        columnIndex < numberPerRow && i + columnIndex < gatsbyThumbs.length;
        columnIndex++
      ) {
        // handle margin right
        if (columnIndex < numberPerRow) {
          photoRow.push(
            this.generatePicture(
              gatsbyThumbs[i + columnIndex],
              i + columnIndex,
              true
            )
          );
        } else {
          photoRow.push(
            this.generatePicture(
              gatsbyThumbs[i + columnIndex],
              i + columnIndex,
              false
            )
          );
        }
      }
      photoGrid.push(
        <div key={i} className="photoRowContainer">
          {photoRow}
        </div>
      );
      photoRow = [];
    }
    return photoGrid;
  }

  render() {
    const { isOpen, photoIndex } = this.state;
    const images = this.props.gatsbyImagesWithThumbs;
    const imageUrls = images.map((im) => {
      return im.full.images?.fallback?.src;
    });
    const thumbs = images.map((im) => im.thumb);
    const prevIndex = (photoIndex + images.length - 1) % images.length;
    const nextIndex = (photoIndex + 1) % images.length;
    const mainSrc = imageUrls[photoIndex];
    const nextSrc = imageUrls[nextIndex];
    const prevSrc = imageUrls[prevIndex];
    return (
      <div className="componentPhotoGrid">
        {isOpen && (
          <Lightbox
            mainSrc={mainSrc || ''}
            nextSrc={nextSrc || ''}
            prevSrc={prevSrc || ''}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: nextIndex,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: nextIndex,
              })
            }
          />
        )}

        <div className="photoGrid">{this.generateGrid(thumbs)}</div>
      </div>
    );
  }
}

PhotoGrid.propTypes = photoGridProptypes;
