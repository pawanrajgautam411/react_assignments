import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import Oauth2Comp from './Oauth2Comp';

export default class Discover extends Component {

  constructor() {
    super();
    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
      hasLoggedIn: false
    };

    this.handleStateChange = this.handleStateChange.bind(this);
  }

  /**
  * handling the state change on child Component
  */
  handleStateChange(newReleases, playlists, categories, hasLoggedIn) {
    this.setState({
      newReleases: newReleases,
      playlists: playlists,
      categories: categories,
      hasLoggedIn: hasLoggedIn,
    }, () => {
      console.log('discover new_state', this.state);
    });
  }

  /**
   * default render method
   */
  render() {
    const { newReleases, playlists, categories, hasLoggedIn } = this.state;

    if (hasLoggedIn) {
      return <div className="discover">
        {console.log('hasLoggedIn= ', hasLoggedIn)}
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>

    } else {
      return <div className="discover">
        {console.log('hasLoggedIn= ', hasLoggedIn)}
        <Oauth2Comp id="oauth2Comp" onChange={this.handleStateChange} />
      </div>
    }
  }
}
