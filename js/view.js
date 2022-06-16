const id = new URLSearchParams(window.location.search).get('id');
const container = document.querySelector('.view-more');
const btnDelete = document.getElementById('delete');

const renderDetails = async () => {
    const res = await fetch ('https://jsonplaceholder.typicode.com/posts/' + id);
    const post = await res.json();

    const story = `
    <h3 class="text-center mt-4">${post.title}</h3>
    <p class="text-center">${post.body}</p>
    `

    container.innerHTML = story;
}

btnDelete.addEventListener('click', async (e) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
        method: 'DELETE'
    })

    window.location.replace('/index.html')
})

window.addEventListener('DOMContentLoaded', () => renderDetails());