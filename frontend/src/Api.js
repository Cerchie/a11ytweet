import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001'

// /** API Class.
//  *
//  * Static class tying together methods used to get/send to to the API.
//  *
// /
class Api {
    // the token for interactive with the API will be stored here.
    static token
    //function for making a request to the API
    static async request(endpoint, data = {}, method = 'get') {
        const url = `${BASE_URL}/${endpoint}`
        const headers = { Authorization: `Bearer ${Api.token}` }
        const params = method === 'get' ? data : {}
        console.debug('API Call:', endpoint, data, method, params, headers, url) //this is not undefined
        let axiosRequest = await axios({ url, method, data, params, headers })
        console.log(axiosRequest)
        try {
            return axiosRequest.data //this is undefined, therefore there is a problem in the API call
        } catch (err) {
            console.error('API Error:', err.response)
            console.log(error.response.data)
            let message = err.response.data.error.message
            throw Array.isArray(message) ? message : [message]
        }
    }
    //function for posting to API
    static async post(endpoint, data = {}, method = 'post') {
        console.debug('API Call:', endpoint, data, method)

        const url = `${BASE_URL}/${endpoint}`
        const headers = { Authorization: `Bearer ${Api.token}` }
        const params = method === 'post' ? data : {}

        try {
            console.log({ url, method, data, params, headers })
            return (await axios({ url, method, data, params, headers })).data
        } catch (err) {
            console.error('API Error:', err.response)
            let message = err.response.data.error.message
            throw Array.isArray(message) ? message : [message]
        }
    }

    // Individual API routes

    /** Get details on a user by handle. */
    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`)
        return res.user
    }
    /** Signup for site. */

    static async signup(data) {
        let res = await this.request(`users/`, data, 'post')
        return res.token
    }

    /** login for site. */

    static async login(data) {
        let res = await this.request(`users/token`, data, 'post')
        return res.token
    }

    /** Save user profile page. */

    static async saveProfile(username, data) {
        let res = await this.request(`users/${username}`, data, 'patch')
        return res.user
    }
}

export default Api

//code borrowed from my project https://github.com/Cerchie/react-jobly/blob/main/frontend/src/api.js
