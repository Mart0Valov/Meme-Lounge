import { deleteMemeById, getMemeById } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const detailsMeme = (memeInfo, userId, onDelete) => html`
<section id="meme-details">
    <h1>Meme Title: ${memeInfo.title}</h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${memeInfo.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>${memeInfo.description}</p>

            ${userId && userId == memeInfo._ownerId
            // Buttons Edit/Delete should be displayed only for creator of this meme
            ? html`<a class="button warning" href="/edit/${memeInfo._id}">Edit</a>
            <button @click=${onDelete} class="button danger">Delete</button>`
            :null}

        </div>
    </div>
</section>`;

export async function detailsMemePege(ctx) {
    const memeInfo = await getMemeById(ctx.params.id);
    const userId = getUserData();
    if (userId) {
        ctx.render(detailsMeme(memeInfo, userId.id, onDelete));
    } else {
        ctx.render(detailsMeme(memeInfo, null));
    }

    async function onDelete(ev) {
        await deleteMemeById(ctx.params.id);
        ctx.page.redirect('/allMemes');
    }
}