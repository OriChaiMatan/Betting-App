import { storageService } from './async-storage.service'
import { utilService } from './util.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const BASE_URL = "user/";

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    updateLocalUserFields,
    getEmptyUser
}

window.userService = userService


function getUsers() {
    return httpService.get(`user`)
}



async function getById(userId) {
    const user = await httpService.get(`${BASE_URL}${userId}`)
    return user
}

function remove(userId) {
    return httpService.delete(`${BASE_URL}${userId}`)
}

async function update( user ) {
    var userToSave = await httpService.put(`${BASE_URL}${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === userToSave._id) saveLocalUser(userToSave)
    return userToSave
}

async function login(userCred) {
    try {
        if (!userCred.fullname) {
            userCred.fullname = userCred.email.split("@")[0];
        }

        const user = await httpService.post('auth/login', userCred);

        if (user) {
            return saveLocalUser(user); // Success case
        }
    } catch (err) {
        // Log the error and rethrow it
        console.error("Login failed at service level:", err.message);
        throw new Error("Incorrect email or password");
    }
}

async function signup(userCred) {
    const users = await storageService.query('user');

    const existingUser = users.find(user => user.email === userCred.email);
    if (existingUser) {
        throw new Error('User already exists');
    }
    if (!userCred.fullname) {
        userCred.fullname = userCred.email.split("@")[0];
    }

    // const user = await storageService.post('user', userCred);
    const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user);
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post('auth/logout')
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, email: user.email, favoriteLeagues: user.favoriteLeagues, favoriteTeams: user.favoriteTeams, favoriteMatches: user.favoriteMatches }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function updateLocalUserFields(user) {
    const currUser = getLoggedinUser()
    const userToSave = { ...currUser, ...user }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getEmptyUser(fullname, password, email) {
    return {
        _id: utilService.makeId(),
        fullname,
        username,
        password,
        email,
        favoriteLeagues,
        favoriteTeams,
        favoriteMatches
    }
}


