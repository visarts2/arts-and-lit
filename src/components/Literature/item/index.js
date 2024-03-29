import _ from 'lodash'

import dataService from 'Services/data.service'
import literatureService from 'Services/literature.service'
import LiteratureItemComponent from './LiteratureItemComponent'

export default class LiteratureItem extends React.Component {
  constructor (props) {
    super(props)
    this.originalPath = document.location.pathname
    this.state = {
      content: false,
      currentPage:  this.getInitialPageNumber(),
      modalIsOpen: true
    }
    this.item = literatureService.getItemWith(this.props.globalState.routing.collection, this.props.globalState.routing.item)
    this.pages = []
    this.setContent()
  }

  getInitialPageNumber = () => {
    return this.originalPath.indexOf('?page=') > -1 ? parseInt(this.originalPath.slice(this.originalPath.indexOf('=') + 1)) : 1
  }

  // take the HTML and split it into an array by the items precaculated page sizes
  setPages = content => {
    let remainingContent = content
    _.map(this.item.pageSizes, pageSize => {
      this.pages.push(remainingContent.substring(0, pageSize))
      remainingContent = remainingContent.substring(pageSize)
    })
  }

  setContent = () => {
    dataService.getHTMLContent(this.item.creator.id, this.item.id)
      .then(content => {
        this.setPages(content)
        this.setState({content: this.pages[this.state.currentPage - 1]})
      })
  }

  setPageQuery = currentPage => {
    const currentPath = this.originalPath.indexOf('?page=') > -1 ? this.originalPath.slice(0, this.originalPath.indexOf('?')) : this.originalPath
    document.location.pathname = `${currentPath}?page=${currentPage}`
  }

  setFirstPage = () => {
    const currentPage = 0
    this.setState({content: this.pages[currentPage], currentPage}, () => this.setPageQuery(currentPage))
  }

  setLastPage = () => {
    const currentPage = this.pages.length - 1
    this.setState({content: this.pages[currentPage], currentPage}, () => this.setPageQuery(currentPage))
  }

  setNextPage = e => {
    const currentPage = this.state.currentPage + 1
    this.setState({content: this.pages[currentPage - 1], currentPage}, () => this.setPageQuery(currentPage))
  }

  setPreviousPage = () => {
    const currentPage = this.state.currentPage - 1
    this.setState({content: this.pages[currentPage - 1], currentPage}, () => this.setPageQuery(currentPage))
  }

  hideModal = () => {
    this.setState({modalIsOpen: false}, () => {
      location.pathname = location.pathname.substring(0, location.pathname.lastIndexOf('/'))
    })
  }

  render () {
    return (
      <div>
        {this.state.content &&
          <LiteratureItemComponent
            {...this.props}
            modalIsOpen={this.state.modalIsOpen}
            hideModal={this.hideModal}
            item={this.item}
            content={this.state.content}
            setFirstPage={this.setFirstPage}
            setLastPage={this.setLastPage}
            setNextPage={this.setNextPage}
            setPreviousPage={this.setPreviousPage}
            pages={this.pages}
            currentPage={this.state.currentPage} />
        }
      </div>
    )
  }
}
