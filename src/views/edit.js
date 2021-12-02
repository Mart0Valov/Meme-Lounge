import { editMemeById, getMemeById } from '../api/data.js';
import { html } from '../lib.js';
import { notificationFunc } from '../util.js';

const editTemplate = (onEdit) => html`
<section id="edit-meme">
    <form @submit=${onEdit} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description">
                            Programming is often touted as a smart and lucrative career path.
                            It's a job that (sometimes) offers flexibility and great benefits.
                            But it's far from sunshine and Nyan Cat rainbows. The hours are long.
                            The mistakes are frustrating. And your eyesight is almost guaranteed to suffer.
                            These memes cover most of the frustration (and funny moments) of programming.
                            At least we can laugh through the pain. 
                        </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>`;

export async function editPage(ctx) {
    ctx.render(editTemplate(onEdit));
    
    const memeData = await getMemeById(ctx.params.id);
    document.getElementById('title').value = memeData.title;
    document.getElementById('description').value = memeData.description;
    document.getElementById('imageUrl').value = memeData.imageUrl;

    async function onEdit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');

        if (title != '' && description != '' && imageUrl != '') {
            try {
                await editMemeById(ctx.params.id, { title, description, imageUrl })
                ctx.page.redirect(`/details/${ctx.params.id}`);
            } catch (err) {
                notificationFunc(err.message);
            }
        } else {
            notificationFunc('All fields are required!');
        }
        
        
    }
}