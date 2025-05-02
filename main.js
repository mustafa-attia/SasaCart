
let cart = [];


document.getElementById('search-btn').addEventListener('click', function (event) {
    event.preventDefault();
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const products = document.querySelectorAll('.product');

    products.forEach(function (product) {
        const productName = product.querySelector('.p-name').textContent.toLowerCase();
        product.style.display = productName.includes(searchQuery) ? 'block' : 'none';
    });
});


document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const name = this.getAttribute('data-product');
        const price = parseFloat(this.getAttribute('data-price'));

        cart.push({ name, price });
        updateCartUI();
    });
});


function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement('li');
        li.className = 'mb-2 d-flex justify-content-between align-items-center';

        li.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)}
            <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">x</button>
        `;

        cartItems.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}


document.getElementById('cart-icon').addEventListener('click', function () {
    document.getElementById('cart-sidebar').classList.toggle('show');
});

document.querySelector('.btn-success').addEventListener('click', function () {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }


    localStorage.setItem('cart', JSON.stringify(cart));

    window.location.href = 'checkout.html';
});
