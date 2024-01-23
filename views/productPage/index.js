//Redirect to home page
document.getElementById('home').addEventListener('click', () => {
    window.location.href = '../homePage/index.html'
});

//Redirect to add category page
document.getElementById('category').addEventListener('click', () => {
    window.location.href = '../categoryPage/index.html'
});

//Redirect to add product page
document.getElementById('addnew').addEventListener('click', () => {
    window.location.href = '../addProductPage/index.html'
});

document.getElementById('products').addEventListener('click', () => {
    location.reload(); 
});