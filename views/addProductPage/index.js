//redirect to home page
document.getElementById('home').addEventListener('click', () => {
    window.location.href = '../homePage/index.html'
});

document.getElementById('category').addEventListener('click', () => {
    window.location.href = '../categoryPage/index.html' 
});

//cancel button redirects to products page
document.getElementById('cancel').addEventListener('click', () => {
    window.location.href = '../productsPage/index.html'
})

//redirect to products page
document.getElementById('products').addEventListener('click', () => {
    window.location.href = '../productsPage/index.html'
})



const save = document.getElementById('save');
save.addEventListener('click', async () => {
    try {
        console.log('clicked')
        const category = document.getElementById('newCategory').value;
        const description = document.getElementById('description').value;
        const packSize = document.getElementById('pack-size').value;
        const price = document.getElementById('price').value;
        const status = document.getElementById('status').value;

        //not working
        // const productImage = document.getElementById('product-image').files[0];
        // const mediaType = productImage.type;
        // console.log(mediaType)
        // const formData = new FormData();
        // formData.append('file', productImage)
        // formData.append('mediaType', mediaType);
    
        const newProduct = {
            category: category,
            description: description,
            packSize: packSize,
            price: price,
            status: status
        }

        console.log(newProduct);

        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3000/product/add-product',newProduct, { headers: { 'Authorization' : token, } })
        window.location.href = '../productsPage/index.html'
        console.log(response);
        
    }
    catch (error) {
        console.log(error);
    }
});