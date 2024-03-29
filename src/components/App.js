import React from 'react'

import { Route } from 'react-router-dom'

import dataService from 'Services/data.service'
import navigationService from 'Services/navigation.service'

import { Header, Footer, Navigation } from 'global'

import Home from './Home'
import Artwork from './Artwork'
import Literature from './Literature'

import StyledApp from './App.style'

export default class App extends React.Component {

  constructor (props) {
    super(props)
    // this insane logic is needed (for now) to split out any query params on the url
    this.currentLocation = this.getCurrentLocation()
    const routing = dataService.getRoutingState(this.currentLocation)
    this.state = {
      routing,
      navigation: {
        ...navigationService.getNavigation(routing),
        current: navigationService.getCurrent(routing)
      }
    }
  }

  getCurrentLocation = () => {
    return location.pathname.slice(1, location.pathname.indexOf('?') > -1 ? location.pathname.indexOf('?') : location.pathname.length)
  }

  updateAppState = newState => {
    this.setState(Object.assign(this.state, newState))
  }

  setGlobalClassName = () => {
    document.body.className = this.state.routing.section || ''
  }

  componentDidMount = () => {
    this.setGlobalClassName()
  }

  // this will update when the route changes and set state with new params
  UNSAFE_componentWillReceiveProps = nextProps => {
    if (this.currentLocation !== nextProps.location.pathname) {
      const routing = dataService.getRoutingState(nextProps.location.pathname)
      this.setState({
        routing,
        navigation: { ...navigationService.getNavigation(routing), current: navigationService.getCurrent(routing) }
      }, () => {
        this.currentLocation = nextProps.location.pathname
        this.setGlobalClassName()
      })
    }
  }

  render () {

    /* TODO
      courtship of miles standish, Evangeline, song of hiawatha needs special, multi part section
        might need some special indicator to route separately
          -- could use same category as novels, when those are added, as 'chaptered' content

      wilde -- critic as artist needs multi part (i and ii), lord arthur, possibly for shakespeare sonnet set

      possibility -- adding illustrations from books to literature pages

      add nationality to artists and authors, medium type to art, possible sub-genre's to lit

      Add middle tier sizing layout for tablets, etc

      Add historical memory for read completion in literature

      refactor arts carousel to use css animation and a single array

      refactor history display into carousel

    */
    return (
      <StyledApp isRoot={this.state.navigation.current === 'root'} id="portitude">
        <Header
          globalState={this.state} />
        <Navigation
          globalState={this.state} />
        <div className="view">
          <Route exact path="/" render={routeProps => (
            <Home
              globalState={this.state}
              {...routeProps} />
          )} />
          <Route path="/artwork" render={routeProps => (
            <Artwork
              globalState={this.state}
              {...routeProps} />
          )} />
          <Route path="/literature" render={routeProps => (
            <Literature
              globalState={this.state}
              {...routeProps} />
          )} />
        </div>
        <Footer
          globalState={this.state} />
      </StyledApp>
    )
  }
}
