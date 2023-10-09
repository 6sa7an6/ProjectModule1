itemId = () => {
    return Math.floor(Math.random() * 100000)
}
let clickLogin = () => {
    window.location.href = '../page/login.html'
}
window.onload = () => {
    let admin = {
        email: 'admin',
        password: 'admin',
        id: 1,
    }
    localStorage.setItem('admin', JSON.stringify(admin))
    let titleVideo = document.getElementsByClassName('video__title')[0];
    let checkLogin = localStorage.getItem('userId');
    let checkLoginAdmin = localStorage.getItem('adminId')
    let users = JSON.parse(localStorage.getItem('users'));
    if (checkLogin) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == checkLogin) {
                titleVideo.style.display = 'none';
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
    } else if (checkLoginAdmin) {
        titleVideo.style.display = 'none';
        document.getElementsByClassName('header__right')[0].innerHTML = `
        <ul>
        <li><span onclick="clickSearch()" class="material-symbols-outlined">
                search
            </span></li>
        <li>Xin chào ADMIN </li>
        <li>
        <a href="../page/admin.html"><span class="material-symbols-outlined">
        person
        </span></a>
        </li>
        <li onclick = 'logOut()'><span class="material-symbols-outlined">
        logout
        </span></a>
            </li>
    </ul>
        `
    }
}
window.onload();
let cancelPopup = () => {
    document.getElementsByClassName('popup__login')[0].style.display = 'none'
}
let productList = [
    {
        name: 'PG UNLEASHED Mobile Suit RX-78-2',
        price: 7600000,
        id: itemId(),
        src: '../assets/product/item1.jpg',
        stock: 5,
    },
    {
        name: 'SEED DESTINY Strike Freedom Gundam',
        price: 4400000,
        id: itemId(),
        src: '../assets/product/item2.jpg',
        stock: 9,
    },
    {
        name: 'NT PG 1/60 Unicorn Unit 3 Phenex',
        price: 24000000,
        id: itemId(),
        src: '../assets/product/item3.jpg',
        stock: 7,
    },
    {
        name: '00 [Double O] Gundam Exia',
        price: 3300000,
        id: itemId(),
        src: '../assets/product/item4.jpg',
        stock: 6,
    },
    {
        name: ' UC RX-0 Unicorn Gundam',
        price: 4200000,
        id: itemId(),
        src: '../assets/product/item5.jpg',
        stock: 4,
    },
    {
        name: 'SEED Strike Rouge + Sky Grasper',
        price: 3300000,
        id: itemId(),
        src: '../assets/product/item6.jpg',
        stock: 8,
    },
    {
        name: 'SEED DESTINY Gundam Astray Red Frame',
        price: 3100000,
        id: itemId(),
        src: '../assets/product/item7.jpg',
        stock: 5,
    },
    {
        name: 'Z Gundam MSZ-006 Zeta Gundam',
        price: 7000000,
        id: itemId(),
        src: '../assets/product/item8.jpg',
        stock: 11,
    },
    {
        name: 'Z Gundam RX-178 Gundam Mk-II',
        price: 4200000,
        id: itemId(),
        src: '../assets/product/item9.jpg',
        stock: 14,
    },
    {
        name: '00 Gundam Seven Sword/GA',
        price: 5000000,
        id: itemId(),
        src: '../assets/product/item10.jpg',
        stock: 3,
    },
    {
        name: 'MS-06S Char Zaku 2',
        price: 3700000,
        id: itemId(),
        src: '../assets/product/item11.jpg',
        stock: 9,
    },
    {
        name: 'Senki Gundam W Endless Waltz Wing',
        price: 3900000,
        id: itemId(),
        src: '../assets/product/item12.jpg',
        stock: 5,
    },
];
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});
let products = JSON.parse(localStorage.getItem('productList'));
if (products == null) {
    localStorage.setItem('productList', JSON.stringify(productList));
}
let renderProducts = (productList) => {
    if (productList == undefined) {
        productList = [];
    }
    let text = '';
    for (let i = 0; i < 3; i++) {
        text += `<div class="container__item col">
        <span>New</span>
        <img src="${productList[i].src}" alt="item1">
        <p class="item__name">${productList[i].name}</p>
        <p>${VND.format(productList[i].price)}</p>
        <p><button onclick = 'addToCart(${productList[i].id})' type="button" class=" item__buy btn btn-secondary btn-lg">Mua</button></p>
    </div>`
    }
    document.getElementsByClassName('container__list')[0].innerHTML = text
}
renderProducts(products);

let addToCart = (productId) => {
    console.log(productId);
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
//function tim kiem san pham
// di sau nghien cuu ki thuat DEBOUNCE
let logOut = () => {
    let checkLoginAdmin = localStorage.getItem('adminId')
    let checkLogin = localStorage.getItem('userId');
    let users = JSON.parse(localStorage.getItem('users'));
    if (checkLogin) {
        localStorage.removeItem('userId');
        popup();
        setTimeout(() => {
            updateUIAfterLogout();
        }, 2000);
    } else if (checkLoginAdmin) {
        localStorage.removeItem('adminId');
        popup();
        setTimeout(() => {
            updateUIAfterLogout();
        }, 2000);
    }
}
let updateUIAfterLogout = () => {
    document.getElementsByClassName('popup__logout')[0].style.display = 'none';
    let titleVideo = document.getElementsByClassName('video__title')[0];
    titleVideo.style.display = 'block';

    document.getElementsByClassName('header__right')[0].innerHTML = `
        <ul>
            <li><span onclick="clickSearch()" class="material-symbols-outlined">search</span></li>
            <li><a href="../page/login.html"><span class="material-symbols-outlined">
            person
        </span></a></li>
            <li>
                <a href="../page/register.html"><span class="material-symbols-outlined">
                    how_to_reg</span>
                </a>
            </li>
        </ul>
    `;
}
let popup = () => {
    document.getElementsByClassName('popup__logout')[0].style.display = 'block';
}
let order = () => {
    let checkLogin = localStorage.getItem('userId');
    let users = JSON.parse(localStorage.getItem('users'));
    if (checkLogin) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == checkLogin) {
                if (users[i].role == 'active') {
                    window.location.href = '../page/cart.html'
                } else {
                    document.getElementsByClassName('popup__block')[0].style.display = 'block';
                }
            }
        }
    }
}
cancelPopup = () => {
    document.getElementsByClassName('popup')[2].style.display = 'none'
}