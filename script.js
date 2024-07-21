document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const buyNowButtons = document.querySelectorAll('.buy-now');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const modal = document.getElementById('payment-form');
    const closeModal = document.querySelector('.close');
    const cartCount = document.getElementById('cart-count');

    // Event Listeners
    buyNowButtons.forEach(button => {
        button.addEventListener('click', openModal);
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Functions
    function openModal() {
        modal.style.display = 'block';
    }

    function addToCart(event) {
        const product = event.target.closest('.product');
        const productId = product.getAttribute('data-id');
        const productName = product.getAttribute('data-name');
        const productPrice = product.getAttribute('data-price');
        const productImage = product.getAttribute('data-image'); // Get product image
        const cart = getCart();

        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, image: productImage, quantity: 1 }); // Include image in the cart item
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Product added to cart');
        updateCartCount();
    }

    function getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    function updateCartCount() {
        const cart = getCart();
        const totalItems = cart.reduce((total, product) => total + product.quantity, 0);
        cartCount.textContent = totalItems;
    }

    function renderCart() {
        const cart = getCart();
        const cartTable = document.getElementById('cart-table').getElementsByTagName('tbody')[0];
        cartTable.innerHTML = '';

        cart.forEach(product => {
            const row = cartTable.insertRow();
            const imgCell = row.insertCell(0);
            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;
            img.style.width = '50px'; // Adjust image size as needed
            imgCell.appendChild(img);

            row.insertCell(1).innerText = product.name;
            row.insertCell(2).innerText = `$${product.price}`;
            const quantityCell = row.insertCell(3);
            quantityCell.innerHTML = 
                `<input type="number" value="${product.quantity}" min="1" data-id="${product.id}" class="quantity-input">`;
            row.insertCell(4).innerText = `$${(product.price * product.quantity).toFixed(2)}`;
            row.insertCell(5).innerHTML = `<button class="remove-from-cart" data-id="${product.id}">Remove</button>`;
        });

        const quantityInputs = document.querySelectorAll('.quantity-input');
        quantityInputs.forEach(input => {
            input.addEventListener('change', updateQuantity);
        });

        const removeButtons = document.querySelectorAll('.remove-from-cart');
        removeButtons.forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    }

    function updateQuantity(event) {
        const input = event.target;
        const newQuantity = parseInt(input.value);
        const productId = input.getAttribute('data-id');
        const cart = getCart();

        const product = cart.find(item => item.id === productId);
        if (product && newQuantity > 0) {
            product.quantity = newQuantity;
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }

    function removeFromCart(event) {
        const productId = event.target.getAttribute('data-id');
        let cart = getCart();

        cart = cart.filter(item => item.id !== productId);

        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }

    // Initialize cart rendering on page load
    if (document.getElementById('cart-table')) {
        renderCart();
    }

    // Initialize Google Map
    window.initMap = function() {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
        });
    }

    // Update cart count on page load
    updateCartCount();

    // تغيير اللغة بناءً على الاختيار الحالي في القائمة المنسدلة
    const languageSelector = document.querySelector('.language-selector select');
    languageSelector.addEventListener('change', function() {
        changeLanguage(this.value);
    });

    // تعيين اللغة الافتراضية إلى الإنجليزية عند تحميل الصفحة
    changeLanguage('en');

    // تتبع عدد العناصر في العربة وتحديث العرض
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            updateCartCount();
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const accordionBtn = document.querySelector('.accordion-btn');

    accordionBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        const accordionContent = this.nextElementSibling;
        if (accordionContent.style.display === 'block') {
            accordionContent.style.display = 'none';
        } else {
            accordionContent.style.display = 'block';
        }
    });
});
