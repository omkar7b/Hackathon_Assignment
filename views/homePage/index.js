document.getElementById('home').addEventListener('click', () => {
    location.reload();
});

//Redirect to category Page
document.getElementById('category').addEventListener('click', () => {
    window.location.href = '../categoryPage/index.html'
});

//Redirect to add product page
document.getElementById('products').addEventListener('click', () => {
    window.location.href = '../productPage/index.html'
});