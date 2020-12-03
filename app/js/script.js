if (localStorage.getItem('cart')) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    let shopCart = new Cart(cart); // cart - array goods to a cart
    console.log(shopCart);
    redrawing();

    function redrawing() {// function for redrawing a table
        document.querySelector('.cart-out').innerHTML = ''; //clean a cart
        document.querySelector('.cart-out').append(shopCart.render()); //draw a cart
    }

    document.querySelector('.btn-clear').addEventListener('click', () => {
        localStorage.clear();
        location.href = 'index.html';
    });

    document.querySelector('.btn-table').addEventListener('click', () => {
        location.href = 'index.html';
    });

    //I add functionality to the buttons in table
    document.querySelector('.cart-out').addEventListener('click', (event) => {
        let target = event.target;
        if (target.classList.contains('delete')) {
            shopCart.goodsDelete(target.dataset['articul']);
            redrawing();
            localStorage.setItem('cart', JSON.stringify(shopCart.items));
            return true;
        }
        else if (target.classList.contains('plus')) {
            shopCart.goodsPlus(target.dataset['articul']);
            console.log(shopCart);
            redrawing();
            localStorage.setItem('cart', JSON.stringify(shopCart.items));
            return true;
        }
        else if (target.classList.contains('minus')) {
            shopCart.goodsMinus(target.dataset['articul']);
            redrawing();
            localStorage.setItem('cart', JSON.stringify(shopCart.items));
            return true;
        }
    });
}


