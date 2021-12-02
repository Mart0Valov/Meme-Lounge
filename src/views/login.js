import { login } from '../api/data.js';
import { html } from '../lib.js';
import { notificationFunc } from '../util.js';

const loginTemplate = (onSubmit) => html`
<section id="notifications">
    <div id="errorBox" class="notification">
        <span>MESSAGE</span>
    </div>
</section>
<section id="login">
    <form @submit=${onSubmit} id="login-form">
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="#">Sign up</a>.</p>
            </div>
        </div>
    </form>
</section>`;


export function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        if (email != '' && password != '') {
            try {
                await login(email, password);
                ctx.updateNav();
                ctx.page.redirect('/allMemes');
            } catch (err) {
                notificationFunc(err.message);
            }

        } else {
            notificationFunc('All fields are required!');
        }

    }
}