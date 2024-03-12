function addToCart(productId) {
    // Fetch product details from the HTML
    var productContainer = document.getElementById(productId);
    var productName = productContainer.querySelector('.title h2').textContent;
    var productPrice = parseFloat(productContainer.querySelector('.price h3:last-child').textContent.replace('$', ''));
    var productImageSrc = productContainer.querySelector('.product-img img').getAttribute('src');

    // Get existing cart items from local storage
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Add the new item to the cart
    var newItem = { name: productName, price: productPrice, imageSrc: productImageSrc };
    cartItems.push(newItem);

    // Save the updated cart items back to local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
