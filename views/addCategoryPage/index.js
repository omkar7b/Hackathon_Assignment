//Resirect to Home page
document.getElementById('home').addEventListener('click', () => {
    window.location.href = '../homePage/index.html'
});

document.getElementById('category').addEventListener('click', () => {
    location.reload(); 
});

//cancel button redirects to category page
document.getElementById('cancel').addEventListener('click', () => {
    window.location.href = '../categoryPage/index.html'
})


const save = document.getElementById('save');
save.addEventListener('click', async () => {
    try {
        console.log('clicked')
        const category = document.getElementById('newCategory').value;
        const description = document.getElementById('description').value;
        const status = document.getElementById('status').value;

        console.log(category);

        const newCategory = {
            category: category,
            description: description,
            status: status
        }
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3000/category/add-category', newCategory, { headers: { 'Authorization' : token } })
        console.log(response);
    }
    catch (error) {
        console.log(error)
    }
});





