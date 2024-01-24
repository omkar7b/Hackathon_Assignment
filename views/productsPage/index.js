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

const token = localStorage.getItem('token');
async function getProducts(){
    try {
        const response = await axios.get('http://localhost:3000/product/get-product', { headers: { "Authorization" : token }});
        console.log(response.data.products);
        const products = response.data.products;
        products.forEach(product => {
            showCategoriesInTable(product)
        });
    }
    catch(error) {
        console.log(error);
    }
}


window.addEventListener('DOMContentLoaded', () => {
    getProducts();
})

function showCategoriesInTable(product) {
    let tr = document.createElement('tr');

    let td1 = tr.appendChild(document.createElement('td'));
    let td2 = tr.appendChild(document.createElement('td'));
    let td3 = tr.appendChild(document.createElement('td'));
    let td4 = tr.appendChild(document.createElement('td'));
    let td5 = tr.appendChild(document.createElement('td'));
    let td6 = tr.appendChild(document.createElement('td'));
    let td7 = tr.appendChild(document.createElement('td'));

    td1.innerHTML = product.id;
    td2.innerHTML = product.description;
    td3.innerHTML = product.packSize;
    td4.innerHTML = product.category;
    // td6.innerHTML = product.image;
    td5.innerHTML = product.price;
   
    td7.innerHTML = product.status;
    if(product.status == 'Active'){
        td7.style.color = 'green';
    }
    else {
        td7.style.color = 'red';
    }
    
//edit button
    let td8 = document.createElement('td');
    let editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.classList = 'edit-modal'
    
    
    let editImage = document.createElement('img');
    editImage.src = './edit.svg';  
    editImage.alt = 'Edit';  

    editButton.addEventListener('click', () => {
        document.getElementById('editmodal').style.display = 'block';
    });

    document.getElementById('closeBtn').addEventListener('click', function() {
        document.getElementById('editmodal').style.display = 'none';
    });
    
    let edit = document.getElementById('edit');
    edit.onclick = async ( ) => {
        try {
            const id = product.id;

            const editedProduct = {
                category: document.getElementById('newCategory').value,
                description: document.getElementById('description').value,
                status: document.getElementById('status').value,
                price: document.getElementById('price').value,
                packSize: document.getElementById('pack-size').value,
                productImage: document.getElementById('image-edit').value
            }
            const response = await axios.put(`http://localhost:3000/product/edit-product/${id}`, editedProduct,  { headers: { "Authorization" : token }})
            console.log(response);
            window.location.href = './index.html'
        }
        catch(error) {
            console.log(error);
        }
    }

//delete Button
    let deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    //deleteButton.setAttribute('data-toggle', 'modal');
    //deleteButton.setAttribute('data-target', '#deleteProductModal');
    
    let deleteImage = document.createElement('img');
    deleteImage.src = './trash.svg'; 
    deleteImage.alt = 'Delete';  

    deleteButton.addEventListener('click', () => {
        document.getElementById('deleteProduct').style.display = 'block';
    });

    document.getElementById('cancel-delete').onclick = () => {
        location.reload();
    };

    const deleteBtn = document.getElementById('delete');

    deleteBtn.onclick = async () => {
        try {
            const id = product.id;
            const response = await axios.delete(`http://localhost:3000/product/delete-product/${id}`,{ headers: { "Authorization" : token }})
            console.log(response);
            location.reload();
            document.getElementById('tbody').removeChild(tr);
        }
        catch (error) {
            console.log(error);
        }
    }

    editButton.appendChild(editImage);
    deleteButton.appendChild(deleteImage);
    td8.appendChild(editButton);
    td8.appendChild(deleteButton);

    tr.appendChild(td8);
    document.getElementById('tbody').appendChild(tr);
}