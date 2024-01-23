//Redirect to home page
document.getElementById('home').addEventListener('click', () => {
    window.location.href = '../homePage/index.html'
});

document.getElementById('category').addEventListener('click', () => {
    location.reload(); 
});

//Redirect to add category page
document.getElementById('addnew').addEventListener('click', () => {
    window.location.href = '../addCategoryPage/index.html'
});

//Redirect to add product page
document.getElementById('products').addEventListener('click', () => {
    window.location.href = '../productPage/index.html'
});

const token = localStorage.getItem('token');
async function getCategory(){
    try {
        const response = await axios.get('http://localhost:3000/category/get-category', { headers: { "Authorization" : token }});
        console.log(response.data);
        const category = response.data.categories;
        category.forEach(category => {
            showCategoriesInTable(category)
        });
    }
    catch(error) {
        console.log(error);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    getCategory();
})

function showCategoriesInTable(category) {
    let tr = document.createElement('tr');

    let td1 = tr.appendChild(document.createElement('td'));
    let td2 = tr.appendChild(document.createElement('td'));
    let td3 = tr.appendChild(document.createElement('td'));
    let td4 = tr.appendChild(document.createElement('td'));

    td1.innerHTML = category.id;
    td2.innerHTML = category.category;
    td3.innerHTML = category.description;
    td4.innerHTML = category.status;
    if(category.status === 'Active'){
        td4.style.color = 'green';
    }
    else {
        td4.style.color = 'red';
    }
    
//edit button
    let td5 = document.createElement('td');
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
            const id = category.id;

            const editedCategory = {
                category: document.getElementById('newCategory').value,
                description: document.getElementById('description').value,
                status: document.getElementById('status').value
            }
            const response = await axios.put(`http://localhost:3000/category/edit-category/${id}`, editedCategory,  { headers: { "Authorization" : token }})
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
    
    let deleteImage = document.createElement('img');
    deleteImage.src = './trash.svg'; 
    deleteImage.alt = 'Delete';  

    deleteButton.onclick = async () => {
        try {
            const id = category.id;
            const response = await axios.delete(`http://localhost:3000/category/delete-category/${id}`,{ headers: { "Authorization" : token }})
            console.log(response);
            document.getElementById('tbody').removeChild(tr);
        }
        catch (error) {
            console.log(error);
        }
    }

    editButton.appendChild(editImage);
    deleteButton.appendChild(deleteImage);
    td5.appendChild(editButton);
    td5.appendChild(deleteButton);

    tr.appendChild(td5);
    document.getElementById('tbody').appendChild(tr);
}


