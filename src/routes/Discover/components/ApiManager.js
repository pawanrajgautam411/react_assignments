// import api from '../../../config.js';
// import axios from 'axios';

class ApiManager {
    constructor() {
        this.accessToken = '';

        
        this.isLoggedIn = false;
    }
}


let apiManager = new ApiManager();
ApiManager.isLoggedIn = function () {
    return apiManager.isLoggedIn;
}

ApiManager.setLoggedIn = function () {
    apiManager.isLoggedIn = true;
    return apiManager.isLoggedIn;
}

ApiManager.getAccessToken = function () {
    return apiManager.accessToken;
}

ApiManager.setAccessToken = function (accessToken) {
    apiManager.accessToken = accessToken;
    return apiManager.accessToken;
}


export default ApiManager;