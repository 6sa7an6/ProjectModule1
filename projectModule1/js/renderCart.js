let clickLogin = () => {
    window.location.href = '../page/login.html'
}
let clickSearch = () => {
    document.getElementsByClassName('header__search')[0].style.display = 'block'
}
let closeSearch = () => {
    document.getElementsByClassName('header__search')[0].style.display = 'none'
}
const VND = new Intl.NumberFormat('vi-VN', {
    style : 'currency',
    currency : 'VND',
})
renderCart = () => {
    let checkLogin = localStorage.getItem('userId');
    let users = JSON.parse(localStorage.getItem('users'));
    if(checkLogin != null){
        for(let i = 0 ; i < users.length ;i++){
            if(users[i].id == checkLogin){
                let total = 0;
                let text = '';
                for (let j = 0 ; j<users[i].cart.length ;j++){
                    total += users[i].cart[j].price * users[i].cart[j].quantity
                    text += `<tr>
                    <td>${j+1}</td>
                    <td>
                    <img src='.${users[i].cart[j].src}'
                    </td>
                    <td>${users[i].cart[j].id}</td>
                    <td>${users[i].cart[j].name}</td>
                    <td>${VND.format(users[i].cart[j].price)}</td>
                    <td>
                        <button>-</button>
                        ${users[i].cart[j].quantity}
                        <button>+</button>
                    </td>
                    <td>${VND.format(users[i].cart[j].price * users[i].cart[j].quantity)}</td>
                    <td>Xóa</td>
                </tr>`
                }
                document.getElementById('tbody').innerHTML =`
                ${text}
                <tr>
                <td colspan = '6'> Tổng giá sản phẩm </td>
                <td colspan = '2'> ${VND.format(total)} </td>
                </tr>
                `
            }
        }
    }
}
renderCart();
showCount = () => {
    let checkLogin = localStorage.getItem('userId');
    let users = JSON.parse(localStorage.getItem('users'));
    if (checkLogin) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == checkLogin) {
                //user[i].cart
                let count = 0;
                for (let j = 0; j < users[i].cart.length; j++) {
                    count += users[i].cart[j].quantity;
                }
                document.getElementsByClassName('count')[0].innerHTML = count ;
            }
        }
    }
}
showCount();