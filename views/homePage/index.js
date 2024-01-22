document.getElementById('home').addEventListener('click', () => {
    location.reload();
    const click = event.target;
    click.style.backgroundColor = '#484848';
})

//Redirect to category Page
document.getElementById('category').addEventListener('click', () => {
    window.location.href = '../categoryPage/index.html'
})