import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Modal, Glyphicon, DropdownButton, MenuItem } from 'react-bootstrap';
import historyService from 'Services/history.service';
import eventService from 'Services/event.service';
import ArtCarousel from 'SharedComponents/artCarousel/artCarousel.component';
import './artsDisplay.component.scss';

const ArtsDisplay = (props) => {
  const artistKey = props.match.params.artist;
  const artist = props.store.artwork[artistKey];
  const currentArtworkKey = props.match.params.artwork;
  const currentArtwork = artist.content.filter(artwork => artwork.fileName === currentArtworkKey)[0];

  document.title = `Portitude Gallery: ${artist.fname} ${artist.lname} - ${currentArtwork.title}`;
  historyService.addToHistory({type: 'artHistory', data: Object.assign({}, currentArtwork, {artist: artist})});

  const getCurrentArtwork = () => artist.content.filter(artwork => artwork.fileName === currentArtworkKey)[0];
  const getPosition = () => {
    let position = 0;
    for (const i in artist.content) {
      if (artist.content[i].fileName === currentArtwork.fileName) {
        position = i;
        break;
      }
    }
    return parseInt(position);
  };
  const currentPosition = getPosition();
  const nextPosition = currentPosition === artist.content.length - 1 ? currentPosition : currentPosition + 1;
  const prevPosition = currentPosition === 0 ? currentPosition : currentPosition - 1;
  const hideModal = () => {
    const params = props.appState.getTrimmedURI(2);
    location.hash = `#/${params}`;
    //location.hash = `#/artwork/artists/${artistKey}`;
  };

  const leftSwipeHandler = () => {
    const rightArrow = document.querySelector('.thumbArrowRight') ? document.querySelector('.thumbArrowRight') : document.querySelector('.artsDisplayImage');
    rightArrow.click();

  };
  const rightSwipeHandler = () => {
    const leftArrow = document.querySelector('.thumbArrowLeft') ? document.querySelector('.thumbArrowLeft') : document.querySelector('.artsDisplayImage');
    leftArrow.click();
  };

  eventService.setSwipeActions({
    node: '.artsContent',
    leftSwipeHandler,
    rightSwipeHandler,
    isFirst: currentPosition > 0 ? false : true,
    isLast: currentPosition < artist.content.length - 1 ? false : true
  });

  return (
    <div className="artsDisplay">
      <Modal
        show={true}
        onHide={hideModal.bind(this)}
        dialogClassName="custom-modal arts-modal">
        <Modal.Header closeButton>
          <h1>{artist.lname} | {currentArtwork.date}</h1>
        </Modal.Header>
        <Modal.Body className="darkMode">
          <h1 className="artsTitle">{currentArtwork.title}</h1>
          <div className="artsContent">
            {currentPosition > 0 && <Link to={artist.content[prevPosition].fileName} className="thumbArrow thumbArrowLeft"><Glyphicon glyph="menu-left" /></Link>}
            <img src={`./content/artwork/${artistKey}/${currentArtwork.fileName}.jpg`} className="artsDisplayImage" />
            {currentPosition < artist.content.length - 1 && <Link to={artist.content[nextPosition].fileName} className="thumbArrow thumbArrowRight"><Glyphicon glyph="menu-right" /></Link>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <ArtCarousel
            artist={artist}
            artistKey={artistKey}
            currentArtwork={getCurrentArtwork()}
            lgThumbPageSize={6}
            smThumbPageSize={4}
            currentPosition={getPosition()}
            match={props.match}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ArtsDisplay;