import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import Modal from 'common/modal'
import './literatureItem.style.scss'

const ItemComponent = (props) => {

  const item = props.item
  const author = item.creator
  // const collection = item.collection

  const totalDisplayPages = props.pages.length
  const currentDisplayPage = props.currentPage

  return (
    <div className="literature_item">
      <Modal
        open={props.modalIsOpen}
        onClose={props.hideModal}
        size="md">
        <Modal.Header title={item.name} subtitle={author.name.long} />
        <Modal.Body fullHeight={totalDisplayPages < 2}>
          <div className={`modalContent ${currentDisplayPage === 1 && 'firstPage'}`} dangerouslySetInnerHTML={{__html: props.pages[props.currentPage - 1]}} />
        </Modal.Body>
        {totalDisplayPages > 1 &&
          <Modal.Footer>
            <div className="pagination">
              <Button
                className="pagination--button"
                color="primary" variant="raised"
                onClick={props.setPreviousPage}
                disabled={props.currentPage === 1}>
                <KeyboardArrowLeft />
              </Button>
              <span className="pagination--marker">
                {currentDisplayPage} / {totalDisplayPages}
              </span>
              <Button
                className="pagination--button"
                color="primary" variant="raised"
                onClick={props.setNextPage}
                disabled={props.currentPage === totalDisplayPages}>
                <KeyboardArrowRight />
              </Button>
            </div>
          </Modal.Footer>
        }
      </Modal>
    </div>
  )
}

export default ItemComponent