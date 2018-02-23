import { Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';
//import historyService from 'Services/history.service';
import BackToTop from 'SharedComponents/backToTop/backToTop.component';
import ListLink from 'SharedComponents/listLink/listLink.component';
import SectionHeader from 'SharedComponents/sectionHeader/sectionHeader.component';
import './artsEra.component.scss';


const ArtsEra = (props) => {

  document.title = `Portitude Gallery: artwork from the ${props.appState.routing.currentSubSection} era`;

  const getTitles = () => {
    const artistsList = [];
    for(const artistKey in props.store.artwork) {
      const titlesList = [];
      const artist = props.store.artwork[artistKey];
      for (const i in artist.content) {
        const title = artist.content[i];
        if (artist.era.toLowerCase() === props.appState.routing.currentSubSection) {
          titlesList.push(
            <ListLink
              key={title.fileName}
              thumb={`./content/artwork/${artistKey}/${title.fileName}_sm.jpg`}
              url={`/artwork/g/${artist.era.toLowerCase()}/${artistKey}/${title.fileName}`}
              text={title.title}
              other={`${title.date}, ${artist.lname}`} />
          );
        }
      }
      if (titlesList.length) {
        artistsList.push(
          <div className="artistBlock" key={artistKey}>
            <SectionHeader text={`${artist.fname} ${artist.lname}`} />
            <ul className="contentBlock">
              {titlesList}
            </ul>
          </div>
        );
      }
    }
    return artistsList;
  };

  const titles = getTitles();

  return (
    <div className="artsEra">
      <h1>{props.appState.routing.currentSubSection}</h1>
      <div className="homeDescription">The best parts of waking up is {props.appState.routing.currentSubSection} in your browser</div>
      <div className="eraContainer">
        {titles}
      </div>
      <BackToTop />
    </div>
  );
};

export default ArtsEra;