import _ from 'lodash'
import { List, ListItem } from 'common/list'
import Typography from 'common/typography'
import artworkService from 'Services/artwork.service'
import './artworkCreator.style.scss'

const CreatorComponent = props => {

  const creatorId = props.globalState.routing.collection
  const creator = artworkService.getCollection(creatorId)

  return (
    <div className="artwork_creator">
      <Typography type="title">{creator.name.long}</Typography>
      <div className="section">
        <Typography type="subtitle">Gallery</Typography>
        <List>
          {_.map(creator.items, (item, itemIndex) => (
            <ListItem
              to={artworkService.getItemPath(creatorId, item.id)}
              key={itemIndex}
              image={{
                src: artworkService.getImagePathSm(creatorId, item.id),
                alt: item.title
              }}
              headline={item.name}
              subHeadline={`${creator.name.long}, ${item.id.substring(item.id.lastIndexOf('-') + 1)}`} />
          ))}
        </List>
      </div>
    </div>
  )
}

export default CreatorComponent
