import React, { Component } from 'react';
import OAuth2Login from 'react-simple-oauth2-login';
import axios from 'axios';
import api from '../../../config.js';


/**
* New Component for Oauth2
*/
class Oauth2Comp extends Component {

    constructor(props) {
        super(props);
        this.parentOnChange = props.onChange;

        this.divRef = React.createRef();
        this.errorMessageRef = React.createRef();

        this.oauthRes = {
            access_token: undefined,
            expires_in: undefined,
            token_type: undefined
        };

        this.baseUrl = api.api.baseUrl;
        this.clientId = api.api.clientId;

        //binding event handlers
        this.handleSpotifyResponse = this.handleSpotifyResponse.bind(this);
        this.onTokenValidateSuccessHanlder = this.onTokenValidateSuccessHanlder.bind(this);
        this.onLoginFailure = this.onLoginFailure.bind(this);
    }

    /**
     * trigger Spotify APIs
     * @param {*} accessToken 
     */
    onTokenValidateSuccessHanlder(response) {
        // debugger;
        console.log('onSuccess= ', response);
        this.oauthRes = response;

        const options = {
            method: 'GET',
            params: {
                country: 'SE', limit: 10, offset: 5
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.oauthRes.access_token
            }
        }
        // this.baseUrl = undefined;
        const releases = axios.get(this.baseUrl + '/browse/new-releases', options);
        const playlists = axios.get(this.baseUrl + '/browse/featured-playlists', options);
        const categories = axios.get(this.baseUrl + '/browse/categories', options);


        axios.all([
            releases, playlists, categories
        ])
            .then(this.handleSpotifyResponse)
            .catch(this.onLoginFailure);
    }

    /**
     * handling response from Spotify APIs
     * @param {*} responseArr 
     */
    handleSpotifyResponse(responseArr) {
        let releases = [];
        if (responseArr[0] && responseArr[0].data && responseArr[0].data.albums && responseArr[0].data.albums.items) {
            releases = responseArr[0].data.albums.items;
        }

        let playlists = [];
        if (responseArr[1] && responseArr[1].data && responseArr[1].data.playlists && responseArr[1].data.playlists.items) {
            playlists = responseArr[1].data.playlists.items;
        }

        let categories = [];
        if (responseArr[2] && responseArr[2].data && responseArr[2].data.categories && responseArr[2].data.categories.items) {
            categories = responseArr[2].data.categories.items;
            console.log(categories);
        }

        this.divRef.current.style.display = 'none';
        this.errorMessageRef.current.innerHTML = '';
        this.parentOnChange(releases, playlists, categories, true);
    }

    /**
     * default componentDidMount 
     */
    componentDidMount() {
        var childNodes = this.divRef.current.childNodes;
        childNodes[2].click();
    }

    /**
    * display Login Button 
    */
    onLoginFailure(error) {
        console.log('error= ', error);

        console.log('errorRef=', this.errorMessageRef);
        if (this.errorMessageRef && this.errorMessageRef.current) {
            this.errorMessageRef.current.style.color = 'red';
            this.errorMessageRef.current.innerHTML = 'Unable to reach Spotify Services &nbsp;&nbsp;\n' + error;
        }

        if (this.divRef && this.divRef.current) {
            this.divRef.current.style.display = 'block';
            // this.divRef.current.focus();
            console.log(this.divRef.current);
        }
    }

    /**
     * default render method
     */
    render() {
        const oauth2Comp = <OAuth2Login
            authorizationUrl="https://accounts.spotify.com/authorize"
            responseType="token"
            clientId={this.clientId}
            redirectUri="http://localhost:3000/callback"
            onSuccess={this.onTokenValidateSuccessHanlder}
            onRequest={res => console.log('onRequest= ', res)}
            onFailure={this.onLoginFailure}
        />
        //debugger;

        console.log('oauth2=', oauth2Comp);
        const styles = { color: '#04AA6D', display: 'none', 'padding': '25px 0px 100px 0px' };

        return <div ref={this.divRef} style={styles}>
            <p ref={this.errorMessageRef}></p>
            <h1>Please click on Login button to enjoy Spotify services.</h1>
            {oauth2Comp}
        </ div>;
    }
}

/**
* exporting the Oauth2Comp component
*/
export default Oauth2Comp;