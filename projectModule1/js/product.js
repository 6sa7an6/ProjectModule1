
let clickSearch = () => {
    document.getElementsByClassName('header__search')[0].style.display = 'block'
}
let closeSearch = () => {
    document.getElementsByClassName('header__search')[0].style.display = 'none'
}
window.onload = () => {
    let checkLogin = localStorage.getItem('userId');
    let users = JSON.parse(localStorage.getItem('users'));
    if (checkLogin) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == checkLogin) {
                document.getElementsByClassName('header__right')[0].innerHTML = `
                <ul>
                <li><span onclick="clickSearch()" class="material-symbols-outlined">
                        search
                    </span></li>
                <li>Xin chào ${users[i].name}</li>
                <li>
                <div class="cart">
                <span onclick ='order()' class="material-symbols-outlined">
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
    }
}
window.onload();
let cancelPopup = () => {
    document.getElementsByClassName('popup__login')[0].style.display = 'none'
}
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});
let addToCart = (productId) => {
    let checkLogin = localStorage.getItem('userId');
    let users = JSON.parse(localStorage.getItem('users'));
    let products = JSON.parse(localStorage.getItem('productList'))

    if (checkLogin) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == checkLogin) {
                for (let j = 0; j < products.length; j++) {
                    if (products[j].id == productId) {
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
        document.getElementsByClassName('popup__login')[0].style.display = 'block';
    }
}
let products = JSON.parse(localStorage.getItem('productList'));
let renderProducts = (productList) => {
    if (productList == undefined) {
        productList = [];
    }
    let text = '';
    for (let i = 0; i < productList.length; i++) {
        text += `<div class="container__item">
        <img src="${productList[i].src}" alt="item1">
        <p class="item__name">${productList[i].name}</p>
        <p>${VND.format(productList[i].price)}</p>
        <p><button onclick = 'addToCart(${productList[i].id})' type="button" class=" item__buy btn btn-secondary btn-lg">Mua</button></p>
    </div>`
    }
    document.getElementsByClassName('container__list')[0].innerHTML = text
}
renderProducts(products);
let search = () => {
    let inputValue = document.getElementById('search').value;
    let result = products.filter((item) => {
        return item.name.indexOf(inputValue) != -1;
    })
    console.log(result);
    if (result.length != 0) {
        renderProducts(result);
    }
    else {
        renderProducts();
    }
}
let showCount = () => {
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
let logOut = () => {
    let checkLogin = localStorage.getItem('userId');
    let users = JSON.parse(localStorage.getItem('users'));
    if (checkLogin) {
        localStorage.removeItem('userId');
        popup();
        setInterval(() => {
            updateUIAfterLogout();
        }, 2000);
    }
}
let updateUIAfterLogout = () => {
    document.getElementsByClassName('popup__logout')[0].style.display = 'none';
    document.getElementsByClassName('header__right')[0].innerHTML = `
        <ul>
            <li><span onclick="clickSearch()" class="material-symbols-outlined">search</span></li>
            <li><a href="../page/login.html"><span class="material-symbols-outlined">
            person
            </span></a></li>
            <li>
                <a href="../page/register.html"><span class="material-symbols-outlined">
                    how_to_reg
            </span></a>
            </li>
        </ul>
    `;
}
popup = () => {
    document.getElementsByClassName('popup__logout')[0].style.display = 'block';
}
let order = () => {
    let checkLogin = localStorage.getItem('userId');
    let users = JSON.parse(localStorage.getItem('users'));
    if (checkLogin) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == checkLogin) {
                if(users[i].role == 'active'){
                    window.location.href = '../page/cart.html'
                }else{
                    document.getElementsByClassName('popup__block')[0].style.display = 'block';
                }
            }
        }
    }
}
let cancelPopupBlock = () => {
    document.getElementsByClassName('popup__block')[0].style.display = 'none'
}
let cancelPopupLogin = () => {
    document.getElementsByClassName('popup__login')[0].style.display = 'none'
}
let contact = () => {
    document.getElementsByClassName('contact')[0].scrollIntoView();
    document.getElementsByClassName('popup__block')[0].style.display = 'none'
}