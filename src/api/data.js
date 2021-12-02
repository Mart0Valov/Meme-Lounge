import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    allMemes: '/data/memes?sortBy=_createdOn%20desc',
    createMeme: '/data/memes',
    detailsMeme: '/data/memes/',
    editMeme: '/data/memes/',
    deleteMeme: '/data/memes/',
    userMemes: '/data/memes'
}

export async function getAllMemes() {
    return await api.get(endpoints.allMemes);
}

export async function createMeme(data) {
    await api.post(endpoints.createMeme, data);
}

export async function getMemeById(id) {
    return api.get(`${endpoints.detailsMeme + id}`);
}

export async function editMemeById(id, data) {
    await api.put(`${endpoints.editMeme + id}`, data);
}

export async function deleteMemeById(id) {
    await api.del(`${endpoints.deleteMeme + id}`)
}

export async function getlUserMemes(userId) {
    return await api.get(endpoints.userMemes + `?where=_ownerId%3D%22${userId}%22&amp;sortBy=_createdOn%20desc`);
}