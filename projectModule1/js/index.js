let clickLogin = () => {
    window.location.href = '../page/login.html'
}
let clickSearch = () => {
    document.getElementsByClassName('header__search')[0].style.display = 'block'
}
let closeSearch = () => {
    document.getElementsByClassName('header__search')[0].style.display = 'none'
}
let productList = [
    {
        name: 'PG UNLEASHED Mobile Suit Gundam RX-78-2',
        price: 50000,
        id: 11,
        src: './assets/product/item1.jpg',
        stock : 5,
    },
    {
        name: 'PG Mobile Suit Gundam SEED DESTINY Strike Freedom Gundam',
        price: 60000,
        id: 12,
        src: './assets/product/item2.jpg',
        stock : 9,
    },
    {
        name: 'Mobile Suit Gundam NT PG 1/60 Unicorn Gundam Unit 3 Phenex',
        price: 70000,
        id: 13,
        src: './assets/product/item3.jpg',
        stock : 7 ,
    }
]
const VND = new Intl.NumberFormat('vi-VN',{
    style : 'currency',
    currency : 'VND',
});
localStorage.setItem('productList', JSON.stringify(productList));
let products = JSON.parse(localStorage.getItem('productList'));
renderProducts = () => {
    let text = '';
    for (let i = 0; i < products.length; i++) {
        text += `<div class="container__item col">
        <span>New</span>
        <img src="${products[i].src}" alt="item1">
        <p class="item__name">${products[i].name}</p>
        <p>${VND.format(products[i].price)}</p>
        <p><button onclick = 'addToCart(${products[i].id})' type="button" class=" item__buy btn btn-secondary btn-lg">Mua</button></p>
    </div>`
    }
    document.getElementsByClassName('container__list')[0].innerHTML = text
}
renderProducts();

addToCart = (productId) => {
    let checkLogin = localStorage.getItem('userId');
    let users = JSON.parse(localStorage.getItem('users'));
    let products = JSON.parse(localStorage.getItem('productList'))

    if (checkLogin) {
        /* let cartUser = users.filter((item)=>{
            return item.id == checkLogin
        }) */
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == checkLogin) {
                for (let j = 0; j < products.length; j++) {
                    if (products[j].id == productId) {
                        /* users[i].cart.push( {...products[j],quantity:1});
                        localStorage.setItem('users',JSON.stringify(users)) */
                        let result = users[i].cart.filter((item) => {
                            return item.id == productId;
                        })
                        if (result.length == 0) {
                            users[i].cart.push({ ...products[j], quantity: 1 });
                            localStorage.setItem('users', JSON.stringify(users));
                            showCount();
                        } else {
                            for (let k = 0; k < users[i].cart.length; k++) {
                                if (users[i].cart[k].id == productId) {
                                    users[i].cart[k].quantity == ++users[i].cart[k].quantity;
                                    localStorage.setItem('users', JSON.stringify(users));
                                    showCount();
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        alert('ban phai dang nhap de mua hang')
    }
}
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