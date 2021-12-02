import { createMeme, logout } from './api/data.js';
import { render, page } from './lib.js';
import { allMemesPage } from './views/allMemes.js';
import { createPage } from './views/createMeme.js';
import { detailsMemePege } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { profilePage } from './views/profile.js';
import { registerPage } from './views/register.js';

const main = document.querySelector('main');
document.getElementById('onLogoutBtn').addEventListener('click', onLogout);

function updateNav() {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
        document.querySelector('.profile span').textContent = `Welcome, ${JSON.parse(userData).email}`;
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}

async function onLogout(ev) {
    await logout();
    updateNav();
    page.redirect('/');
}

function decorateContenxt(ctx, next) {
    ctx.render = (template) => render(template, main);
    ctx.updateNav = updateNav;
    next();
}


page(decorateContenxt);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage)
page('/allMemes', allMemesPage);
page('/details/:id', detailsMemePege);
page('/create', createPage);
page('/edit/:id', editPage);
page('/myProfile', profilePage);

updateNav();
page.start();