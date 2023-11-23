import axios from 'axios'
import {parseJwt} from "./Helpers";
import {authenticate, signup} from "./Service";
// import {authenticate} from "./Service";

export const orderApi = {
    authenticate,
    signup
}

const api = axios.create();

// function authenticate(username, password) {
//     return api.post('/auth/authenticate', {username, password}, {
//         headers: {'Content-type': 'application/json'}
//     })
// }

// function signup(user) {
//     return api.post('/auth/signup', user, {
//         headers: {'Content-type': 'application/json'}
//     })
// }

// function getUsers(user, username) {
//     const url = username ? `/api/users/${username}` : '/api/users'
//     return api.get(url, {
//         headers: {'Authorization': bearerAuth(user)}
//     })
// }

// function deleteUser(user, username) {
//     return api.delete(`/api/users/${username}`, {
//         headers: {'Authorization': bearerAuth(user)}
//     })
// }

// function getUserMe(user) {
//     return api.get('/api/users/me', {
//         headers: {'Authorization': bearerAuth(user)}
//     })
// }

api.interceptors.request.use(function (config) {
    // If token is expired, redirect user to login
    if (config.headers.Authorization) {

        const token = config.headers.Authorization.split(' ')[1]
        const data = parseJwt(token)

        if (Date.now() > data.exp * 1000) {
            window.location.href = "/login"
        }
    }
    return config
}, function (error) {
    return Promise.reject(error)
})

// -- Helper functions

// function bearerAuth(user) {
//     return `Bearer ${user.accessToken}`
// }