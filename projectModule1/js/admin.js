const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});
//Quản lý user
renderUsers = () => {
    let users = JSON.parse(localStorage.getItem('users'));
    let text = '';
    for (let i = 0; i < users.length; i++) {
        if (users[i].role == 'active') {
            text += `<tr>
                <td>${i + 1}</td>
                <td>${users[i].email}</td>
                <td>${users[i].password}</td>
                <td>${users[i].id}</td>
                <td>${users[i].name}</td>
                <td>${users[i].address}</td>
                <td>${users[i].role}</td>
                <td><button class="action btn btn-danger" onclick = "popupBlock(${users[i].id})">Khóa người dùng</button></td>
            </tr>
            `
        } else {
            text += `<tr>
                <td>${i + 1}</td>
                <td>${users[i].email}</td>
                <td>${users[i].password}</td>
                <td>${users[i].id}</td>
                <td>${users[i].name}</td>
                <td>${users[i].address}</td>
                <td>${users[i].role}</td>
                <td><button class="action btn btn-warning" onclick = "active(${users[i].id})">Mở khóa người dùng</button></td>
            </tr>
            `
        }
        document.getElementById('tbody__users').innerHTML = text;
    }
}
renderUsers();
let popupBlock = (userId) => {
    document.getElementsByClassName('popupBlock')[0].style.display = 'block';
    document.getElementsByClassName('blockUser')[0].setAttribute('onclick', `blockUser(${userId})`);
}
let blockUser = (userId) => {
    let users = JSON.parse(localStorage.getItem('users'));
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == userId) {
            users[i].role = 'block';
            break;
        }
    }
    localStorage.setItem('users', JSON.stringify(users))
    cancelPopupUser();
    renderUsers();
}
let active = (userId) => {
    let users = JSON.parse(localStorage.getItem('users'));
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == userId) {
            users[i].role = 'active';
            break;
        }
    }
    localStorage.setItem('users', JSON.stringify(users));
    cancelPopupUser();
    renderUsers();
}
let cancelPopupUser = () => {
    document.getElementsByClassName('popupBlock')[0].style.display = 'none'
}
let logOut = () => {
    let checkLogin = localStorage.getItem('adminId');
    let admin = JSON.parse(localStorage.getItem('admin'));
    if (checkLogin) {
        localStorage.removeItem('adminId');
        document.getElementsByClassName('popup__logout')[0].style.display = 'block';
        setTimeout(() => {
            window.location.href = '../home/index.html'
        }, 2000);
    }
}

// Quản lý product
let products = JSON.parse(localStorage.getItem('productList'));
let renderProducts = (productList) => {
    if (productList == undefined) {
        productList = [];
    }
    let text = '';
    for (let i = 0; i < productList.length; i++) {
        text += `
        <tr>
            <td>${i + 1}</td>
            <td><img src="${productList[i].src}" alt="item1"></td>
            <td>${productList[i].name}</td>
            <td>${productList[i].id}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].stock}</td>
            <td><button onclick="popupDelete(${productList[i].id})" class="btn btn-danger">Xóa</button></td>
        </tr>
        `
    }
    document.getElementById('tbody__products').innerHTML = text;
}
renderProducts(products);
let popupDelete = (productId) => {
    document.getElementsByClassName('popupDelete')[0].style.display = 'block';
    document.getElementsByClassName('deleteItem')[0].setAttribute('onclick', `deleteItem(${productId})`);
}
let deleteItem = (productId) => {
    let products = JSON.parse(localStorage.getItem('productList'))
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == productId) {
            products.splice(i, 1)
            localStorage.setItem('productList', JSON.stringify(products));
            renderProducts(products);
            document.getElementsByClassName('popupDelete')[0].style.display = 'none'
        }
    }
}
let cancelPopupItem = () => {
    document.getElementsByClassName('popupDelete')[0].style.display = 'none'
}
//add item
//function lay src img
itemId = () => {
    return Math.floor(Math.random() * 10000)
}
let imgSrc = '';
let imageInput = document.getElementById('imageInput');
imageInput.addEventListener('change', (event) => {
    let selectedFile = event.target.files[0];
    if (selectedFile) {
        let reader = new FileReader();
        reader.onload = (i) => {
            imgSrc = i.target.result;
        };
        reader.readAsDataURL(selectedFile);

    }
});

let popupAddItem = () => {
    document.getElementsByClassName('addItem')[0].style.display = 'block';
}
let cancelAddItem = () => {
    document.getElementsByClassName('addItem')[0].style.display = 'none';
}
let addItem = () => {
    let products = JSON.parse(localStorage.getItem('productList'));
    let nameItem = document.getElementById('itemName').value;
    let priceItem = document.getElementById('itemPrice').value;
    let stockItem = document.getElementById('itemStock').value;
    let newItem = {
        id: itemId(),
        name: nameItem,
        price: priceItem,
        src: imgSrc,
        stock: stockItem,
    }
    products.push(newItem);
    localStorage.setItem('productList', JSON.stringify(products));
    document.getElementsByClassName('addItem')[0].style.display = 'none';
    renderProducts(products);
}
let renderOrder = () => {
    let users = JSON.parse(localStorage.getItem('users'));
    let text = '';
    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < users[i].order.length; j++) {
            text += `<tr>
                <td>${users[i].order[j].id}</td>
                <td>${users[i].id}</td>
                <td>${users[i].order[j].orderName}</td>
                <td>${users[i].order[j].orderAddress}</td>
                <td><button class="action btn btn-primary" onclick = "showMethod(${users[i].order[j].id})">Xem phương thức thanh toán</button></td>
                <td><button class="action btn btn-info" onclick = "showOrder(${users[i].order[j].id})">Xem sản phẩm đặt hàng</button></td>
                <td><button class="action btn btn-success" onclick = "sendOrder(${users[i].order[j].id})">Gửi hàng</button>
                <button class="action btn btn-danger" onclick = "deleteOrder(${users[i].order[j].id})">Hủy đơn hàng</button>
                </td>
            </tr>
            `
        }
    }
    document.getElementById('tbody__order').innerHTML = text;
}
renderOrder();
let showOrder = (id) => {
    document.getElementsByClassName('payment__product')[0].style.display = 'block';
    let users = JSON.parse(localStorage.getItem('users'));
    let text = '';
    let total = 0;
    for(let i = 0 ; i < users.length ; i++){
        for(let j = 0 ; j < users[i].order.length;j++){
            if(users[i].order[j].id == id){
                document.getElementsByClassName('payment__infor__order__title')[0].innerHTML = `<h2>Giỏ hàng của id khách ${users[i].id}</h2>`
                for(let k = 0 ; k < users[i].order[j].cartProduct.length ; k++){
                    total += users[i].order[j].cartProduct[k].price * users[i].order[j].cartProduct[k].quantity;
                    text +=
                        `
                <tr>
                    <td><img src="${users[i].order[j].cartProduct[k].src}" alt=""></td>
                    <td>${users[i].order[j].cartProduct[k].name}</td>
                    <td>${users[i].order[j].cartProduct[k].quantity}</td>
                    <td>${VND.format(users[i].order[j].cartProduct[k].price * users[i].order[j].cartProduct[k].quantity)}</td>
                </tr>
                `
                }
                document.getElementById('payment__infor__order__tbody').innerHTML = 
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
let cancelPopupPaymentProduct=()=>{
    document.getElementsByClassName('payment__product')[0].style.display = 'none';
}
let showMethod = (id) => {
    document.getElementsByClassName('payment__method')[0].style.display = 'block';
    let users = JSON.parse(localStorage.getItem('users'));
    let text = '';
    for(let i = 0 ; i < users.length;i++){
        for(let j = 0 ; j < users[i].order.length;j++){
            document.getElementsByClassName('payment__infor__method__title')[0].innerHTML = `<h2>Phương thức thanh toán của id khách ${users[i].id}</h2>`
            text += `
            <tr>
                                    <td>${users[i].order[j].id}</td>
                                    <td>${users[i].order[j].method}</td>
                                    <td>${users[i].order[j].orderName}</td>
                                    <td>${users[i].order[j].orderAddress}</td>
                                    <td>${users[i].order[j].cvv}</td>
                                </tr>
            `
        }
    }
    document.getElementById('payment__infor__method__tbody').innerHTML = text;
}
let cancelPopupMethod = () => {
    document.getElementsByClassName('payment__method payment')[0].style.display = 'none'
}