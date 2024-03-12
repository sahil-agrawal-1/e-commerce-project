document.addEventListener('DOMContentLoaded', function () {
    // Load cart items from local storage
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var cartList = document.getElementById('cart-items');
    var totalAmountElement = document.getElementById('totalAmount');

    // Display cart items
    cartItems.forEach(function (item, index) {
        var cartItem = document.createElement('li');
        var cartItemImage = document.createElement('img');
        cartItemImage.src = item.imageSrc;
        cartItemImage.alt = item.name + ' Image';
        cartItemImage.style.width = '50px';
        cartItem.appendChild(cartItemImage);
        cartItem.innerHTML += item.name + ' - $' + item.price.toFixed(2);

        // Quantity controls
        var quantityContainer = document.createElement('div');
        var quantityLabel = document.createElement('span');
        var decreaseButton = document.createElement('button');
        var increaseButton = document.createElement('button');
        quantityLabel.textContent = 'Quantity: 1';
        decreaseButton.textContent = '-';
        increaseButton.textContent = '+';

        // Decrease quantity
        decreaseButton.onclick = function () {
            item.quantity = item.quantity ? item.quantity - 1 : 0;
            updateQuantity();
        };

        // Increase quantity
        increaseButton.onclick = function () {
            item.quantity = (item.quantity || 0) + 1;
            updateQuantity();
        };

        function updateQuantity() {
            quantityLabel.textContent = 'Quantity: ' + (item.quantity || 1);
            updateTotalAmount();
        }

        quantityContainer.appendChild(decreaseButton);
        quantityContainer.appendChild(quantityLabel);
        quantityContainer.appendChild(increaseButton);
        cartItem.appendChild(quantityContainer);

        // Delete button
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
            // Remove the item from the cartItems array
            cartItems.splice(index, 1);
            // Save the updated cart items back to local storage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            // Remove the item from the DOM
            cartList.removeChild(cartItem);
            // Update total amount
            updateTotalAmount();
        };

        // Append the delete button to the cart item
        cartItem.appendChild(deleteButton);

        // Append the cart item to the list
        cartList.appendChild(cartItem);

        // Initialize quantity
        updateQuantity();
    });

    // Update total amount
    function updateTotalAmount() {
        var totalAmount = cartItems.reduce(function (sum, item) {
            return sum + (item.price * (item.quantity || 1));
        }, 0);
        totalAmountElement.textContent = totalAmount.toFixed(2);
    }

    // Clear the cart
    function clearCart() {
        localStorage.removeItem('cartItems');
        cartList.innerHTML = ''; // Clear the cart items in the DOM
        totalAmountElement.textContent = '0.00';
    }
});
