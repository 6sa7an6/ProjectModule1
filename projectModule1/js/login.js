let login = () => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value.trim();
    let admin = JSON.parse(localStorage.getItem('admin')) || [];
    let flag = -1;
    for (let i = 0; i < users.length; i++) {
        if (admin.email == email && admin.password == password) {
            flag = 1;
            localStorage.setItem('adminId', admin.id)
            break;
        } else if (users[i].email == email && users[i].password == password) {
            flag = 2;
            localStorage.setItem('userId', users[i].id)
            break;
        }
    }
    if (flag == 1) {
        window.location.href = '../page/admin.html'
    }else if(flag == 2){
        window.location.href = '../home/index.html'
    } else {
        document.getElementById('checkAccount').style.display = 'block'
    }
}
let myLink = document.getElementById('myLink');
myLink.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = '../page/register.html'
})

