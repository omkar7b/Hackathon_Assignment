document.getElementById('home').addEventListener('click', () => {
    location.reload();
});

//Redirect to category Page
document.getElementById('category').addEventListener('click', () => {
    window.location.href = '../categoryPage/index.html'
});

//Redirect to add product page
document.getElementById('products').addEventListener('click', () => {
    window.location.href = '../productsPage/index.html'
});

//logout button modal
document.getElementById('user').addEventListener('click', () => {
    document.getElementById('logoutmodal').style.display = 'block';
});

//logout window modal
document.getElementById('logout').addEventListener('click', () => {
    document.getElementById('logoutWindow').style.display = 'block';
});

document.getElementById('cancel').addEventListener('click', () => {
    location.reload();
})

//logging out edirects to login page 
document.getElementById('continue').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '../logIn/index.html'
})