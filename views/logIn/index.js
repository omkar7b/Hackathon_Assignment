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

document.getElementById('forgotpassword').addEventListener('click', () => {
    console.log('clicked')
    document.getElementById('forgotpasswordmodal').style.display = 'block';
})

// let resetPassword = document.getElementById('resetlink')
// resetPassword.onclick = async () => {
//     try {

//         const email = {
//             email: document.getElementById('emailid').value
//         }
//         console.log(email);
//         const response = await axios.post('http://localhost:3000/password/resetpassword',email)
//         console.log(response);
//     }
//     catch(error) {
//         console.log(error);
//     }
// }


function showError(error) {
    const errorEle = document.getElementById('error');
    errorEle.innerHTML = error.response.data.message;
};


