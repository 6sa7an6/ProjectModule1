let login = () => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value.trim();
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password == password) {
            localStorage.setItem('userId',users[i].id)
            window.location.href = '../index.html'
            /* if(users[i].role == ROLE_ADMIN){
                window.location.href = '../page/admin.html'
            }else if(user[i].role == ROLE_USER){
                window.location.href = '../index.html'
            } */
        } else {
            document.getElementById('checkAccount').style.display = 'block'
        }
    }
}
let myLink = document.getElementById('myLink');
myLink.addEventListener('click',(event)=>{
    event.preventDefault();
    window.location.href = '../page/register.html'
})