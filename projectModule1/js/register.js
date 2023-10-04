const ROLE_USER = 0;
const ROLE_ADMIN = 1;
users = JSON.parse(localStorage.getItem('users')) || [];
userId = () => {
    return Math.floor(Math.random() * 10000)
}
register = () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let name = document.getElementById('name').value;
    let address = document.getElementById('address').value;
    let user = {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        name: name,
        address : address,
        id: userId(),
        cart : [],
        /* role: ROLE_USER */
    }
    let checkEmail = users.find((user) => {
        return user.email == email
    })
    if (!checkEmail && email != '' && password == confirmPassword) {
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        window.location.href = "../page/login.html"
    } else if (email == '') {
        let checkEmail2 = document.getElementById('checkEmail2')
        checkEmail2.style.display = 'block'
        checkEmail1.style.display = 'none'
        checkPassword.style.display = 'none'
    } else if (password != confirmPassword) {
        let checkPassword = document.getElementById('checkPassword')
        checkPassword.style.display = 'block'
        checkEmail2.style.display = 'none'
        checkEmail1.style.display = 'none'
    } else {
        let checkEmail1 = document.getElementById('checkEmail1')
        checkEmail1.style.display = 'block'
        checkPassword.style.display = 'none'
        checkEmail2.style.display = 'none'
    }
}
let myLink = document.getElementById('myLink');
myLink.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = '../page/login.html'
})