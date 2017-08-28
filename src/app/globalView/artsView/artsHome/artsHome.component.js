import React from 'react';
import { Link } from 'react-router-dom';
import ListLink from 'SharedComponents/listLink/listLink.component';
import ArtHistory from 'SharedComponents/artHistory/artHistory.component';
import './artsHome.component.less';

const ArtsHome = (props) => {

  document.querySelector('body').scrollTop = 0;

  const artistsList = [];

  for(let index in props.store.artistsData) {
    let artist = props.store.artistsData[index];
    artistsList.push(
      <ListLink
        key={index}
        url={`/arts/artists/${index}`}
        text={`${artist.fname} ${artist.lname} (${artist.content.length})`} />
    );
  }


  return (
    <div className="artsHome">
      <h1>Welcome to the Portitude Art Gallery</h1>
      <h3>The greatest art in history by some of history's greatest artists</h3>
      <ArtHistory />
      <ul className="artistsList">{artistsList}</ul>
    </div>
  );
}

export default ArtsHome;
