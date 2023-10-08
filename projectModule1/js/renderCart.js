document.getElementsByClassName('payment')[0].style.display = 'none';
window.onload = () => {
    let checkLoginAdmin = localStorage.getItem('adminId')
    let checkLogin = localStorage.getItem('userId');
    let users = JSON.parse(localStorage.getItem('users'));
    if (checkLogin) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == checkLogin) {
                document.getElementsByClassName('header__right')[0].innerHTML = `
                <ul>
                <li>Xin chào ${users[i].name}</li>
                <li>
                <div class="cart">
                <span onclick ='payment()' class="material-symbols-outlined">
                shopping_bag
                </span>
                <span class="count">${users[i].count}</span>
                </div>
                </li>
                <li onclick = 'logOut()'><span class="material-symbols-outlined">
                logout
                </span></a>
                    </li>
            </ul>
                `
            }
        }
    } else if (checkLoginAdmin) {
        window.location.href = '../page/admin.html'
    }
}
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
    style: 'currency',
    currency: 'VND',
})
renderCart = () => {
    let checkLogin = localStorage.getItem('userId');
    let users = JSON.parse(localStorage.getItem('users'));
    if (checkLogin != null) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == checkLogin) {
                let total = 0;
                let text = '';
                for (let j = 0; j < users[i].cart.length; j++) {
                    total += users[i].cart[j].price * users[i].cart[j].quantity
                    text += `<tr>
                    <td>${j + 1}</td>
                    <td>
                    <img src='${users[i].cart[j].src}'  class="rounded"
                    </td>
                    <td>${users[i].cart[j].id}</td>
                    <td>${users[i].cart[j].name}</td>
                    <td>${VND.format(users[i].cart[j].price)}</td>
                    <td>
                        <button class="btn btn-secondary btn-sm" onclick ="decrease(${users[i].cart[j].id})">-</button>
                        ${users[i].cart[j].quantity}
                        <button class="btn btn-primary btn-sm" onclick ="increase(${users[i].cart[j].id})">+</button>
                    </td>
                    <td>${VND.format(users[i].cart[j].price * users[i].cart[j].quantity)}</td>
                    <td><button class="btn btn-danger" onclick = "popup(${users[i].cart[j].id})">Xóa</button></td>
                </tr>`
                }
                document.getElementById('tbody').innerHTML = `
                ${text}
                <tr class="table-dark">
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
                let count = 0;
                for (let j = 0; j < users[i].cart.length; j++) {
                    count += users[i].cart[j].quantity;
                }
                document.getElementsByClassName('count')[0].innerHTML = count;
                users[i].count = count;
                localStorage.setItem('users', JSON.stringify(users));
            }
        }
    }
}
showCount();
increase = (productId) => {
    checkLogin = localStorage.getItem('userId');
    let users = JSON.parse(localStorage.getItem('users'));
    if (checkLogin != null) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == checkLogin) {
                for (let j = 0; j < users[i].cart.length; j++) {
                    if (users[i].cart[j].id == productId) {
                        users[i].cart[j].quantity == ++users[i].cart[j].quantity;
                        localStorage.setItem('users', JSON.stringify(users));
                        renderCart();
                        showCount();
                    }
                }
            }
        }
    }
}
decrease = (productId) => {
    checkLogin = localStorage.getItem('userId');
    let users = JSON.parse(localStorage.getItem('users'));
    if (checkLogin != null) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == checkLogin) {
                for (let j = 0; j < users[i].cart.length; j++) {
                    if (users[i].cart[j].id == productId) {
                        users[i].cart[j].quantity == --users[i].cart[j].quantity;
                        localStorage.setItem('users', JSON.stringify(users));
                        renderCart();
                        showCount();
                    }
                }
            }
        }
    }
}
popup = (productId) => {
    document.getElementsByClassName('popup')[0].style.display = 'block';
    document.getElementsByClassName('deleteItem')[0].setAttribute('onclick', `deleteItem(${productId})`);
}
deleteItem = (productId) => {
    checkLogin = localStorage.getItem('userId');
    let users = JSON.parse(localStorage.getItem('users'));
    if (checkLogin != null) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == checkLogin) {
                for (let j = 0; j < users[i].cart.length; j++) {
                    if (users[i].cart[j].id == productId) {
                        users[i].cart.splice(j, 1)
                        localStorage.setItem('users', JSON.stringify(users));
                        renderCart();
                        document.getElementsByClassName('popup')[0].style.display = 'none'
                        showCount();
                    }
                }
            }
        }
    }
}
cancelPopup = () => {
    document.getElementsByClassName('popup')[0].style.display = 'none'
}
viewMore = () => {
    window.location.href = '../page/product.html'
}

//popup payment
let cancelPayment = () => {
    document.getElementsByClassName('payment')[0].style.display = 'none';
}
let payment = () => {
    document.getElementsByClassName('payment')[0].style.display = 'block';
    let checkLogin = localStorage.getItem('userId');
    let users = JSON.parse(localStorage.getItem('users'));
    if (checkLogin) {
        let total = 0;
        let text = '';
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == checkLogin) {
                document.getElementsByClassName('payment__infor__user__main')[0].innerHTML = `<table>
                <tr>
                    <td>
                        <label for="name">Tên :</label>
                    </td>
                    <td>
                        <input id="nameUser" type="text" placeholder="Hãy nhập tên bạn" required value="${users[i].name}">
                    </td>
                </tr>
                <tr>
                    <td><label for="address">Địa chỉ :</label></td>
                    <td><input id="addressUser" type="text" placeholder="Hãy nhập địa chỉ" required value="${users[i].address}"></td>
                </tr>
                <tr>
                    <td><label for="phone">Số điện thoại :</label></td>
                    <td><input id="phoneUser" type="text" placeholder="Hãy nhập số điện thoại"></td>
                </tr>
            </table>`
            for(let j = 0 ; j < users[i].cart.length ; j++ ){
                total += users[i].cart[j].price * users[i].cart[j].quantity;
                text += 
                `
                <tr>
                    <td><img src="${users[i].cart[j].src}" alt=""></td>
                    <td>${users[i].cart[j].name}</td>
                    <td>${users[i].cart[j].quantity}</td>
                    <td>${VND.format(users[i].cart[j].price * users[i].cart[j].quantity)}</td>
                </tr>
                `
            }
            document.getElementById('cart__tbody').innerHTML = 
            `
            ${text}
            <tr class="table-dark">
                <td colspan='3'> Tổng giá giỏ hàng </td>
                <td>${VND.format(total)}</td>
            </tr>
            `
            }
        }
    }
}
let saveInfor = () => {
    document.getElementById('visa').disabled = true;
    document.getElementById('masterCard').disabled = true;
    document.getElementById('cod').disabled = true;
    document.getElementById('nameUser').readOnly = true ;
    document.getElementById('nameUser').style.opacity = '0.5';
    document.getElementById('addressUser').readOnly = true ;
    document.getElementById('addressUser').style.opacity = '0.5'
    document.getElementById('phoneUser').readOnly = true ;
    document.getElementById('phoneUser').style.opacity = '0.5'
    document.getElementById('name').readOnly = true ;
    document.getElementById('name').style.opacity = '0.5'
    document.getElementById('number').readOnly = true ;
    document.getElementById('number').style.opacity = '0.5'
    document.getElementById('expiration').readOnly = true ;
    document.getElementById('expiration').style.opacity = '0.5'
    document.getElementById('cvv').readOnly = true ;
    document.getElementById('cvv').style.opacity = '0.5'
}
let updateInfor = () => {
    document.getElementById('visa').disabled = false;
    document.getElementById('masterCard').disabled = false;
    document.getElementById('cvv').disabled = false;
    document.getElementById('nameUser').readOnly = false ;
    document.getElementById('nameUser').style.opacity = '1';
    document.getElementById('addressUser').readOnly = false ;
    document.getElementById('addressUser').style.opacity = '1';
    document.getElementById('phoneUser').readOnly = false ;
    document.getElementById('phoneUser').style.opacity = '1';
    document.getElementById('name').readOnly = false;
    document.getElementById('name').style.opacity = '1';
    document.getElementById('number').readOnly = false ;
    document.getElementById('number').style.opacity = '1';
    document.getElementById('expiration').readOnly = false ;
    document.getElementById('expiration').style.opacity = '1';
    document.getElementById('cvv').readOnly = false ;
    document.getElementById('cvv').style.opacity = '1';
}
let visa = () => {
    document.getElementsByClassName('payment__method__infor')[0].style.opacity = '1';
}
let masterCard = () => {
    document.getElementsByClassName('payment__method__infor')[0].style.opacity = '1';
}
let cod = () => {
    document.getElementsByClassName('payment__method__infor')[0].style.opacity = '0';
};
