async function logIn(event) {
    try {
        event.preventDefault()
        console.log('clicked');
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const user = {
            email: email,
            password: password
        }

        const response = await axios.post('http://localhost:3000/user/login', user);
        console.log(response);
        if(response.data.success === true){

            alert(response.data.message);
            localStorage.setItem('token', response.data.token);
            window.location.href = '../homePage/index.html';
            
        }
    }
    catch (error) {
        console.log(error);
        showError(error);
    }
}

function showError(error) {
    const errorEle = document.getElementById('error');
    errorEle.innerHTML = error.response.data.message;
};


