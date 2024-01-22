async function signUp(event){
    try {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

         let newUser = {
            email: email,
            password: password
        }

        let response = await axios.post('http://localhost:3000/user/signup', newUser);
        if(response.data.status===200){
        alert(response.data.message)
        }

    }
    catch(error) {
            console.log(error.response.data);
            showError(error);
        };
    };
    
    
function showError(error) {
const errorEle = document.getElementById('error');
errorEle.innerHTML = error.response.data.message;
};