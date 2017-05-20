import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Lightbox from 'react-images';
import dataService from 'Services/data.service';
import './artistsHome.component.less';


export default class ArtistsHome extends React.Component {

  constructor (props) {
    super(props);
    this.artist = this.props.currentArtist;
    this.artistData = dataService.getArtistData(this.artist.artistKey);
    this.thumbs = this.getThumbs();
    this.imageList = this.getImages();

    this.state = {
			lightboxIsOpen: false,
			currentImage: 0,
		};

		this.closeLightbox = this.closeLightbox.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
		this.gotoPrevious = this.gotoPrevious.bind(this);
		this.gotoImage = this.gotoImage.bind(this);
		this.handleClickImage = this.handleClickImage.bind(this);
		this.openLightbox = this.openLightbox.bind(this);
  }

  getThumbs () {
    return this.artistData.content.map((item, index) => {
      return (
        <li className="thumbnail" key={index}>
          <a
            href={`./content/artwork/${this.artist.artistKey}/${item.fileName}.jpg`}
            title={item.title}
            key={index}
            onClick={(e) => this.openLightbox(index, e)}>
            <img
              src={`./content/artwork/${this.artist.artistKey}/${item.fileName}_sm.jpg`}
              alt={item.title} />
            <span>{item.title}</span>
          </a>
        </li>
      );
    });
  }

  getImages () {
    const imageList = [];
    this.artistData.content.map((item, index) => {
      imageList.push({
        src: `./content/artwork/${this.artist.artistKey}/${item.fileName}.jpg`,
        thumbnail: `./content/artwork/${this.artist.artistKey}/${item.fileName}_sm.jpg`,
        caption: item.title
      });
      return;
    });

    return imageList;
  }

  openLightbox (index, event) {
		event.preventDefault();
		this.setState({
			currentImage: index,
			lightboxIsOpen: true,
		});
	}
	closeLightbox () {
		this.setState({
			currentImage: 0,
			lightboxIsOpen: false,
		});
	}
	gotoPrevious () {
		this.setState({
			currentImage: this.state.currentImage - 1,
		});
	}
	gotoNext () {
		this.setState({
			currentImage: this.state.currentImage + 1,
		});
	}
	gotoImage (index) {
		this.setState({
			currentImage: index,
		});
	}
	handleClickImage () {
		if (this.state.currentImage === this.props.images.length - 1) return;

		this.gotoNext();
	}

  render () {
    return (
      <div className="artistsHome">
        <div className="section">
          <h1>{`${this.artist.fname} ${this.artist.lname}`}</h1>
          <div className="artistBio">{this.artist.bio}</div>
          <ul className="imageGrid">{ this.thumbs }</ul>
          <Lightbox
            currentImage={this.state.currentImage}
            images={this.imageList}
            isOpen={this.state.lightboxIsOpen}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            onClose={this.closeLightbox}
            onClickThumbnail={this.gotoImage}
            showThumbnails={true}
            preloadNextImage={true}
            backdropClosesModal={true}
          />
        </div>
      </div>
    );
  }
}
