import { getUserData, setUserData, clearUserData } from '../util.js'

const host = 'http://localhost:3030';

async function makeRequest(url, options) {
    try {
        const response = await fetch(host + url, options);
        if (url == '/users/logout') {
            return response;
        }
        if (response.ok != true) {
            if (response.status == 403) {
                clearUserData();
            }
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status == 204) {
            return response;
        } else {
            return response.json();
        }

    } catch (err) {
        // alert(err.message);
        throw err;
    }
}

function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {}
    };

    if (data != undefined) {
        options.headers['Content-type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();
    if (userData != null) {
        options.headers['X-Authorization'] = userData.token;
    }

    return options;
}


export async function get(url) {
    return makeRequest(url, createOptions());
}

export async function post(url, data) {
    return makeRequest(url, createOptions('post', data));
}

export async function put(url, data) {
    return makeRequest(url, createOptions('put', data));
}

export async function del(url) {
    await makeRequest(url, createOptions('delete'));
}

export async function login(email, password) {
    const result = await post('/users/login', { email, password });

    const userData = {
        username: result.username,
        email: result.email,
        id: result._id,
        gender: result.gender,
        token: result.accessToken
    };
    setUserData(userData);
}

export async function register(username, email, password, gender) {
    const result = await post('/users/register', { username, email, password, gender });

    const userData = {
        username: result.username,
        email: result.email,
        id: result._id,
        gender: result.gender,
        token: result.accessToken
    };
    setUserData(userData);
}

export async function logout() {
    await get('/users/logout');
    clearUserData();
}